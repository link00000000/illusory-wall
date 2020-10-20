import { Button, Form, Input, Radio } from 'antd'
import { FormInstance } from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import React, { Component } from 'react'
import { IWEnemy } from '../Utils/Models'
import styles from './EnemyForm.module.css'

type IProps = {
    onSubmit?: (model: IWEnemy) => void
    onCancel?: () => void
    submitText?: string
}
type IState = {}

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

        this._formRef = React.createRef<FormInstance>()
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
        if (this.props.onSubmit) this.props.onSubmit(model)
    }

    /**
     * Perform the props.onCancel callback if there is one
     */
    private handleCancel(): void {
        if (this.props.onCancel) this.props.onCancel()
    }

    render() {
        return (
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                onFinish={this.handleSubmit}
                layout='horizontal'
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

                {/* @TODO: IWLocation Form */}

                {/* @TODO: IWDrop Form */}

                {/* @TODO: IWDamage Form */}

                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
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
