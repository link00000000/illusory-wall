import { Button, Form, Input, InputNumber } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { Component } from 'react'
import styles from './LocationForm.module.css'

type IProps = {}
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

    private async handleSubmit(formData: any): Promise<void> {
        // @TODO Handle submit
    }

    private handleCancel(): void {
        // @TODO Handle cancel and call parent callback
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
                    <InputNumber />
                </Form.Item>

                <Form.Item label='Souls' name='souls'>
                    <InputNumber />
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
