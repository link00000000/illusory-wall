import { Col, Layout, Row } from 'antd'
import React, { Component } from 'react'
import { EnemySearch } from '../Components/EnemySearch'
import { NavigationMenu } from '../Components/NavigationMenu'
import styles from './DefaultLayout.module.css'

type IProps = {}
type IState = {}

export class DefaultLayout extends Component<IProps, IState> {
    static displayName = DefaultLayout.name

    render() {
        return (
            <div>
                <Layout className={styles['layout']}>
                    <Layout.Header className={styles['layout-header']}>
                        <Row>
                            <Col span={12} offset={6}>
                                <EnemySearch />
                            </Col>
                        </Row>
                    </Layout.Header>
                    <Layout.Sider className={styles['layout-sider']}>
                        <NavigationMenu />
                    </Layout.Sider>
                    <Layout.Content className={styles['layout-content']}>
                        {this.props.children}
                    </Layout.Content>
                </Layout>
            </div>
        )
    }
}
