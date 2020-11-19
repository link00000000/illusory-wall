import { Button } from 'antd'
import React, { FunctionComponent } from 'react'
import styles from './AuthenticateButton.module.css'

interface IProps {
    authenticated: boolean
    username?: string
    onLogin?: (username: string, password: string) => void
    onRegister?: (username: string, password: string) => void
    onLogout?: () => void
}

export const AuthenticateButton: FunctionComponent<IProps> = (
    props: IProps
) => {
    return (
        <div className={styles['authenticate-button']}>
            {props.authenticated ? (
                <Button>Logout</Button>
            ) : (
                <>
                    <Button type='text'>Login</Button>
                    <Button type='primary'>Sign Up</Button>
                </>
            )}
        </div>
    )
}
