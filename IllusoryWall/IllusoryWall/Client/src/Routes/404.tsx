import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'

interface IProps extends RouteComponentProps {}
type IState = {}

export class _404 extends Component<IProps, IState> {
    static displayName = _404.name

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <h3>404: Not found</h3>
                <p>{this.props.location.pathname}</p>
            </div>
        )
    }
}
