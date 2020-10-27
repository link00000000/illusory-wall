import { Layout } from 'antd'
import React, { Component } from 'react'
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
                    <Layout.Sider className={styles['layout-sider']}>
                        <NavigationMenu />
                    </Layout.Sider>
                    <Layout.Content>{this.props.children}</Layout.Content>
                </Layout>
            </div>
        )
    }
}
