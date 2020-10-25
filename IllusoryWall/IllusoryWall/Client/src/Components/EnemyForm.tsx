import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Radio, Select, Table } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { Store } from 'antd/lib/form/interface'
import TextArea from 'antd/lib/input/TextArea'
import React, { Component } from 'react'
import DamageCategoryDisplayNames from '../Utils/DamageCategoryDisplayNames'
import DamageTypeDisplayNames from '../Utils/DamageTypeDisplayNames'
import EnemyClassDisplayNames from '../Utils/EnemyClassDisplayNames'
import { IWDamage, IWDrop, IWEnemy, IWLocation } from '../Utils/Models'
import { EnemyClass } from '../Utils/Types'
import { DamageFormModal } from './DamageFormModal'
import { DropFormModal } from './DropFormModal'
import styles from './EnemyForm.module.css'
import { LocationFormModal } from './LocationFormModal'

type IProps = {
    onSubmit?: (model: IWEnemy) => void
    submitText?: string
    initialValues?: IWEnemy
}
type IState = {
    locations: IWLocation[]
    drops: IWDrop[]
    damages: IWDamage[]
    showLocationsModal: boolean
    showDropsModal: boolean
    showDamageModal: boolean
}

/**
 * Form used to input information for a new enemy
 */
export class EnemyForm extends Component<IProps, IState> {
    static displayName = EnemyForm.name

    private readonly _formSpan = 8
    private readonly _formOffset = 8

    private _formRef = React.createRef<FormInstance>()

    private initialValues: Partial<IWEnemy> | any = {
        respawns: -1
    }

    constructor(props: IProps) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.locationsList = this.locationsList.bind(this)
        this.addLocation = this.addLocation.bind(this)
        this.removeLocation = this.removeLocation.bind(this)

        this.dropsList = this.dropsList.bind(this)
        this.addDrop = this.addDrop.bind(this)
        this.removeDrop = this.removeDrop.bind(this)

        this.damageList = this.damageList.bind(this)
        this.addDamage = this.addDamage.bind(this)
        this.removeDamage = this.removeDamage.bind(this)

        this.state = {
            locations: [],
            drops: [],
            damages: [],
            showLocationsModal: false,
            showDropsModal: false,
            showDamageModal: false
        }

        if (this.props.initialValues) {
            this.initialValues = EnemyForm.IWEnemyToForm(
                this.props.initialValues
            )

            this.state = {
                locations: this.props.initialValues.locations ?? [],
                drops: this.props.initialValues.drops ?? [],
                damages: this.props.initialValues.damages ?? [],
                showLocationsModal: false,
                showDropsModal: false,
                showDamageModal: false
            }
        }
    }

    /**
     * Convert enemy model to Form Store
     * @param enemyModel Enemy model
     */
    private static IWEnemyToForm(enemyModel: IWEnemy): Store {
        let store: Store = enemyModel

        if (store.respawns === null) {
            store.respawns = 'null'
        }

        return store
    }

    private static FormToIWEnemy(form: Store): IWEnemy {
        let model: IWEnemy = form as IWEnemy

        if (form.respawns === 'null') {
            model.respawns = undefined
        }

        return model
    }

    /**
     * Bind form data to model and invoke callback
     * @param formData Data entered into the form
     */
    private async handleSubmit(formData: any): Promise<void> {
        // Bind data to model
        const model = EnemyForm.FormToIWEnemy(formData)
        model.locations = this.state.locations
        model.drops = this.state.drops
        model.damages = this.state.damages

        if (this.props.onSubmit) this.props.onSubmit(model)
    }

    /**
     * Generate a table containing all locations for the enemy
     */
    private locationsList(): JSX.Element {
        const addLocationButton = (
            <Button
                block
                type='dashed'
                onClick={() => {
                    this.setState({ showLocationsModal: true })
                }}
            >
                <PlusCircleOutlined />
                Add Location
            </Button>
        )

        if (this.state.locations.length === 0) return addLocationButton

        return (
            <>
                <Table
                    columns={[
                        { title: 'Name', dataIndex: 'name' },
                        { title: 'HP', dataIndex: 'hp' },
                        { title: 'Souls', dataIndex: 'souls' },
                        { dataIndex: 'action' }
                    ]}
                    dataSource={this.state.locations.map((location) => ({
                        ...location,
                        key: location.name,
                        action: (
                            <Button
                                type='text'
                                onClick={() =>
                                    this.removeLocation(location.name)
                                }
                            >
                                <MinusCircleOutlined />
                            </Button>
                        )
                    }))}
                    pagination={{ hideOnSinglePage: true }}
                />
                {addLocationButton}
            </>
        )
    }

    /**
     * Add location to enemy
     * @param model Location to add
     */
    private addLocation(model: IWLocation): void {
        this.setState({ locations: [...this.state.locations, model] })
    }

    /**
     * Remove location from enemy
     * @param locationName Location to remove
     */
    private removeLocation(locationName: string): void {
        const newLocationState = this.state.locations
        newLocationState.splice(
            this.state.locations.findIndex((x) => x.name === locationName),
            1
        )
        this.setState({ locations: newLocationState })
    }

    /**
     * Generate a table containing all drops for the enemy
     */
    private dropsList(): JSX.Element {
        const addDropsButton = (
            <Button
                block
                type='dashed'
                className={styles['add-location-button']}
                onClick={() => {
                    this.setState({ showDropsModal: true })
                }}
            >
                <PlusCircleOutlined />
                Add Drops
            </Button>
        )

        if (this.state.drops.length === 0) return addDropsButton

        return (
            <>
                <Table
                    columns={[
                        { title: 'Name', dataIndex: 'name' },
                        { title: 'Rate', dataIndex: 'rate' },
                        { title: 'Location', dataIndex: 'location' },
                        { dataIndex: 'action' }
                    ]}
                    dataSource={this.state.drops.map((drop) => ({
                        ...drop,
                        key: drop.name,
                        action: (
                            <Button
                                type='text'
                                onClick={() => this.removeDrop(drop.name)}
                            >
                                <MinusCircleOutlined />
                            </Button>
                        )
                    }))}
                    pagination={{ hideOnSinglePage: true }}
                />
                {addDropsButton}
            </>
        )
    }

    /**
     * Add drop to enemy
     * @param model Drop to add
     */
    private addDrop(model: IWDrop): void {
        this.setState({ drops: [...this.state.drops, model] })
    }

    /**
     * Remove drop from enemy
     * @param dropName Drop to remove
     */
    private removeDrop(dropName: string): void {
        const newDropState = this.state.drops
        newDropState.splice(
            this.state.drops.findIndex((x) => x.name === dropName),
            1
        )
        this.setState({ drops: newDropState })
    }

    /**
     * Generate a table containing all damage for the enemy
     */
    private damageList(): JSX.Element {
        const addDamageButton = (
            <Button
                block
                type='dashed'
                className={styles['add-location-button']}
                onClick={() => {
                    this.setState({ showDamageModal: true })
                }}
            >
                <PlusCircleOutlined />
                Add Damage Type
            </Button>
        )

        if (this.state.damages.length === 0) return addDamageButton

        return (
            <>
                <Table
                    columns={[
                        { title: 'Type', dataIndex: 'damageType' },
                        { title: 'Category', dataIndex: 'category' },
                        { dataIndex: 'action' }
                    ]}
                    dataSource={this.state.damages.map((damage) => ({
                        damageType: DamageTypeDisplayNames[damage.damageType],
                        category: damage.category
                            ? DamageCategoryDisplayNames[damage.category]
                            : '',
                        key: JSON.stringify(damage),
                        action: (
                            <Button
                                type='text'
                                onClick={() =>
                                    this.removeDamage(JSON.stringify(damage))
                                }
                            >
                                <MinusCircleOutlined />
                            </Button>
                        )
                    }))}
                    pagination={{ hideOnSinglePage: true }}
                />
                {addDamageButton}
            </>
        )
    }

    /**
     * Add damage to enemy
     * @param model Damage to add
     */
    private addDamage(model: IWDamage): void {
        this.setState({ damages: [...this.state.damages, model] })
    }

    /**
     * Remove damage from enemy
     * @param damage Damage to remove
     */
    private removeDamage(damage: string): void {
        const { damageType, category }: IWDamage = JSON.parse(damage)
        const newDamageState = this.state.damages
        newDamageState.splice(
            this.state.damages.findIndex(
                (x) => x.damageType === damageType && x.category === category
            ),
            1
        )
        this.setState({ damages: newDamageState })
    }

    render() {
        return (
            <Form
                onFinish={this.handleSubmit}
                layout='horizontal'
                ref={this._formRef}
                labelCol={{ span: this._formOffset }}
                wrapperCol={{ span: this._formOffset }}
                initialValues={this.initialValues}
            >
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label='Description' name='description'>
                    <TextArea />
                </Form.Item>

                <Form.Item label='Respawns' name='respawns'>
                    <Radio.Group
                        options={[
                            { label: 'Respawns', value: true },
                            { label: "Doesn't Respawn", value: false },
                            { label: 'Disabled', value: 'null' } // Sets value to undefined
                        ]}
                        optionType='button'
                        size='small'
                    />
                </Form.Item>

                <Form.Item label='Class' name='class'>
                    <Select showSearch>
                        {Object.values(EnemyClass).map((className, index) => (
                            <Select.Option value={className} key={index}>
                                {EnemyClassDisplayNames[className]}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label='Image' name='imagePath'>
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: this._formSpan,
                        offset: this._formOffset
                    }}
                >
                    {this.locationsList()}
                    <LocationFormModal
                        visible={this.state.showLocationsModal}
                        onCancel={() => {
                            this.setState({ showLocationsModal: false })
                        }}
                        onSubmit={(newLocation) => {
                            this.setState({ showLocationsModal: false })
                            this.addLocation(newLocation)
                        }}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: this._formSpan,
                        offset: this._formOffset
                    }}
                >
                    {this.dropsList()}
                    <DropFormModal
                        visible={this.state.showDropsModal}
                        onCancel={() => {
                            this.setState({ showDropsModal: false })
                        }}
                        onSubmit={(newDrop) => {
                            this.setState({ showDropsModal: false })
                            this.addDrop(newDrop)
                        }}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: this._formSpan,
                        offset: this._formOffset
                    }}
                >
                    {this.damageList()}
                    <DamageFormModal
                        visible={this.state.showDamageModal}
                        onCancel={() => {
                            this.setState({ showDamageModal: false })
                        }}
                        onSubmit={(newDamage) => {
                            this.setState({ showDamageModal: false })
                            this.addDamage(newDamage)
                        }}
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: this._formSpan,
                        offset: this._formOffset
                    }}
                >
                    <Button
                        type='primary'
                        htmlType='submit'
                        className={styles['tail-button']}
                    >
                        {this.props.submitText || 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
