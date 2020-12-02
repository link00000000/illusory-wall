import { Card, Col, Empty, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import { ChartHP } from '../Components/ChartHP'
import { ChartSouls } from '../Components/ChartSouls'
import { ChartEnemiesPerLocation } from '../Components/ChartEnemiesPerLocation'
import { ChartDropsPerLocation } from '../Components/ChartDropsPerLocation'
import { ViewEnemiesStore } from '../Store/ViewEnemiesStore'

interface IProps {}

export const Comparison: FunctionComponent<IProps> = (props: IProps) => {
    Comparison.displayName = Comparison.name

    const enemies = ViewEnemiesStore.useState((s) =>
        Object.values(s.enemies).filter((x) => x !== undefined && x !== null)
    )

    if (enemies.length === 0) {
        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
        )
    }

    return (
        <Row justify='space-around'>
            <Col sm={{ span: 24 }} xxl={{ span: 11 }}>
                <Card title='Hit Points' style={{ marginBottom: '32px' }}>
                    <ChartHP enemies={enemies} />
                </Card>
            </Col>
            <Col sm={{ span: 24 }} xxl={{ span: 11 }}>
                <Card title='Souls' style={{ marginBottom: '32px' }}>
                    <ChartSouls enemies={enemies} />
                </Card>
            </Col>
            <Col sm={{ span: 24 }} xxl={{ span: 11 }}>
                <Card
                    title='Enemies Per Location'
                    style={{ marginBottom: '32px' }}
                >
                    <ChartEnemiesPerLocation enemies={enemies} />
                </Card>
            </Col>
            <Col sm={{ span: 24 }} xxl={{ span: 11 }}>
                <Card
                    title='Drops Per Location'
                    style={{ marginBottom: '32px' }}
                >
                    <ChartDropsPerLocation enemies={enemies} />
                </Card>
            </Col>
        </Row>
    )
}
