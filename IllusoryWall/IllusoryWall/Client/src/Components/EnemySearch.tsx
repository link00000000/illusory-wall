import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { Component } from 'react'
import styles from './EnemySearch.module.css'

type IProps = {
    disabled?: boolean
}
type IState = {
    name: string
    loading: boolean
}

export class EnemySearch extends Component<IProps, IState> {
    static displayName = EnemySearch.name

    constructor(props: IProps) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            name: '',
            loading: false
        }
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ name: event.currentTarget.value })
    }

    private handleSubmit(_event: any): void {
        console.log(this.state.name)
    }

    render() {
        return (
            <div className={styles['search']}>
                <Input
                    disabled={this.props.disabled}
                    placeholder='Type to search for enemy by name'
                    allowClear
                    onChange={this.handleChange}
                    value={this.state.name}
                    className={styles['search-bar']}
                />
                <Button
                    type='primary'
                    className={styles['submit']}
                    icon={<PlusOutlined />}
                    loading={this.state.loading}
                    onClick={this.handleSubmit}
                >
                    Add
                </Button>
            </div>
        )
    }
}
