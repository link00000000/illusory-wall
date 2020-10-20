import React, { Component } from 'react'

type IProps = {}
type IState = {}

export class LocationForm extends Component<IProps, IState> {
    static displayName = LocationForm.name

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        return <div>LocationForm</div>
    }
}
