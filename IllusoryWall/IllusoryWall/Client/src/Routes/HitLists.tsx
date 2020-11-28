import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { HitList } from '../Components/HitList'
import { AuthStore } from '../Store/AuthStore'
import { IWHitList } from '../Utils/Models'
import * as HitListAPI from '../API/HitLists'
import { notification, Pagination, Button, Modal, Empty } from 'antd'
import {
    CloseOutlined,
    ExclamationCircleOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { HitListCreateModal } from '../Components/HitListCreateModal'
import { blue } from '@ant-design/colors'

interface IProps {}

export const HitLists: FunctionComponent<IProps> = (props: IProps) => {
    const [authenticated] = AuthStore.useState((s) => [s.authenticated])
    const token = AuthStore.useState((s) => s.jwt)

    const [hitlists, setHitlists] = React.useState<IWHitList[]>([])
    const [selection, setSelection] = React.useState<number>(1)
    const [showCreateModal, setShowCreateModal] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (token === undefined || token === null) {
            notification.error({
                message: 'Error fetching HitList data',
                description: 'Token is undefined'
            })
            return
        }

        HitListAPI.fetch(token)
            .then((data) => {
                setHitlists(data)
            })
            .catch((error) => {
                notification.error({
                    message: 'Error fetching HitList data',
                    description: error.message
                })
            })
    }, [])

    const handleChange = (list: IWHitList) => {
        const newHitlists = hitlists ? hitlists.slice() : []
        let index = newHitlists.findIndex((l) => l.id === list.id)

        if (index === -1) return

        newHitlists[index] = list
        setHitlists(newHitlists)
    }

    const createHitlist = async (length?: number) => {
        if (!token) return
        try {
            const newHitlist = await HitListAPI.createList(token, length)
            setHitlists([...hitlists, newHitlist])
            notification.info({ message: 'Successfully created new Hitlist' })
        } catch (error) {
            notification.error({
                message: 'Error creating Hitlist',
                description: error.message
            })
        }
    }

    const deleteConfirmationModal = () => {
        Modal.confirm({
            title: `Are you sure you want to delete this Hitlist?`,
            icon: <ExclamationCircleOutlined />,
            content: `This Hitlist will be deleted permanently. This action cannot be undone`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => {
                deleteHitlist(selection - 1)
            }
        })
    }

    const deleteHitlist = async (hitlistIndex: number) => {
        if (!token) return
        try {
            await HitListAPI.deleteList(hitlists[hitlistIndex].id, token)

            if (selection > hitlists.length - 1) {
                setSelection(hitlists.length - 1)
            }

            let newHitlists = hitlists.slice()
            newHitlists.splice(hitlistIndex, 1)
            setHitlists(newHitlists)

            notification.info({ message: 'Successfully deleted Hitlist' })
        } catch (error) {
            notification.error({
                message: 'Error deleting Hitlist',
                description: error.message
            })
        }
    }

    if (!authenticated) return <Redirect to='/' />

    return (
        <>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '16px'
                }}
            >
                <Button
                    icon={<CloseOutlined />}
                    type='default'
                    danger
                    style={{ marginRight: '8px' }}
                    onClick={deleteConfirmationModal}
                    disabled={hitlists.length === 0}
                >
                    Delete
                </Button>
                <Button
                    icon={<PlusOutlined />}
                    type='primary'
                    onClick={() => setShowCreateModal(true)}
                >
                    Create New Hitlist
                </Button>
            </div>

            {hitlists.length > 0 ? (
                <>
                    <Pagination
                        current={selection}
                        pageSize={1}
                        total={hitlists.length}
                        onChange={(value) => {
                            setSelection(value)
                        }}
                        style={{ marginBottom: '16px' }}
                    />

                    <HitList
                        list={hitlists[selection - 1]}
                        onChange={handleChange}
                    />
                </>
            ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                    description={
                        <span>
                            You have no Hitlists. Use the{' '}
                            <span style={{ color: blue.primary }}>
                                Create New Hitlist
                            </span>{' '}
                            button to create one!
                        </span>
                    }
                />
            )}

            <HitListCreateModal
                visible={showCreateModal}
                onSubmit={async (length) => {
                    await createHitlist(length)
                    setShowCreateModal(false)
                    setSelection(hitlists.length + 1)
                }}
                onCancel={() => {
                    setShowCreateModal(false)
                }}
            />
        </>
    )
}
