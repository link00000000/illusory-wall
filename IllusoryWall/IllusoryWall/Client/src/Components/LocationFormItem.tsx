import React, { Component } from 'react'
import { IWLocation } from '../Utils/Models'

type IProps = {
    model: IWLocation
}
type IState = {}

export class LocationFormItem extends Component<IProps, IState> {
    static displayName = LocationFormItem.name

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        return <div></div>
    }
}
