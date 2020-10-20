import { message } from 'antd'
import { MessageType } from 'antd/lib/message'
import React, { Component } from 'react'
import { AddEnemyForm } from '../Components/AddEnemyForm'
import { AddEnemyLayout as Layout } from '../Layouts/AddEnemyLayout'

type IProps = {}
type IState = {
    loader?: MessageType
}

/**
 * /add-enemy route
 */
export class AddEnemy extends Component<IProps, IState> {
    static displayName = AddEnemy.name

    constructor(props: IProps) {
        super(props)

        this.showError = this.showError.bind(this)
        this.showSuccess = this.showSuccess.bind(this)
        this.showLoading = this.showLoading.bind(this)
    }

    /**
     * Displays any errors that occur when submitting
     * the AddEnemyForm
     * @param error Error when submitting AddEnemyForm
     */
    private showError(error?: Error) {
        if (this.state.loader) {
            this.state.loader()
            this.setState({ loader: undefined })
        }

        let text = 'Failed to create new enemy.'
        if (error) {
            error.name = ''
            text += ' ' + error.toString() + '.'
        }

        message.error(text)
    }

    /**
     * Shows success message if AddEnemyForm submits without
     * errors
     */
    private showSuccess() {
        if (this.state.loader) {
            this.state.loader()
            this.setState({ loader: undefined })
        }

        message.success('Created new enemy.')
    }

    /**
     * Shows loader while the submission from AddEnemyFrom is being
     * requested
     */
    private showLoading() {
        const loadingDismiss = message.loading('Adding enemy..', 0)
        this.setState({ loader: loadingDismiss })
    }

    render() {
        return (
            <Layout>
                <AddEnemyForm
                    onSubmit={this.showLoading}
                    onFailure={this.showError}
                    onSuccess={this.showSuccess}
                />
            </Layout>
        )
    }
}
