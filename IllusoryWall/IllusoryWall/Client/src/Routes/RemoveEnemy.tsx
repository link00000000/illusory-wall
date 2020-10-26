import { Col, Row } from 'antd'
import React, { Component } from 'react'
import { RemoveEnemyInput } from '../Components/RemoveEnemyInput'

type IProps = {}
type IState = {}

export class RemoveEnemy extends Component<IProps, IState> {
    static displayName = RemoveEnemy.name

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <Row>
                <Col span={8} offset={8}>
                    <RemoveEnemyInput />
                </Col>
            </Row>
        )
    }
}
