import { Col, Row } from 'antd'
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { EnemyList } from '../Components/EnemyList'

interface IProps extends RouteComponentProps {}
type IState = {}

export class ModifyEnemy extends Component<IProps, IState> {
    static displayName = ModifyEnemy.name

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {}
    }

    private handleSubmit(id?: number): void {
        if (id === undefined) return

        this.props.history.push('/update/' + id)
    }

    render() {
        return (
            <Row justify='center'>
                <Col sm={24} md={24} lg={12} xl={12} xxl={8}>
                    <EnemyList onSubmit={this.handleSubmit} />
                </Col>
            </Row>
        )
    }
}
