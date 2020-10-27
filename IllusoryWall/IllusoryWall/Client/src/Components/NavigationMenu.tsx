import { Menu } from 'antd'
import React, { Component } from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'

interface IProps extends RouteComponentProps {}
type IState = {}

class _NavigationMenu extends Component<IProps, IState> {
    static displayName = _NavigationMenu.name

    private static readonly navigationItems: { [key: string]: string } = {
        Home: '/',
        Add: '/add',
        Edit: '/update',
        Remove: '/remove'
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
                    {Object.entries(_NavigationMenu.navigationItems).map(
                        ([displayName, route]) => (
                            <Menu.Item key={route}>
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
