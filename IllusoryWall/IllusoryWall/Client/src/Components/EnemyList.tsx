import { AutoComplete, Button, Card, Form, Spin } from 'antd'
import React, { Component } from 'react'
import * as FetchEntries from '../API/FetchEntries'
import { EnemyEntry } from '../Utils/Models'
import styles from './EnemyList.module.css'

type IProps = {
    onSubmit?: (id?: number) => void
}
type IState = {
    entries: EnemyEntry[]
    loading: boolean
    selectedValue: string
}

type OptionsType = { label?: string; value: string }[]

export class EnemyList extends Component<IProps, IState> {
    static displayName = EnemyList.name

    constructor(props: IProps) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            entries: [],
            loading: true,
            selectedValue: ''
        }
    }

    componentDidMount() {
        FetchEntries.fetch().then((entries) => {
            this.setState({ entries, loading: false })
        })
    }

    private handleChange(value: string) {
        this.setState({ selectedValue: value })
    }

    private handleSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.selectedValueId)
        }
    }

    private get options(): OptionsType {
        return this.state.entries.map((entry) => ({
            label: entry.name,
            value: entry.name
        }))
    }

    private get selectedValueId() {
        const name = this.state.selectedValue

        const entry = this.state.entries.find(
            (entry) => entry.name.toLowerCase() === name.toLowerCase()
        )

        if (entry === undefined) return undefined

        return entry.id
    }

    private get isValidInput() {
        return this.selectedValueId !== null
    }

    render() {
        return (
            <Card title='Select enemy'>
                <Spin spinning={this.state.loading}>
                    <Form onFinish={this.handleSubmit}>
                        <Form.Item>
                            <AutoComplete
                                autoFocus
                                options={this.options}
                                className={styles['autocomplete']}
                                placeholder='Enemy name'
                                onChange={this.handleChange}
                                filterOption={(inputValue, option) =>
                                    option?.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                    -1
                                }
                                value={this.state.selectedValue}
                            />
                        </Form.Item>
                        <Button
                            type='primary'
                            className={styles['submit-button']}
                            htmlType='submit'
                            disabled={!this.isValidInput}
                        >
                            Select
                        </Button>
                    </Form>
                </Spin>
            </Card>
        )
    }
}
