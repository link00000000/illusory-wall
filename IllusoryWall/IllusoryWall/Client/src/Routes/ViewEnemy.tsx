import { Col, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import * as FetchEnemyAPI from '../API/FetchEnemy'
import { EnemyCard } from '../Components/EnemyCard'
import { EnemyCardSkeleton } from '../Components/EnemyCardSkeleton'
import { ViewEnemiesStore } from '../Store/ViewEnemiesStore'
import { IWEnemy } from '../Utils/Models'
import styles from './ViewEnemy.module.css'

interface IProps extends RouteComponentProps {}

export const ViewEnemy: FunctionComponent<IProps> = (props: IProps) => {
    ViewEnemy.displayName = ViewEnemy.name

    const query = new URLSearchParams(props.location.search)

    const fetchEnemy = async (id: number): Promise<IWEnemy | null> => {
        try {
            return await FetchEnemyAPI.fetch(id)
        } catch (error) {
            console.error(error)
        }
        return null
    }

    React.useEffect(() => {
        const ids = query
            .getAll('id')
            .map((id) => parseInt(id))
            .filter((id) => !Number.isNaN(id))

        ids.forEach((id) => {
            fetchEnemy(id).then((model) => {
                if (model === null) return

                ViewEnemiesStore.update((s) => {
                    s.enemies[id] = model
                })
            })
        })
    }, [])

    const enemies = ViewEnemiesStore.useState((s) => s.enemies)

    if (Object.entries(enemies).length === 0) {
        // @TODO Handle main search page
        return <p>/</p>
    }

    return (
        <Row gutter={32} justify='space-around'>
            {Object.entries(enemies).map(([id, model]) => (
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
