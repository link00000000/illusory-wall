import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { FunctionComponent } from 'react'
import { fetch } from '../API/FetchEnemy'
import { search } from '../API/SearchEnemies'
import { ViewEnemiesStore } from '../Store/ViewEnemiesStore'
import { EnemyEntry } from '../Utils/Models'
import styles from './EnemySearch.module.css'

type IProps = {
    disabled?: boolean
}

export const EnemySearch: FunctionComponent<IProps> = (props: IProps) => {
    EnemySearch.displayName = EnemySearch.name

    const [name, setName] = React.useState<string>('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.currentTarget.value)
    }

    const handleSubmit = async (_event: any): Promise<void> => {
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
    }

    return (
        <div className={styles['search']}>
            <Input
                disabled={props.disabled}
                placeholder='Type to search for enemy by name'
                allowClear
                onChange={handleChange}
                value={name}
                className={styles['search-bar']}
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
