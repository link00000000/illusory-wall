import { Button, Checkbox, Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form'
import TextArea from 'antd/lib/input/TextArea'
import React, { Component } from 'react'
import { IWEnemy } from '../Common/Models'
import { commit } from './AddEnemyAPI'
import styles from './AddEnemyForm.module.css'

type IProps = {
    onSubmit?: () => void
    onSuccess?: () => void
    onFailure?: (error?: Error) => void
    onCancel?: () => void
}
type IState = { disableRespawnCheckbox: boolean }

/**
 * Form used to input information for a new enemy
 */
export class AddEnemyForm extends Component<IProps, IState> {
    static displayName = AddEnemyForm.name

    private _formRef = React.createRef<FormInstance>()

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.toggleRespawnCheckbox = this.toggleRespawnCheckbox.bind(this)

        this._formRef = React.createRef<FormInstance>()

        this.state = {
            disableRespawnCheckbox: true
        }
    }

    /**
     * Commit new enemy to API
     */
    private async handleSubmit(model: IWEnemy): Promise<void> {
        if (this.props.onSubmit) this.props.onSubmit()

        if (this.state.disableRespawnCheckbox) delete model.respawns

        const error = await commit(model)
        if (error) {
            if (this.props.onFailure) this.props.onFailure(error)
            return
        }

        if (this.props.onSuccess) this.props.onSuccess()
    }

    /**
     * Perform the props.onCancel callback if there is one
     * @param _event Click event
     */
    private handleCancel(
        _event: React.MouseEvent<HTMLElement, MouseEvent>
    ): void {
        if (this.props.onCancel) this.props.onCancel()
    }

    /**
     * Toggle enable and disable respawn checkbox input
     */
    private toggleRespawnCheckbox() {
        this.setState({
            disableRespawnCheckbox: !this.state.disableRespawnCheckbox
        })
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

                <Form.Item label='Respawns' name='repsawns'>
                    <Checkbox
                        name='respawns'
                        disabled={this.state.disableRespawnCheckbox}
                    />

                    <Button
                        type={
                            this.state.disableRespawnCheckbox
                                ? 'primary'
                                : 'dashed'
                        }
                        size='small'
                        onClick={this.toggleRespawnCheckbox}
                        className={styles['checkbox-button']}
                    >
                        {!this.state.disableRespawnCheckbox
                            ? 'Disable'
                            : 'Enable'}
                    </Button>
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
                        Add Enemy
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
