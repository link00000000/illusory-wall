import {
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { Component } from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { Logo } from './Logo'

interface IProps extends RouteComponentProps {
    collapsed?: boolean
}
type IState = {}

class _NavigationMenu extends Component<IProps, IState> {
    static displayName = _NavigationMenu.name

    private static readonly navigationItems: {
        [key: string]: { route: string; icon: JSX.Element }
    } = {
        Home: { route: '/', icon: <HomeOutlined /> },
        Add: { route: '/add', icon: <PlusOutlined /> },
        Edit: { route: '/update', icon: <EditOutlined /> },
        Remove: { route: '/remove', icon: <DeleteOutlined /> }
    }

    private get basePath(): string {
        const pathname = this.props.location.pathname
        const endIndex = pathname.indexOf('/', 1)
        if (endIndex === -1) {
            return pathname
        }

        return pathname.substring(0, endIndex)
    }

    constructor(props: IProps) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <Menu
                    mode='vertical-left'
                    theme='dark'
                    selectedKeys={[this.basePath]}
                >
                    <Logo small={this.props.collapsed} />
                    {Object.entries(_NavigationMenu.navigationItems).map(
                        ([displayName, { route, icon }]) => (
                            <Menu.Item key={route} icon={icon}>
                                <NavLink to={route}>{displayName}</NavLink>
                            </Menu.Item>
                        )
                    )}
                </Menu>
            </div>
        )
    }
}

export const NavigationMenu = withRouter(_NavigationMenu)
