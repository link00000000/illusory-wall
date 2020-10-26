import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
    AutoComplete,
    Button,
    Card,
    Form,
    Modal,
    notification,
    Spin
} from 'antd'
import React, { Component } from 'react'
import * as FetchEntries from '../API/FetchEntries'
import * as RemoveEnemy from '../API/RemoveEnemy'
import { EnemyEntry } from '../Utils/Models'
import styles from './RemoveEnemyInput.module.css'

type IProps = {}
type IState = {
    entries: EnemyEntry[]
    loading: boolean
    selectedValue: string
}

type OptionsType = { label?: string; value: string }[]

export class RemoveEnemyInput extends Component<IProps, IState> {
    static displayName = RemoveEnemyInput.name

    constructor(props: IProps) {
        super(props)

        this.options = this.options.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getIdFromName = this.getIdFromName.bind(this)
        this.isValidInput = this.isValidInput.bind(this)
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.removeEnemy = this.removeEnemy.bind(this)
        this.removeSelectedEntry = this.removeSelectedEntry.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.showSuccess = this.showSuccess.bind(this)

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

    private options(): OptionsType {
        return this.state.entries.map((entry) => ({
            label: entry.name,
            value: entry.name
        }))
    }

    private handleChange(value: string) {
        this.setState({ selectedValue: value })
    }

    private handleSubmit(): void {
        this.showDeleteConfirm()
    }

    private getIdFromName(name: string) {
        const entry = this.state.entries.find(
            (entry) => entry.name.toLowerCase() === name.toLowerCase()
        )

        if (entry === undefined) return null

        return entry.id
    }

    private isValidInput() {
        return this.getIdFromName(this.state.selectedValue) !== null
    }

    private showDeleteConfirm() {
        Modal.confirm({
            title: `Are you sure delete ${this.state.selectedValue}?`,
            icon: <ExclamationCircleOutlined />,
            content: `${this.state.selectedValue} will be deleted permanently. This action cannot be undone`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                return this.handleConfirm()
            }
        })
    }

    private async handleConfirm() {
        try {
            await this.removeEnemy()
            this.removeSelectedEntry()
        } catch (error) {
            this.showError(error)
            return
        }

        const selectedEnemey = this.state.selectedValue
        this.resetForm()
        this.showSuccess(selectedEnemey)
    }

    private async removeEnemy() {
        const id = this.getIdFromName(this.state.selectedValue)
        if (id === null) {
            const errorText = 'Error getting id. id null'
            console.error(errorText)
            throw Error(errorText)
        }

        try {
            await RemoveEnemy.commit(id)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    private removeSelectedEntry() {
        const entries = this.state.entries
        const id = this.getIdFromName(this.state.selectedValue)

        const index = entries.findIndex((entry) => entry.id === id)
        if (index === -1) {
            const errorText = 'Error finding entry'
            console.error(errorText)
            throw Error(errorText)
        }

        entries.splice(index, 1)
        this.setState({ entries })
    }

    private resetForm() {
        this.setState({ selectedValue: '' })
    }

    private showSuccess(enemyName: string) {
        notification.success({
            message: 'Success!',
            description: `${enemyName} successfully removed from database`
        })
    }

    private showError(error: Error | string) {
        let message = error instanceof Error ? error.message : error

        notification.error({
            message: 'Error removing enemy',
            description: message
        })
    }

    render() {
        return (
            <Card title='Remove enemy'>
                <Spin spinning={this.state.loading}>
                    <Form onFinish={this.handleSubmit}>
                        <Form.Item>
                            <AutoComplete
                                autoFocus
                                options={this.options()}
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
                            disabled={!this.isValidInput()}
                        >
                            Remove
                        </Button>
                    </Form>
                </Spin>
            </Card>
        )
    }
}
