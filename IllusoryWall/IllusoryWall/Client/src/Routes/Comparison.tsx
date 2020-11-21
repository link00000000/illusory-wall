import { Card, Col, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import { ChartHP } from '../Components/ChartHP'
import { ChartSouls } from '../Components/ChartSouls'
import { ViewEnemiesStore } from '../Store/ViewEnemiesStore'

interface IProps {}

export const Comparison: FunctionComponent<IProps> = (props: IProps) => {
    Comparison.displayName = Comparison.name

    const enemies = ViewEnemiesStore.useState((s) =>
        Object.values(s.enemies).filter((x) => x !== undefined && x !== null)
    )

    return (
        <Row>
            <Col sm={{ span: 24 }} xxl={{ span: 11 }}>
                <Card title='Hit Points' style={{ marginBottom: '32px' }}>
                    <ChartHP enemies={enemies} />
                </Card>
            </Col>
            <Col sm={{ span: 24 }} xxl={{ span: 11, offset: 2 }}>
                <Card title='Souls' style={{ marginBottom: '32px' }}>
                    <ChartSouls enemies={enemies} />
                </Card>
            </Col>
        </Row>
    )
}
