import { Col, Layout, Row } from 'antd'
import React, { Component } from 'react'
import { EnemySearch } from '../Components/EnemySearch'
import { NavigationMenu } from '../Components/NavigationMenu'
import styles from './DefaultLayout.module.css'

type IProps = {}
type IState = {
    collapsed: boolean
}

export class DefaultLayout extends Component<IProps, IState> {
    static displayName = DefaultLayout.name

    constructor(props: IProps | Readonly<IProps>) {
        super(props)

        this.handleCollapse = this.handleCollapse.bind(this)

        this.state = {
            collapsed: false
        }
    }

    private handleCollapse(collapsed: boolean) {
        this.setState({ collapsed })
    }

    render() {
        return (
            <div>
                <Layout
                    className={styles['layout']}
                    style={this.state.collapsed ? { marginLeft: 80 } : {}}
                >
                    <Layout.Sider
                        className={styles['layout-sider']}
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.handleCollapse}
                    >
                        <NavigationMenu />
                    </Layout.Sider>
                    <Layout.Header
                        className={
                            this.state.collapsed
                                ? styles['layout-header-collapsed']
                                : styles['layout-header']
                        }
                    >
                        <Row>
                            <Col span={12} offset={6}>
                                <EnemySearch />
                            </Col>
                        </Row>
                    </Layout.Header>
                    <Layout.Content className={styles['layout-content']}>
                        {this.props.children}
                    </Layout.Content>
                </Layout>
            </div>
        )
    }
}
