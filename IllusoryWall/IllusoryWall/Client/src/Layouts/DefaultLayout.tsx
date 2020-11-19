import { Col, Layout, Row } from 'antd'
import React, { Component } from 'react'
import { AuthenticateButton } from '../Components/AuthenticateButton'
import { EnemySearch } from '../Components/EnemySearch'
import { NavigationMenu } from '../Components/NavigationMenu'
import styles from './DefaultLayout.module.css'

type IProps = {
    disableSearch?: boolean
}
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
                        breakpoint='lg'
                    >
                        <NavigationMenu collapsed={this.state.collapsed} />
                    </Layout.Sider>
                    <Layout.Header
                        className={
                            this.state.collapsed
                                ? styles['layout-header-collapsed']
                                : styles['layout-header']
                        }
                    >
                        <Row>
                            <Col
                                xxl={{ span: 12, offset: 6 }}
                                xl={{ span: 14, offset: 5 }}
                                lg={{ span: 14, offset: 3 }}
                                md={{ span: 14, offset: 2 }}
                                xs={{ span: 14, offset: 1 }}
                            >
                                <EnemySearch
                                    disabled={this.props.disableSearch}
                                />
                            </Col>
                            <Col
                                xxl={{ span: 3, offset: 3 }}
                                xl={{ span: 4, offset: 1 }}
                                lg={{ span: 5, offset: 2 }}
                                md={{ span: 6, offset: 2 }}
                                xs={{ span: 7, offset: 2 }}
                                className={styles['authenticate-button']}
                            >
                                <AuthenticateButton authenticated={true} />
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
