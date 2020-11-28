import { Col, notification, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { RemoveEnemyInput } from '../Components/RemoveEnemyInput'
import { AuthStore } from '../Store/AuthStore'
import { AuthorizationLevel } from '../Utils/AuthModels'
import * as RemoveEnemyAPI from '../API/RemoveEnemy'

type IProps = {}

export const RemoveEnemy: FunctionComponent<IProps> = (props: IProps) => {
    RemoveEnemy.displayName = RemoveEnemy.name

    const [authenticated, level] = AuthStore.useState((s) => [
        s.authenticated,
        s.level
    ])
    const token = AuthStore.useState((s) => s.jwt)

    if (!(authenticated && level === AuthorizationLevel.Admin)) {
        return <Redirect to='/' />
    }

    const handleSubmit = async (id: number) => {
        const error = await RemoveEnemyAPI.commit(id, token)
        if (error) {
            notification.error({ message: error.message })
        }
    }

    return (
        <Row justify='center'>
            <Col sm={24} md={24} lg={12} xl={12} xxl={8}>
                <RemoveEnemyInput onSubmit={handleSubmit} />
            </Col>
        </Row>
    )
}
