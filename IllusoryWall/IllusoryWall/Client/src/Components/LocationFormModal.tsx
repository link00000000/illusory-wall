import { Form, Input, InputNumber, Modal } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { Component } from 'react'
import { IWLocation } from '../Utils/Models'

type IProps = {
    onSubmit?: (location: IWLocation) => void
    onCancel?: () => void
    onError?: (error: Error) => void
    visible: boolean
}
type IState = {}

export class LocationFormModal extends Component<IProps, IState> {
    static displayName = LocationFormModal.name

    private readonly _modalTitle = 'Add Location'
    private readonly _modalOkText = 'Add Location'
    private readonly _modalCancelText = 'Cancel'

    private _formRef = React.createRef<FormInstance>()

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)

        this.state = {}
    }

    /**
     * Bind from data to model and invoke callback
     */
    private async handleSubmit(): Promise<void> {
        if (this._formRef.current == null) return

        try {
            const formData = await this._formRef.current.validateFields()
            const model = formData as IWLocation
            if (this.props.onSubmit) this.props.onSubmit(model)
        } catch (error) {
            if (this.props.onError) this.props.onError(error)
        } finally {
            this._formRef.current.resetFields()
        }
    }

    /**
     * Perform the props.onCancel callback if there is one
     */
    private handleCancel(): void {
        this._formRef.current?.resetFields()
        if (this.props.onCancel) this.props.onCancel()
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                title={this._modalTitle}
                okText={this._modalOkText}
                cancelText={this._modalCancelText}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
            >
                <Form
                    layout='horizontal'
                    ref={this._formRef}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
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
                </Form>
            </Modal>
        )
    }
}
