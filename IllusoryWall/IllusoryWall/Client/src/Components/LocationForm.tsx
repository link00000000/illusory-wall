import { Button, Form, Input, InputNumber } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { Component } from 'react'
import { IWLocation } from '../Utils/Models'
import styles from './LocationForm.module.css'

type IProps = {
    onSubmit?: (location: IWLocation) => void
    onCancel?: () => void
}
type IState = {}

export class LocationForm extends Component<IProps, IState> {
    static displayName = LocationForm.name

    private _formRef = React.createRef<FormInstance>()

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)

        this.state = {}
    }

    /**
     * Bind from data to model and invoke callback
     * @param formData Data entered into the form
     */
    private handleSubmit(formData: any): void {
        const model = formData as IWLocation
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

                <Form.Item label='HP' name='hp'>
                    <InputNumber min={0} precision={0} />
                </Form.Item>

                <Form.Item label='Souls' name='souls'>
                    <InputNumber min={0} precision={0} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className={styles['tail-button']}
                    >
                        Add Location
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
