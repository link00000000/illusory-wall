import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React, { Component } from 'react'
import { IWEnemy } from '../Common/Models'
import { commit } from './AddEnemyAPI'

type IProps = {}
type IState = { model: IWEnemy }

/**
 * Form used to input information for a new enemy
 */
export class AddEnemyForm extends Component<IProps, IState> {
    static displayName = AddEnemyForm.name

    constructor(props: IProps) {
        super(props)

        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            model: {
                name: ''
            }
        }
    }

    /**
     * Update state on text input change
     * @param event Text input or textarea update event
     */
    private handleTextChange(
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
        const { name, value } = event.currentTarget
        this.setState({
            model: { ...this.state.model, [name]: value }
        } as any)
    }

    /**
     * Update state on checkbox input change
     * @param event Checkbox update event
     */
    private handleCheckboxChange(event: CheckboxChangeEvent): void {
        const { name } = event.target
        const key = name as keyof IWEnemy
        const value = !this.state.model[key]

        this.setState({
            model: { ...this.state.model, [key]: value }
        } as any)
    }

    /**
     * Commit new enemy to API
     * @param event Form submit event
     */
    private async handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault()

        // TODO: More graceful error, like showing a message to the user
        const error = await commit(this.state.model)
        if (error) throw error
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name
                    <input
                        type='text'
                        name='name'
                        onChange={this.handleTextChange}
                        value={this.state.model.name ?? ''}
                    />
                </label>

                <label>
                    Description
                    <textarea
                        name='description'
                        onChange={this.handleTextChange}
                        value={this.state.model.description ?? ''}
                    />
                </label>

                <label>
                    Respawns
                    <Checkbox
                        name='respawns'
                        onChange={this.handleCheckboxChange}
                        checked={this.state.model.respawns ?? false}
                    />
                </label>

                <label>
                    Class
                    <input
                        type='text'
                        name='class'
                        onChange={this.handleTextChange}
                        value={this.state.model.class ?? ''}
                    />
                </label>

                <label>
                    Image
                    <input
                        type='url'
                        name='imagePath'
                        onChange={this.handleTextChange}
                        value={this.state.model.imagePath ?? ''}
                    />
                </label>

                {/* @TODO: IWLocation Form */}

                {/* @TODO: IWDrop Form */}

                {/* @TODO: IWDamage Form */}

                <input type='submit' value='Add'></input>
            </form>
        )
    }
}
