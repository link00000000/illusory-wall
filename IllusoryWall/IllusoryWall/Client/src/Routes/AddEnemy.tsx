import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import React, { Component } from 'react'
import * as AddEnemyAPI from '../API/AddEnemy'
import { EnemyForm } from '../Components/EnemyForm'
import { IWEnemy } from '../Utils/Models'

type IProps = {}
type IState = {
    loading: boolean
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
        this.showError = this.showError.bind(this)
        this.showSuccess = this.showSuccess.bind(this)

        this.state = {
            loading: false
        }
    }

    /**
     * Add enemy to database
     * @param model Enemy model
     */
    private async handleSubmit(model: IWEnemy): Promise<void> {
        this.setState({ loading: true })

        const error = await AddEnemyAPI.commit(model)
        if (error) {
            this.showError(error)
            return
        }

        this.showSuccess()
    }

    /**
     * Displays any errors that occur when submitting
     * the AddEnemyForm
     * @param error Error when submitting AddEnemyForm
     */
    private showError(error?: Error): void {
        this.setState({ loading: false })

        const notificationArgs: ArgsProps = {
            message: 'Failed to create new enemy',
            duration: this._messageDuration
        }

        if (error) {
            error.name = ''
            notificationArgs['description'] = error.toString()
        }

        notification.error(notificationArgs)
    }

    /**
     * Shows success message if AddEnemyForm submits without
     * errors
     */
    private showSuccess(): void {
        this.setState({ loading: false })

        const notificationArgs: ArgsProps = {
            message: 'Created new enemy successfully',
            duration: this._messageDuration
        }

        notification.success(notificationArgs)
    }

    render() {
        return (
            <EnemyForm
                submitText='Add Enemy'
                onSubmit={this.handleSubmit}
                loading={this.state.loading}
            />
        )
    }
}
