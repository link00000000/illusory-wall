import { Form, Modal, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React, { Component } from 'react'
import DamageCategoryDisplayNames from '../Utils/DamageCategoryDisplayNames'
import DamageTypeDisplayNames from '../Utils/DamageTypeDisplayNames'
import { IWDamage } from '../Utils/Models'
import { DamageCategory, DamageType } from '../Utils/Types'

type IProps = {
    onSubmit?: (location: IWDamage) => void
    onCancel?: () => void
    onError?: (error: Error) => void
    visible: boolean
}
type IState = {}

export class DamageFormModal extends Component<IProps, IState> {
    static displayName = DamageFormModal.name

    private readonly _modalTitle = 'Add Damage Type'
    private readonly _modalOkText = 'Add Damage Type'
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
            const model = formData as IWDamage
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
                        label='Type'
                        name='damageType'
                        rules={[{ required: true }]}
                    >
                        <Select showSearch>
                            {Object.values(DamageType).map(
                                (damageTypeName, index) => (
                                    <Select.Option
                                        value={damageTypeName}
                                        key={index}
                                    >
                                        {DamageTypeDisplayNames[damageTypeName]}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='Category'
                        name='category'
                        rules={[{ required: true }]}
                    >
                        <Select showSearch>
                            {Object.values(DamageCategory).map(
                                (damageCategoryName, index) => (
                                    <Select.Option
                                        value={damageCategoryName}
                                        key={index}
                                    >
                                        {
                                            DamageCategoryDisplayNames[
                                                damageCategoryName
                                            ]
                                        }
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
