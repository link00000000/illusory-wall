import { Card, Col, Divider, Image, Row, Skeleton } from 'antd'
import React, { Component } from 'react'

type IProps = {}
type IState = {}

export class EnemyCardSkeleton extends Component<IProps, IState> {
    static displayName = EnemyCardSkeleton.name

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <Card cover={<Image src='/fallback-image.png' />}>
                <Skeleton active />
                <Divider />
                <Row>
                    <Col span={8}>
                        <Card type='inner'>
                            <Skeleton active />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card type='inner'>
                            <Skeleton active />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card type='inner'>
                            <Skeleton active />
                        </Card>
                    </Col>
                </Row>
            </Card>
        )
    }
}
