import React, { Component } from 'react'
import { LocationForm } from '../Components/LocationForm'

type IProps = {}
type IState = {}

export class TestRoute extends Component<IProps, IState> {
    static displayName = TestRoute.name

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <LocationForm />
            </div>
        )
    }
}
