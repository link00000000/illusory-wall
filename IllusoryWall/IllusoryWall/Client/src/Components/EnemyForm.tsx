import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Radio, Table } from 'antd'
import { FormInstance } from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import React, { Component } from 'react'
import { IWEnemy, IWLocation } from '../Utils/Models'
import styles from './EnemyForm.module.css'

type IProps = {
    onSubmit?: (model: IWEnemy) => void
    onCancel?: () => void
    submitText?: string
}
type IState = {
    locations: IWLocation[]
}

/**
 * Form used to input information for a new enemy
 */
export class EnemyForm extends Component<IProps, IState> {
    static displayName = EnemyForm.name

    private _formRef = React.createRef<FormInstance>()

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.locationsList = this.locationsList.bind(this)
        this.removeLocation = this.removeLocation.bind(this)

        this.state = {
            locations: [{ name: 'Test location', hp: 10, souls: 20 }]
        }
    }

    /**
     * Bind form data to model and invoke callback
     * @param formData Data entered into the form
     */
    private async handleSubmit(formData: any): Promise<void> {
        // If respawns is -1, dont bind the respawns atribute to model
        if (formData.respawns === -1) {
            delete formData.respawns
        } else {
            // Convert integer value to boolean
            formData.respawns = !!formData.respawns
        }

        const model = formData as IWEnemy
        model.locations = this.state.locations

        if (this.props.onSubmit) this.props.onSubmit(model)
    }

    /**
     * Perform the props.onCancel callback if there is one
     */
    private handleCancel(): void {
        if (this.props.onCancel) this.props.onCancel()
    }

    private locationsList(): JSX.Element {
        const addLocationButton = (
            <Button
                block
                type='dashed'
                className={styles['add-location-button']}
            >
                <PlusCircleOutlined />
                Add Location
            </Button>
        )

        if (this.state.locations.length === 0) return addLocationButton

        return (
            <>
                <Table
                    columns={[
                        { title: 'Name', dataIndex: 'name' },
                        { title: 'HP', dataIndex: 'hp' },
                        { title: 'Souls', dataIndex: 'souls' },
                        { dataIndex: 'action' }
                    ]}
                    dataSource={this.state.locations.map((location) => ({
                        ...location,
                        key: location.name,
                        action: (
                            <Button
                                type='text'
                                onClick={() =>
                                    this.removeLocation(location.name)
                                }
                            >
                                <MinusCircleOutlined />
                            </Button>
                        )
                    }))}
                    pagination={{ hideOnSinglePage: true }}
                />
                {addLocationButton}
            </>
        )
    }

    private removeLocation(locationName: string): void {
        const newLocationState = this.state.locations
        newLocationState.splice(
            this.state.locations.findIndex((x) => x.name === locationName),
            1
        )
        this.setState({ locations: newLocationState })
    }

    render() {
        return (
            <Form
                onFinish={this.handleSubmit}
                layout='vertical'
                ref={this._formRef}
            >
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label='Description' name='description'>
                    <TextArea />
                </Form.Item>

                <Form.Item label='Respawns' name='respawns'>
                    <Radio.Group
                        options={[
                            { label: 'Respawns', value: 1 },
                            { label: "Doesn't Respawn", value: 0 },
                            { label: 'Disabled', value: -1 }
                        ]}
                        optionType='button'
                        defaultValue={-1}
                        size='small'
                    />
                </Form.Item>

                <Form.Item label='Class' name='class'>
                    <Input />
                </Form.Item>

                <Form.Item label='Image' name='image'>
                    <Input />
                </Form.Item>

                <Form.Item name='locations'>{this.locationsList()}</Form.Item>

                {/* @TODO: IWDrop Form */}

                {/* @TODO: IWDamage Form */}

                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className={styles['tail-button']}
                    >
                        {this.props.submitText || 'Submit'}
                    </Button>

                    <Button
                        type='default'
                        onClick={this.handleCancel}
                        className={styles['tail-button']}
                    >
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
