import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { FunctionComponent } from 'react'
import { IWLocation } from '../Utils/Models'
import { LocationFormModal } from './LocationFormModal'

interface ILocationListProps {
    locations: IWLocation[]
    onChange?: (locations: IWLocation[]) => void
    disabled?: boolean
}

export const LocationList: FunctionComponent<ILocationListProps> = (
    props: ILocationListProps
) => {
    const [locations, setLocations] = React.useState<IWLocation[]>(
        props.locations
    )
    const [showModal, setShowModal] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (props.locations != locations) {
            setLocations(props.locations)
        }
    }, [props.locations])

    React.useEffect(() => {
        if (props.onChange) {
            props.onChange(locations)
        }
    }, [locations])

    return (
        <>
            {locations.length > 0 && (
                <Table
                    columns={[
                        { title: 'Name', dataIndex: 'name' },
                        { title: 'HP', dataIndex: 'hp' },
                        { title: 'Souls', dataIndex: 'souls' },
                        { dataIndex: 'action' }
                    ]}
                    dataSource={locations.map((location, index) => ({
                        ...location,
                        key: location.name,
                        action: (
                            <Button
                                type='text'
                                onClick={() => {
                                    let newLocations = locations.slice()
                                    newLocations.splice(index, 1)
                                    setLocations(newLocations)
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
                style={{ marginBottom: '32px' }}
                disabled={props.disabled}
                block
                type='dashed'
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <PlusCircleOutlined />
                Add Location
            </Button>

            <LocationFormModal
                visible={showModal}
                onCancel={() => {
                    setShowModal(false)
                }}
                onSubmit={(newLocation) => {
                    setShowModal(false)
                    setLocations([...locations, newLocation])
                }}
            />
        </>
    )
}
