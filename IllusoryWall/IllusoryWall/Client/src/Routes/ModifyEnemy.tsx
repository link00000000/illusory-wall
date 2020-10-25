import { message } from 'antd'
import { MessageType } from 'antd/lib/message'
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
    loader?: MessageType
    id: number
    model?: IWEnemy
}

export class ModifyEnemy extends Component<IProps, IState> {
    static displayName = ModifyEnemy.name
    private readonly _messageDuration = 2

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.showError = this.showError.bind(this)
        this.showSuccess = this.showSuccess.bind(this)
        this.showLoading = this.showLoading.bind(this)

        this.state = {
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
        this.showLoading()

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

        message.success('Updated enemy successfully.', this._messageDuration)
    }

    /**
     * Shows loader while the submission from AddEnemyFrom is being
     * requested
     */
    private showLoading(): void {
        const loadingDismiss = message.loading('Updating enemy..', 0)
        this.setState({ loader: loadingDismiss })
    }

    render() {
        if (this.state.model) {
            return (
                <EnemyForm
                    submitText='Update Enemy'
                    onSubmit={this.handleSubmit}
                    initialValues={this.state.model}
                />
            )
        }
        return <></>
    }
}
