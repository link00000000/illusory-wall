import { Input } from 'antd'
import React, { Component } from 'react'

type IProps = {}
type IState = {}

export class EnemySearch extends Component<IProps, IState> {
    static displayName = EnemySearch.name

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <Input placeholder='Type to search' />
            </div>
        )
    }
}
