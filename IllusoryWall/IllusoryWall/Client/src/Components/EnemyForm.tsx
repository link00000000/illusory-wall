import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Radio, Table } from 'antd'
import { FormInstance } from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import React, { Component } from 'react'
import { IWEnemy, IWLocation } from '../Utils/Models'
import styles from './EnemyForm.module.css'
import { LocationFormModal } from './LocationFormModal'

type IProps = {
    onSubmit?: (model: IWEnemy) => void
    submitText?: string
}
type IState = {
    locations: IWLocation[]
    showLocationsModal: boolean
}

/**
 * Form used to input information for a new enemy
 */
export class EnemyForm extends Component<IProps, IState> {
    static displayName = EnemyForm.name

    private readonly _formSpan = 8
    private readonly _formOffset = 8

    private _formRef = React.createRef<FormInstance>()

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.locationsList = this.locationsList.bind(this)
        this.addLocation = this.addLocation.bind(this)
        this.removeLocation = this.removeLocation.bind(this)

        this.state = {
            locations: [{ name: 'Test location', hp: 10, souls: 20 }],
            showLocationsModal: false
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

        // Bind data to model
        const model = formData as IWEnemy
        model.locations = this.state.locations

        if (this.props.onSubmit) this.props.onSubmit(model)
    }

    private locationsList(): JSX.Element {
        const addLocationButton = (
            <Button
                block
                type='dashed'
                className={styles['add-location-button']}
                onClick={() => {
                    this.setState({ showLocationsModal: true })
                }}
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

    private addLocation(model: IWLocation): void {
        this.setState({ locations: [...this.state.locations, model] })
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
                layout='horizontal'
                ref={this._formRef}
                labelCol={{ span: this._formOffset }}
                wrapperCol={{ span: this._formOffset }}
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

                <Form.Item
                    wrapperCol={{
                        span: this._formSpan,
                        offset: this._formOffset
                    }}
                >
                    {this.locationsList()}
                </Form.Item>
                <LocationFormModal
                    visible={this.state.showLocationsModal}
                    onCancel={() => {
                        this.setState({ showLocationsModal: false })
                    }}
                    onSubmit={(newLocation) => {
                        this.setState({ showLocationsModal: false })
                        this.addLocation(newLocation)
                    }}
                />

                {/* @TODO: IWDrop Form */}

                {/* @TODO: IWDamage Form */}

                <Form.Item
                    wrapperCol={{
                        span: this._formSpan,
                        offset: this._formOffset
                    }}
                >
                    <Button
                        type='primary'
                        htmlType='submit'
                        className={styles['tail-button']}
                    >
                        {this.props.submitText || 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
