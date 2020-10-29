import { Input } from 'antd'
import React, { Component } from 'react'

type IProps = {
    disabled?: boolean
}
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
                <Input
                    disabled={this.props.disabled}
                    placeholder='Type to search for enemy by name'
                />
            </div>
        )
    }
}
