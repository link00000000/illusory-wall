import { Layout, notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as FetchEnemyAPI from '../API/FetchEnemy'
import * as ModifyEnemyAPI from '../API/ModifyEnemy'
import { EnemyForm } from '../Components/EnemyForm'
import { IWEnemy } from '../Utils/Models'

interface IMatchParams {
    id: string
}
interface IProps extends RouteComponentProps<IMatchParams> {}
type IState = {
    loading: boolean
    id: number
    model?: IWEnemy
}

export class ModifyEnemyId extends Component<IProps, IState> {
    static displayName = ModifyEnemyId.name
    private readonly _messageDuration = 2

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.showError = this.showError.bind(this)
        this.showSuccess = this.showSuccess.bind(this)

        this.state = {
            loading: false,
            id: -1
        }
    }

    /**
     * Fetch the enemy id from the route.
     * If no valid id specified, redirect
     */
    async componentDidMount() {
        const idString = this.props.match.params.id

        if (!idString) {
            this.props.history.replace('/')
        }

        const id = parseInt(idString)
        if (Number.isNaN(id)) {
            this.props.history.replace('/')
        }

        try {
            const model = await FetchEnemyAPI.fetch(id)
            this.setState({ id, model })

            return
        } catch (_error) {
            this.props.history.replace('/')
        }

        this.props.history.replace('/')
    }

    /**
     * Update enemy in database
     * @param model Enemy model
     */
    private async handleSubmit(model: IWEnemy): Promise<void> {
        this.setState({ loading: true })

        const error = await ModifyEnemyAPI.commit(this.state.id, model)
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
            message: 'Failed to modify enemy',
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
            message: 'Modified enemy successfully',
            duration: this._messageDuration
        }

        notification.success(notificationArgs)
    }

    render() {
        if (this.state.model) {
            return (
                <>
                    <Layout>
                        <Layout.Content>
                            <EnemyForm
                                buttonText='Update Enemy'
                                onSubmit={this.handleSubmit}
                                model={this.state.model}
                                onChange={(newModel) =>
                                    this.setState({ model: newModel })
                                }
                                loading={this.state.loading}
                            />
                        </Layout.Content>
                    </Layout>
                </>
            )
        }
        return <></>
    }
}
