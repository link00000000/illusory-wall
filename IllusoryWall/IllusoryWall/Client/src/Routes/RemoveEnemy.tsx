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
            <Row justify='center'>
                <Col sm={24} md={24} lg={12} xl={12} xxl={8}>
                    <RemoveEnemyInput />
                </Col>
            </Row>
        )
    }
}
