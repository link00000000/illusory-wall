import { Col, Row } from 'antd'
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as FetchEnemyAPI from '../API/FetchEnemy'
import { EnemyCard } from '../Components/EnemyCard'
import { EnemyCardSkeleton } from '../Components/EnemyCardSkeleton'
import { IWEnemy } from '../Utils/Models'
import styles from './ViewEnemy.module.css'

interface enemyState {
    [id: number]: IWEnemy | null
}

interface IProps extends RouteComponentProps {}
type IState = {
    enemies: enemyState
}

export class ViewEnemy extends Component<IProps, IState> {
    static displayName = ViewEnemy.name

    private query: URLSearchParams

    constructor(props: IProps) {
        super(props)

        this.query = new URLSearchParams(this.props.location.search)

        this.state = {
            enemies: []
        }
    }

    componentDidMount() {
        const ids = this.query
            .getAll('id')
            .map((id) => parseInt(id))
            .filter((id) => !Number.isNaN(id))

        // Use one skeleton per id
        let state: enemyState = {}
        ids.forEach((id) => (state[id] = null))

        // Fetch enemy models async
        ids.forEach((id) => {
            this.fetchEnemy(id).then((model) => {
                let newEnemyState = this.state.enemies
                newEnemyState[id] = model

                this.setState({ enemies: newEnemyState })
            })
        })
    }

    private async fetchEnemy(id: number): Promise<IWEnemy | null> {
        try {
            return await FetchEnemyAPI.fetch(id)
        } catch (error) {
            console.error(error)
        }
        return null
    }

    render() {
        if (Object.entries(this.state.enemies).length === 0) {
            // @TODO Handle main search page
            return <p>/</p>
        }

        return (
            <Row gutter={32} justify='space-around'>
                {Object.entries(this.state.enemies).map(([id, model]) => (
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={12}
                        xxl={8}
                        key={id}
                        className={styles['column']}
                    >
                        {model ? (
                            <EnemyCard model={model} />
                        ) : (
                            <EnemyCardSkeleton />
                        )}
                    </Col>
                ))}
            </Row>
        )
    }
}
