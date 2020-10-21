import React, { Component } from 'react'
import { LocationFormModal } from '../Components/LocationFormModal'
import { IWLocation } from '../Utils/Models'

type IProps = {}
type IState = {}

export class TestRoute extends Component<IProps, IState> {
    static displayName = TestRoute.name

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)

        this.state = {}
    }

    private handleSubmit(model: IWLocation) {
        console.log(model)
    }

    private handleCancel() {
        console.log('Cancel')
    }

    render() {
        return (
            <div>
                <LocationFormModal
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleCancel}
                />
            </div>
        )
    }
}
