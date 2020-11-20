import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import React, { FunctionComponent } from 'react'
import * as AddEnemyAPI from '../API/AddEnemy'
import { EnemyForm } from '../Components/EnemyForm'
import { WebScraperModal } from '../Components/WebScraperModal'
import { IWEnemy } from '../Utils/Models'
import { AuthStore } from '../Store/AuthStore'
import { Redirect } from 'react-router-dom'
import { AuthorizationLevel } from '../Utils/AuthModels'

type IProps = {}

const messageDuration = 2

export const AddEnemy: FunctionComponent<IProps> = (props: IProps) => {
    AddEnemy.displayName = AddEnemy.name

    const [loading, setLoading] = React.useState<boolean>(false)
    const [model, setModel] = React.useState<IWEnemy>({
        name: '',
        locations: [],
        drops: [],
        damages: []
    })
    const [authenticated, level] = AuthStore.useState((s) => [
        s.authenticated,
        s.level
    ])
    const token = AuthStore.useState((s) => s.jwt)

    const showError = (error?: Error): void => {
        setLoading(false)

        const notificationArgs: ArgsProps = {
            message: 'Failed to create new enemy',
            duration: messageDuration
        }

        if (error) {
            error.name = ''
            notificationArgs['description'] = error.toString()
        }

        notification.error(notificationArgs)
    }

    const handleSubmit = async (model: Partial<IWEnemy>): Promise<void> => {
        setLoading(true)

        if (model.name === undefined) {
            return
        }

        const error = await AddEnemyAPI.commit(model as IWEnemy, token)
        if (error) {
            showError(error)
            return
        }

        showSuccess()
    }

    const showSuccess = (): void => {
        setLoading(false)

        const notificationArgs: ArgsProps = {
            message: 'Created new enemy successfully',
            duration: messageDuration
        }

        notification.success(notificationArgs)
    }

    if (!(authenticated && level === AuthorizationLevel.Admin)) {
        return <Redirect to='/' />
    }

    return (
        <>
            <div
                style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <WebScraperModal onSubmit={(model) => setModel(model)} />
            </div>
            <EnemyForm
                model={model}
                onChange={(model: IWEnemy) => {
                    setModel(model)
                }}
                onSubmit={handleSubmit}
                loading={loading}
            />
        </>
    )
}
