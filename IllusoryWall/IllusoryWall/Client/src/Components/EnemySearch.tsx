import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { FunctionComponent } from 'react'
import { fetch } from '../API/FetchEnemy'
import { ViewEnemiesStore } from '../Store/ViewEnemiesStore'
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
        const id = parseInt(name)
        const enemy = await fetch(id)

        ViewEnemiesStore.update((s) => {
            s.enemies[id] = enemy
        })
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
