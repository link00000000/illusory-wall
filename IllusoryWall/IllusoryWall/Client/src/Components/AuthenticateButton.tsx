import { Button, Modal, Form, Input } from 'antd'
import React, { FunctionComponent } from 'react'
import styles from './AuthenticateButton.module.css'

interface Credentials {
    username: string
    password: string
}

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
    const [showLogin, setShowLogin] = React.useState<boolean>(false)
    const [showRegistration, setShowRegistration] = React.useState<boolean>(
        false
    )

    const [loginFormRef] = Form.useForm<Credentials>()
    const [registerFromRef] = Form.useForm<Credentials>()

    const handleLoginFormSubmit = async () => {
        const credentials = (await loginFormRef.validateFields()) as Credentials
        loginFormRef.resetFields()
        setShowLogin(false)
    }

    const handleRegisterFormSubmit = async () => {
        const credentials = (await registerFromRef.validateFields()) as Credentials
        registerFromRef.resetFields()
        setShowRegistration(false)
    }

    return (
        <div className={styles['authenticate-button']}>
            {props.authenticated ? (
                <Button>Logout</Button>
            ) : (
                <>
                    <Button
                        type='text'
                        onClick={() => {
                            setShowLogin(true)
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        type='primary'
                        onClick={() => {
                            setShowRegistration(true)
                        }}
                    >
                        Sign Up
                    </Button>

                    <Modal
                        visible={showLogin}
                        title='Login'
                        okText='Login'
                        onCancel={() => {
                            loginFormRef.resetFields()
                            setShowLogin(false)
                        }}
                        onOk={handleLoginFormSubmit}
                    >
                        <Form form={loginFormRef} layout='vertical'>
                            <Form.Item
                                name='username'
                                label='Username'
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name='password'
                                label='Password'
                                rules={[{ required: true }]}
                            >
                                <Input type='password' />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        visible={showRegistration}
                        title='Sign Up'
                        okText='Sign Up'
                        onCancel={() => {
                            registerFromRef.resetFields()
                            setShowRegistration(false)
                        }}
                        onOk={handleRegisterFormSubmit}
                    >
                        <Form form={registerFromRef} layout='vertical'>
                            <Form.Item
                                name='username'
                                label='Username'
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name='password'
                                label='Password'
                                rules={[{ required: true }]}
                            >
                                <Input type='password' />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )}
        </div>
    )
}
