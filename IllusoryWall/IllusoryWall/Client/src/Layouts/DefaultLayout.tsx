import { Col, Layout, Row } from 'antd'
import React, { FunctionComponent } from 'react'
import { AuthenticateButton } from '../Components/AuthenticateButton'
import { EnemySearch } from '../Components/EnemySearch'
import { NavigationMenu } from '../Components/NavigationMenu'
import styles from './DefaultLayout.module.css'
import { AuthStore } from '../Store/AuthStore'

type IProps = {
    disableSearch?: boolean
}
type IState = {
    collapsed: boolean
}

export const DefaultLayout: FunctionComponent<IProps> = (
    props: React.PropsWithChildren<IProps>
) => {
    DefaultLayout.displayName = DefaultLayout.name

    const [collapsed, setCollapsed] = React.useState<boolean>(false)
    const auth = AuthStore.useState()

    return (
        <div>
            <Layout
                className={styles['layout']}
                style={collapsed ? { marginLeft: 80 } : {}}
            >
                <Layout.Sider
                    className={styles['layout-sider']}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => {
                        setCollapsed(value)
                    }}
                    breakpoint='lg'
                >
                    <NavigationMenu collapsed={collapsed} />
                </Layout.Sider>
                <Layout.Header
                    className={
                        collapsed
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
                            <EnemySearch disabled={props.disableSearch} />
                        </Col>
                        <Col
                            xxl={{ span: 3, offset: 3 }}
                            xl={{ span: 4, offset: 1 }}
                            lg={{ span: 5, offset: 2 }}
                            md={{ span: 6, offset: 2 }}
                            xs={{ span: 7, offset: 2 }}
                            className={styles['authenticate-button']}
                        >
                            <AuthenticateButton
                                authenticated={auth.authenticated}
                            />
                        </Col>
                    </Row>
                </Layout.Header>
                <Layout.Content className={styles['layout-content']}>
                    {props.children}
                </Layout.Content>
            </Layout>
        </div>
    )
}
