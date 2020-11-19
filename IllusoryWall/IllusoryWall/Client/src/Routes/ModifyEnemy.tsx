import { Col, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import { Redirect, useHistory } from 'react-router'
import { EnemyList } from '../Components/EnemyList'
import { AuthStore } from '../Store/AuthStore'
import { AuthorizationLevel } from '../Utils/AuthModels'

interface IProps {}

export const ModifyEnemy: FunctionComponent<IProps> = (props: IProps) => {
    ModifyEnemy.displayName = ModifyEnemy.name

    const history = useHistory()
    const [authenticated, level] = AuthStore.useState((s) => [
        s.authenticated,
        s.level
    ])

    const handleSubmit = (id?: number) => {
        if (id === undefined) return

        history.push('/update/' + id)
    }

    if (!(authenticated && level === AuthorizationLevel.Admin)) {
        return <Redirect to='/' />
    }

    return (
        <Row justify='center'>
            <Col sm={24} md={24} lg={12} xl={12} xxl={8}>
                <EnemyList onSubmit={handleSubmit} />
            </Col>
        </Row>
    )
}
