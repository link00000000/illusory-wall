import React, { Component } from 'react'

type IProps = {}
type IState = {}

export class DefaultLayout extends Component<IProps, IState> {
    static displayName = DefaultLayout.name

    render() {
        return (
            <div>
                HEADER
                {this.props.children}
            </div>
        )
    }
}
