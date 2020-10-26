import React, { Component } from 'react'

type IProps = {}
type IState = {}

export class ViewEnemyLayout extends Component<IProps, IState> {
    static displayName = ViewEnemyLayout.name

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        return <>{this.props.children}</>
    }
}
