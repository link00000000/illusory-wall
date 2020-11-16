import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React, { FunctionComponent } from 'react'
import DamageCategoryDisplayNames from '../Utils/DamageCategoryDisplayNames'
import DamageTypeDisplayNames from '../Utils/DamageTypeDisplayNames'
import { IWDamage } from '../Utils/Models'
import { DamageFormModal } from './DamageFormModal'

interface IDamageListProps {
    damages: IWDamage[]
    onChange?: (damages: IWDamage[]) => void
    disabled?: boolean
}

export const DamageList: FunctionComponent<IDamageListProps> = (
    props: IDamageListProps
) => {
    const [damages, setDamages] = React.useState<IWDamage[]>(props.damages)
    const [showModal, setShowModal] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (props.damages != damages) {
            setDamages(props.damages)
        }
    }, [props.damages])

    React.useEffect(() => {
        if (props.onChange) {
            props.onChange(damages)
        }
    }, [damages])

    return (
        <>
            {damages.length > 0 && (
                <Table
                    columns={[
                        { title: 'Type', dataIndex: 'damageType' },
                        { title: 'Category', dataIndex: 'category' },
                        { dataIndex: 'action' }
                    ]}
                    dataSource={damages.map((damage, index) => ({
                        damageType: DamageTypeDisplayNames[damage.damageType],
                        category: damage.category
                            ? DamageCategoryDisplayNames[damage.category]
                            : '',
                        key: JSON.stringify(damage),
                        action: (
                            <Button
                                type='text'
                                onClick={() => {
                                    let newDamage = damages.slice()
                                    newDamage.splice(index, 1)
                                    setDamages(newDamage)
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
                block
                type='dashed'
                onClick={() => {
                    setShowModal(true)
                }}
                disabled={props.disabled}
            >
                <PlusCircleOutlined />
                Add Damage Type
            </Button>

            <DamageFormModal
                visible={showModal}
                onCancel={() => {
                    setShowModal(false)
                }}
                onSubmit={(newDamage) => {
                    setShowModal(false)
                    setDamages([...damages, newDamage])
                }}
            />
        </>
    )
}
