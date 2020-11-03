import { PlusOutlined } from '@ant-design/icons'
import { AutoComplete, Button } from 'antd'
import React, { FunctionComponent } from 'react'
import { fetch } from '../API/FetchEnemy'
import { fetch as fetchAll } from '../API/FetchEntries'
import { search } from '../API/SearchEnemies'
import { ViewEnemiesStore } from '../Store/ViewEnemiesStore'
import { EnemyEntry } from '../Utils/Models'
import styles from './EnemySearch.module.css'

interface AutoCompleteOption {
    label: string
    value: string
}

type IProps = {
    disabled?: boolean
}

export const EnemySearch: FunctionComponent<IProps> = (props: IProps) => {
    EnemySearch.displayName = EnemySearch.name

    const [name, setName] = React.useState<string>('')
    const [options, setOptions] = React.useState<AutoCompleteOption[]>([])

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

        console.log(enemyEntries)

        if (enemyEntries.length === 0) {
            // @TODO Handle no responses
            console.error(new Error('No enemies found with matching criteria'))
            return
        }

        enemyEntries.forEach((entry) => {
            ViewEnemiesStore.update((s) => {
                const keys = Object.keys(s.enemies)

                if (keys.includes(entry.id.toString())) return
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

        clear()
    }

    const clear = () => {
        setName('')
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
        </div>
    )
}
