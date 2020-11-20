import React, { FunctionComponent } from 'react'
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom'
import { IWEnemy } from '../Utils/Models'
import * as FetchEnemyAPI from '../API/FetchEnemy'
import * as ModifyEnemyAPI from '../API/ModifyEnemy'
import { Layout, notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification'
import { EnemyForm } from '../Components/EnemyForm'
import { AuthStore } from '../Store/AuthStore'
import { AuthorizationLevel } from '../Utils/AuthModels'

interface IMatchParams {
    id: string
}
interface IProps extends RouteComponentProps<IMatchParams> {}

export const ModifyEnemyId: FunctionComponent<IProps> = (props: IProps) => {
    ModifyEnemyId.displayName = ModifyEnemyId.name

    const history = useHistory()

    const [loading, setLoading] = React.useState<boolean>(false)
    const [id, setId] = React.useState<number>(-1)
    const [model, setModel] = React.useState<IWEnemy | undefined>()
    const [authenticated, level] = AuthStore.useState((s) => [
        s.authenticated,
        s.level
    ])

    const handleSubmit = async (enemy: IWEnemy): Promise<void> => {
        setLoading(true)

        const error = await ModifyEnemyAPI.commit(id, enemy)
        if (error) {
            showError(error)
            return
        }

        showSuccess()
    }

    const showError = (error?: Error) => {
        setLoading(false)

        const notificationArgs: ArgsProps = {
            message: 'Failed to modify enemy'
        }

        if (error) {
            notificationArgs['description'] = error.message
        }

        notification.error(notificationArgs)
    }

    const showSuccess = () => {
        setLoading(false)

        const notificationArgs: ArgsProps = {
            message: 'Modified enemy successfully'
        }

        notification.success(notificationArgs)
    }

    React.useEffect(() => {
        const idString = props.match.params.id

        if (!idString) {
            history.replace('/')
        }

        const id = parseInt(idString)
        if (Number.isNaN(id)) {
            history.replace('/')
        }

        FetchEnemyAPI.fetch(id)
            .then((model) => {
                setId(id)
                setModel(model)
            })
            .catch((_error) => {
                history.replace('/')
            })
    }, [])

    if (!(authenticated && level == AuthorizationLevel.Admin)) {
        return <Redirect to='/' />
    }

    if (model) {
        return (
            <>
                <Layout>
                    <Layout.Content>
                        <EnemyForm
                            buttonText='Update Enemy'
                            onSubmit={handleSubmit}
                            model={model}
                            onChange={(newModel) => setModel(newModel)}
                            loading={loading}
                        />
                    </Layout.Content>
                </Layout>
            </>
        )
    }
    return <></>
}
