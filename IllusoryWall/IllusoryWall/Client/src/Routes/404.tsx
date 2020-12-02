import { Button } from 'antd'
import React, { FunctionComponent } from 'react'
import { RouteComponentProps, useHistory, useLocation } from 'react-router'
import { ErrorMessage } from '../Components/ErrorMessage'

interface IProps extends RouteComponentProps {}

export const _404: FunctionComponent<IProps> = (props: IProps) => {
    const history = useHistory()

    return (
        <ErrorMessage
            message='Page Not Found'
            button={
                <Button type='primary' onClick={() => history.push('/')}>
                    Back Home
                </Button>
            }
        />
    )
}
