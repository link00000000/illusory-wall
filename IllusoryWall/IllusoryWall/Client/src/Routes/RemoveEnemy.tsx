import { Col, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { RemoveEnemyInput } from '../Components/RemoveEnemyInput'
import { AuthStore } from '../Store/AuthStore'
import { AuthorizationLevel } from '../Utils/AuthModels'

type IProps = {}

export const RemoveEnemy: FunctionComponent<IProps> = (props: IProps) => {
    RemoveEnemy.displayName = RemoveEnemy.name

    const [authenticated, level] = AuthStore.useState((s) => [
        s.authenticated,
        s.level
    ])

    if (!(authenticated && level === AuthorizationLevel.Admin)) {
        return <Redirect to='/' />
    }

    return (
        <Row justify='center'>
            <Col sm={24} md={24} lg={12} xl={12} xxl={8}>
                <RemoveEnemyInput />
            </Col>
        </Row>
    )
}
