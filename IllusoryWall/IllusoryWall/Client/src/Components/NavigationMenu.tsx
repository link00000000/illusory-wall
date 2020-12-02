import {
    AimOutlined,
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    LineChartOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { FunctionComponent } from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { Logo } from './Logo'
import { AuthStore } from '../Store/AuthStore'
import { AuthorizationLevel } from '../Utils/AuthModels'

interface IProps extends RouteComponentProps {
    collapsed?: boolean
}

const navigationItems: {
    [key: string]: {
        route: string
        icon: JSX.Element
        authorization: AuthorizationLevel
    }
} = {
    Overview: {
        route: '/',
        icon: <HomeOutlined />,
        authorization: AuthorizationLevel.None
    },
    Comparison: {
        route: '/comparison',
        icon: <LineChartOutlined />,
        authorization: AuthorizationLevel.None
    },
    Hitlists: {
        route: '/hitlists',
        icon: <AimOutlined />,
        authorization: AuthorizationLevel.User
    },
    Add: {
        route: '/add',
        icon: <PlusOutlined />,
        authorization: AuthorizationLevel.Admin
    },
    Edit: {
        route: '/update',
        icon: <EditOutlined />,
        authorization: AuthorizationLevel.Admin
    },
    Remove: {
        route: '/remove',
        icon: <DeleteOutlined />,
        authorization: AuthorizationLevel.Admin
    }
}

const _NavigationMenu: FunctionComponent<IProps> = (props: IProps) => {
    _NavigationMenu.displayName = 'NavigationMenu'

    const auth = AuthStore.useState()

    const basePath = (): string => {
        const pathname = props.location.pathname
        const endIndex = pathname.indexOf('/', 1)
        if (endIndex === -1) {
            return pathname
        }

        return pathname.substring(0, endIndex)
    }

    return (
        <div>
            <Menu mode='vertical-left' theme='dark' selectedKeys={[basePath()]}>
                <Logo small={props.collapsed} />
                {Object.entries(navigationItems)
                    .filter(([_, { authorization }]) => {
                        switch (authorization) {
                            case AuthorizationLevel.None:
                                return true
                            case AuthorizationLevel.User:
                                return auth.authenticated
                            case AuthorizationLevel.Admin:
                                return (
                                    auth.authenticated &&
                                    auth.level === AuthorizationLevel.Admin
                                )
                        }
                    })
                    .map(([displayName, { route, icon }]) => (
                        <Menu.Item key={route} icon={icon}>
                            <NavLink to={route}>{displayName}</NavLink>
                        </Menu.Item>
                    ))}
            </Menu>
        </div>
    )
}

export const NavigationMenu = withRouter(_NavigationMenu)
