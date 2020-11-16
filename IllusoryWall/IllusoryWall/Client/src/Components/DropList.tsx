import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { FunctionComponent } from 'react'
import { IWDrop } from '../Utils/Models'
import { DropFormModal } from './DropFormModal'

interface IDropListProps {
    drops: IWDrop[]
    onChange?: (drops: IWDrop[]) => void
    disabled?: boolean
}

export const DropList: FunctionComponent<IDropListProps> = (
    props: IDropListProps
) => {
    const [drops, setDrops] = React.useState<IWDrop[]>(props.drops)
    const [showModal, setShowModal] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (props.drops != drops) {
            setDrops(props.drops)
        }
    }, [props.drops])

    React.useEffect(() => {
        if (props.onChange) {
            props.onChange(drops)
        }
    }, [drops])

    return (
        <>
            {drops.length > 0 && (
                <Table
                    columns={[
                        { title: 'Name', dataIndex: 'name' },
                        { title: 'Rate', dataIndex: 'rate' },
                        { title: 'Location', dataIndex: 'location' },
                        { dataIndex: 'action' }
                    ]}
                    dataSource={drops.map((drop, index) => ({
                        ...drop,
                        key: drop.name,
                        action: (
                            <Button
                                type='text'
                                onClick={() => {
                                    let newDrops = drops.slice()
                                    newDrops.splice(index, 1)
                                    setDrops(newDrops)
                                }}
                                disabled={props.disabled}
                            >
                                <MinusCircleOutlined />
                            </Button>
                        )
                    }))}
                    pagination={{ hideOnSinglePage: true }}
                />
            )}

            <Button
                disabled={props.disabled}
                block
                type='dashed'
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <PlusCircleOutlined />
                Add Drops
            </Button>

            <DropFormModal
                visible={showModal}
                onCancel={() => {
                    setShowModal(false)
                }}
                onSubmit={(newDrop) => {
                    setShowModal(false)
                    setDrops([...drops, newDrop])
                }}
            />
        </>
    )
}
