import React, { Component } from 'react'

type IProps = {}
type IState = {}

/**
 * Add enemy page layout
 */
export class AddEnemyLayout extends Component<IProps, IState> {
    static displayName = AddEnemyLayout.name

    render() {
        return <div>{this.props.children}</div>
    }
}
