import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import React, { Component } from 'react'
import * as AddEnemyAPI from '../API/AddEnemy'
import { EnemyForm } from '../Components/EnemyForm'
import { IWEnemy } from '../Utils/Models'
import { DamageCategory, DamageType } from '../Utils/Types'

type IProps = {}
type IState = {
    loading: boolean
    model: IWEnemy
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
            loading: false,
            model: {
                name: '',
                locations: [],
                drops: [],
                damages: []
            }
        }
    }

    /**
     * Add enemy to database
     * @param model Enemy model
     */
    private async handleSubmit(model: Partial<IWEnemy>): Promise<void> {
        this.setState({ loading: true })

        if (model.name === undefined) {
            return
        }

        const error = await AddEnemyAPI.commit(model as IWEnemy)
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
            <>
                <EnemyForm
                    model={this.state.model}
                    onChange={(model: IWEnemy) => {
                        this.setState({ model })
                    }}
                    onSubmit={this.handleSubmit}
                    loading={this.state.loading}
                />
                <button
                    onClick={() => {
                        this.setState({
                            model: {
                                name: 'Testing',
                                description: 'this is the description',
                                respawns: null,
                                locations: [
                                    { name: 'test location', hp: 10, souls: 20 }
                                ],
                                drops: [
                                    {
                                        name: 'test drop',
                                        location: 'nowhere',
                                        rate: 1
                                    }
                                ],
                                damages: [
                                    {
                                        category: 'w' as DamageCategory,
                                        damageType: 'frost' as DamageType
                                    }
                                ]
                            }
                        })
                    }}
                >
                    Reset
                </button>
                <button
                    onClick={() => {
                        this.setState({ loading: !this.state.loading })
                    }}
                >
                    Toggle Loading
                </button>
            </>
        )
    }
}
