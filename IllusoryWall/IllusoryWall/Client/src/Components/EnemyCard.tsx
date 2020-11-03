import {
    Card,
    Collapse,
    Descriptions,
    Divider,
    Image,
    Table,
    Typography
} from 'antd'
import React, { Component } from 'react'
import DamageCategoryDisplayNames from '../Utils/DamageCategoryDisplayNames'
import DamageTypeDisplayNames from '../Utils/DamageTypeDisplayNames'
import EnemyClassDisplayNames from '../Utils/EnemyClassDisplayNames'
import { IWDamage, IWDrop, IWEnemy, IWLocation } from '../Utils/Models'

type IProps = {
    model: IWEnemy
}
type IState = {}

export class EnemyCard extends Component<IProps, IState> {
    static displayName = EnemyCard.name

    private static _fallbackImage = '/fallback-image.png'

    constructor(props: IProps) {
        super(props)

        this.cover = this.cover.bind(this)

        this.state = {}
    }

    private cover() {
        if (!this.props.model.imagePath)
            return <Image src={EnemyCard._fallbackImage} />

        return (
            <Image
                src={this.props.model.imagePath}
                fallback={EnemyCard._fallbackImage}
            />
        )
    }

    private static class(model: IWEnemy) {
        if (model.class === null || model.class === undefined) {
            return <Typography.Text type='secondary'>Unknown</Typography.Text>
        }

        const displayText = EnemyClassDisplayNames[model.class]
        return <Typography.Text>{displayText}</Typography.Text>
    }

    private static respawns(model: IWEnemy) {
        if (model.respawns === null || model.respawns === undefined) {
            return <Typography.Text type='secondary'>Unknown</Typography.Text>
        }

        return model.respawns ? (
            <Typography.Text type='success'>Yes</Typography.Text>
        ) : (
            <Typography.Text type='danger'>No</Typography.Text>
        )
    }

    private static locationsTable(locations: IWLocation[]): JSX.Element {
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

    private static dropsTable(drops: IWDrop[]): JSX.Element {
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

    private static damagesTable(damages: IWDamage[]): JSX.Element {
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

    private static collapseHeader(title: string, array: Array<any>): string {
        return `${title} (${array.length})`
    }

    render() {
        const model = this.props.model

        return (
            <Card title={model.name} cover={this.cover()}>
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
                        {EnemyCard.class(model)}
                    </Descriptions.Item>
                    <Descriptions.Item label='Respawns'>
                        {EnemyCard.respawns(model)}
                    </Descriptions.Item>
                </Descriptions>
                <Collapse bordered={false}>
                    <Collapse.Panel
                        header={EnemyCard.collapseHeader(
                            'Locations',
                            model.locations ?? []
                        )}
                        key={1}
                    >
                        {EnemyCard.locationsTable(model.locations ?? [])}
                    </Collapse.Panel>
                    <Collapse.Panel
                        header={EnemyCard.collapseHeader(
                            'Drops',
                            model.drops ?? []
                        )}
                        key={2}
                    >
                        {EnemyCard.dropsTable(model.drops ?? [])}
                    </Collapse.Panel>
                    <Collapse.Panel
                        header={EnemyCard.collapseHeader(
                            'Damage',
                            model.damages ?? []
                        )}
                        key={3}
                    >
                        {EnemyCard.damagesTable(model.damages ?? [])}
                    </Collapse.Panel>
                </Collapse>
            </Card>
        )
    }
}
