import React, { Component } from 'react'

type IProps = {}
type IState = {}

export class AddEnemyLayout extends Component<IProps, IState> {
    static displayName = AddEnemyLayout.name

    render() {
        return <div>{this.props.children}</div>
    }
}
