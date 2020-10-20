import { message } from 'antd'
import { MessageType } from 'antd/lib/message'
import React, { Component } from 'react'
import * as AddEnemeyAPI from '../API/AddEnemy'
import { EnemyForm } from '../Components/EnemyForm'
import { AddEnemyLayout as Layout } from '../Layouts/AddEnemyLayout'
import { IWEnemy } from '../Utils/Models'

type IProps = {}
type IState = {
    loader?: MessageType
}

/**
 * /add-enemy route
 */
export class AddEnemy extends Component<IProps, IState> {
    static displayName = AddEnemy.name
    private readonly _messageDuration = 2

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.showError = this.showError.bind(this)
        this.showSuccess = this.showSuccess.bind(this)
        this.showLoading = this.showLoading.bind(this)
    }

    private async handleSubmit(model: IWEnemy): Promise<void> {
        this.showLoading()

        const error = await AddEnemeyAPI.commit(model)
        if (error) {
            this.showError(error)
            return
        }

        this.showSuccess()
    }

    private handleCancel() {
        // @TODO: Handle cancel
    }

    /**
     * Displays any errors that occur when submitting
     * the AddEnemyForm
     * @param error Error when submitting AddEnemyForm
     */
    private showError(error?: Error): void {
        if (this.state.loader) {
            this.state.loader()
            this.setState({ loader: undefined })
        }

        let text = 'Failed to create new enemy.'
        if (error) {
            error.name = ''
            text += ' ' + error.toString() + '.'
        }

        message.error(text, this._messageDuration)
    }

    /**
     * Shows success message if AddEnemyForm submits without
     * errors
     */
    private showSuccess(): void {
        if (this.state.loader) {
            this.state.loader()
            this.setState({ loader: undefined })
        }

        message.success('Created new enemy.', this._messageDuration)
    }

    /**
     * Shows loader while the submission from AddEnemyFrom is being
     * requested
     */
    private showLoading(): void {
        const loadingDismiss = message.loading('Adding enemy..', 0)
        this.setState({ loader: loadingDismiss })
    }

    render() {
        return (
            <Layout>
                <EnemyForm
                    submitText='Add Enemy'
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleCancel}
                />
            </Layout>
        )
    }
}
