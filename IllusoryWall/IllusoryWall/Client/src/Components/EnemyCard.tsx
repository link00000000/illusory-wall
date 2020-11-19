import { CloseCircleTwoTone } from '@ant-design/icons'
import {
    Card,
    Collapse,
    Descriptions,
    Divider,
    Image,
    Table,
    Typography
} from 'antd'
import React, { FunctionComponent } from 'react'
import { EnemyState, ViewEnemiesStore } from '../Store/ViewEnemiesStore'
import DamageCategoryDisplayNames from '../Utils/DamageCategoryDisplayNames'
import DamageTypeDisplayNames from '../Utils/DamageTypeDisplayNames'
import EnemyClassDisplayNames from '../Utils/EnemyClassDisplayNames'
import { IWDamage, IWDrop, IWEnemy, IWLocation } from '../Utils/Models'
import styles from './EnemyCard.module.css'

type IProps = {
    model: IWEnemy
    id: number
}

const _fallbackImage = '/fallback-image.png'

function classification(model: IWEnemy): JSX.Element {
    if (model.class === null || model.class === undefined) {
        return <Typography.Text type='secondary'>Unknown</Typography.Text>
    }

    const displayText = EnemyClassDisplayNames[model.class]
    return <Typography.Text>{displayText}</Typography.Text>
}

function respawns(model: IWEnemy) {
    if (model.respawns === null || model.respawns === undefined) {
        return <Typography.Text type='secondary'>Unknown</Typography.Text>
    }

    return model.respawns ? (
        <Typography.Text type='success'>Yes</Typography.Text>
    ) : (
        <Typography.Text type='danger'>No</Typography.Text>
    )
}

function locationsTable(locations: IWLocation[]): JSX.Element {
    return (
        <Table
            columns={[
                { title: 'Name', dataIndex: 'name' },
                { title: 'HP', dataIndex: 'hp' },
                { title: 'Souls', dataIndex: 'souls' },
                { dataIndex: 'action' }
            ]}
            dataSource={locations.map((location) => ({
                ...location,
                key: location.name
            }))}
        />
    )
}

function dropsTable(drops: IWDrop[]): JSX.Element {
    return (
        <Table
            columns={[
                { title: 'Name', dataIndex: 'name' },
                { title: 'Rate', dataIndex: 'rate' },
                { title: 'Location', dataIndex: 'location' },
                { dataIndex: 'action' }
            ]}
            dataSource={drops.map((drop) => ({
                ...drop,
                key: drop.name
            }))}
        />
    )
}

function damagesTable(damages: IWDamage[]): JSX.Element {
    return (
        <>
            <Table
                columns={[
                    { title: 'Type', dataIndex: 'damageType' },
                    { title: 'Category', dataIndex: 'category' },
                    { dataIndex: 'action' }
                ]}
                dataSource={damages.map((damage) => ({
                    damageType: DamageTypeDisplayNames[damage.damageType],
                    category: damage.category
                        ? DamageCategoryDisplayNames[damage.category]
                        : '',
                    key: JSON.stringify(damage)
                }))}
            />
        </>
    )
}

function collapseHeader(title: string, array: Array<any>): string {
    return `${title} (${array.length})`
}

export const EnemyCard: FunctionComponent<IProps> = (props: IProps) => {
    EnemyCard.displayName = EnemyCard.name

    const [closeButtonHover, setCloseButtonHover] = React.useState<boolean>(
        false
    )

    const viewEnemiesStoreState = ViewEnemiesStore.useState((s) => s.enemies)
    const [viewEnemiesState, setViewEnemiesState] = React.useState<EnemyState>(
        viewEnemiesStoreState
    )

    const cover = () => {
        if (!props.model.imagePath) return <Image src={_fallbackImage} />

        return <Image src={props.model.imagePath} fallback={_fallbackImage} />
    }

    const handleClose = () => {
        setViewEnemiesState((s) => {
            delete s[props.id]
            return s
        })
        ViewEnemiesStore.update((s) => {
            delete s.enemies[props.id]
        })
    }

    const model = props.model

    return (
        <Card title={model.name} cover={cover()}>
            <CloseCircleTwoTone
                className={styles['close-button']}
                onMouseEnter={() => {
                    setCloseButtonHover(true)
                }}
                onMouseLeave={() => {
                    setCloseButtonHover(false)
                }}
                twoToneColor={closeButtonHover ? '#ff4d4f' : '#cccccc'}
                onClick={handleClose}
            />
            {model.description ? (
                <Typography.Text>{model.description}</Typography.Text>
            ) : (
                <Typography.Text type='secondary'>
                    No description
                </Typography.Text>
            )}

            <Divider>Details</Divider>

            <Descriptions>
                <Descriptions.Item label='Class'>
                    {classification(model)}
                </Descriptions.Item>
                <Descriptions.Item label='Respawns'>
                    {respawns(model)}
                </Descriptions.Item>
            </Descriptions>
            <Collapse bordered={false}>
                <Collapse.Panel
                    header={collapseHeader('Locations', model.locations ?? [])}
                    key={1}
                >
                    {locationsTable(model.locations ?? [])}
                </Collapse.Panel>
                <Collapse.Panel
                    header={collapseHeader('Drops', model.drops ?? [])}
                    key={2}
                >
                    {dropsTable(model.drops ?? [])}
                </Collapse.Panel>
                <Collapse.Panel
                    header={collapseHeader('Damage', model.damages ?? [])}
                    key={3}
                >
                    {damagesTable(model.damages ?? [])}
                </Collapse.Panel>
            </Collapse>
        </Card>
    )
}
