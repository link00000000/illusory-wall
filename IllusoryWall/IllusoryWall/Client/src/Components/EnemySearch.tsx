import {
    AlignCenterOutlined,
    CloseOutlined,
    PlusOutlined
} from '@ant-design/icons'
import {
    AutoComplete,
    Button,
    Form,
    notification,
    Radio,
    Select,
    Slider
} from 'antd'
import React, { FunctionComponent } from 'react'
import { fetch } from '../API/FetchEnemy'
import { fetch as fetchAll } from '../API/FetchEntries'
import { search } from '../API/SearchEnemies'
import { ViewEnemiesStore } from '../Store/ViewEnemiesStore'
import EnemyClassDisplayNames from '../Utils/EnemyClassDisplayNames'
import { EnemyEntry } from '../Utils/Models'
import { EnemyClass } from '../Utils/Types'
import styles from './EnemySearch.module.css'

interface AutoCompleteOption {
    label: string
    value: string
}

type IProps = {
    disabled?: boolean
}

const maxSoulsSlider = 50000
const maxHPSlider = 5000

export const EnemySearch: FunctionComponent<IProps> = (props: IProps) => {
    EnemySearch.displayName = EnemySearch.name

    const [name, setName] = React.useState<string>('')
    const [options, setOptions] = React.useState<AutoCompleteOption[]>([])
    const [collpased, setCollapsed] = React.useState<boolean>(false)
    const [respawns, setRespawns] = React.useState<number>(-1)

    const handleChange = (value: string): void => {
        setName(value)
    }

    const handleSubmit = async (_event: any): Promise<void> => {
        console.log('submit')
        let enemyEntries: EnemyEntry[] = []
        try {
            enemyEntries = await search(name)
        } catch (error) {
            console.error(error)
        }

        if (enemyEntries.length === 0) {
            notification.warning({
                message: 'No enemies found with matching criteria',
                duration: 3
            })

            return
        }

        let numChanges = 0
        enemyEntries.forEach((entry) => {
            ViewEnemiesStore.update((s) => {
                const keys = Object.keys(s.enemies)

                if (keys.includes(entry.id.toString())) return
                ++numChanges
                s.enemies[entry.id] = null
            })
        })

        for await (const { id } of enemyEntries) {
            try {
                const enemy = await fetch(id)
                ViewEnemiesStore.update((s) => {
                    s.enemies[id] = enemy
                })
            } catch (error) {
                console.error(error)
            }
        }

        notification.info({
            message: `${numChanges} enemies found and added to view`,
            duration: 3
        })

        clear()
    }

    const clear = () => {
        setName('')
    }

    const toggleCollapse = () => {
        setCollapsed(!collpased)
    }

    React.useEffect(() => {
        fetchAll().then((entries) => {
            setOptions(
                entries.map((entry) => ({
                    label: entry.name,
                    value: entry.name
                }))
            )
        })
    }, [])

    return (
        <div className={styles['search']}>
            {/* Start Search Bar */}
            <AutoComplete
                autoFocus
                disabled={props.disabled}
                placeholder='Type to search for an enemy by name'
                allowClear
                onChange={handleChange}
                value={name}
                className={styles['search-bar']}
                filterOption={(inputValue, option) =>
                    option?.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                }
                options={options}
            />
            <Button
                type='primary'
                className={styles['submit']}
                icon={<PlusOutlined />}
                onClick={handleSubmit}
            >
                Add
            </Button>
            <Button
                type='text'
                className={styles['advanced-button']}
                icon={<AlignCenterOutlined />}
                onClick={toggleCollapse}
            >
                Advanced
            </Button>

            {/* Start advanced */}
            <div
                className={styles['advanced']}
                style={{ display: collpased ? 'block' : 'none' }}
            >
                <div className={styles['advanced-upper']}>
                    {/* Start first row of advanced */}
                    <label>
                        <p>Class:</p>
                        <Select allowClear style={{ width: '100%' }}>
                            {Object.values(EnemyClass).map(
                                (className, index) => (
                                    <Select.Option
                                        value={className}
                                        key={index}
                                    >
                                        {EnemyClassDisplayNames[className]}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </label>
                    <label>
                        <p>Respawns:</p>
                        <Radio.Group
                            options={[
                                { label: 'Respawns', value: 0 },
                                { label: "Doesn't Respawn", value: 1 },
                                { label: 'Undefined', value: 2 }
                            ]}
                            optionType='button'
                            size='small'
                            value={respawns}
                            onChange={(e) => setRespawns(e.target.value)}
                        />
                        <Button
                            type='dashed'
                            size='small'
                            shape='circle'
                            style={{
                                marginLeft: '8px',
                                display:
                                    respawns === -1 ? 'none' : 'inline-block'
                            }}
                            onClick={() => setRespawns(-1)}
                        >
                            <CloseOutlined />
                        </Button>
                    </label>

                    {/* Start second row of advanced */}
                    <label>
                        <p>Souls:</p>
                        <Slider
                            range
                            marks={{ 0: '0', [maxSoulsSlider]: 'Infinite' }}
                            max={maxSoulsSlider}
                            defaultValue={[0, maxSoulsSlider]}
                            tipFormatter={(value) =>
                                value === maxSoulsSlider ? 'Infinite' : value
                            }
                        ></Slider>
                    </label>
                    <label>
                        <p>HP:</p>
                        <Slider
                            range
                            marks={{ 0: '0', [maxHPSlider]: 'Infinite' }}
                            max={maxHPSlider}
                            defaultValue={[0, maxHPSlider]}
                            tipFormatter={(value) =>
                                value === maxHPSlider ? 'Infinite' : value
                            }
                        ></Slider>
                    </label>
                </div>
            </div>
        </div>
    )
}
