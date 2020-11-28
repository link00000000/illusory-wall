import { Card, notification } from 'antd'
import React, { FunctionComponent } from 'react'
import { IWHitList, IWHitListEntry } from '../Utils/Models'
import { HitListEntry } from './HitListEntry'
import * as HitListAPI from '../API/HitLists'
import { AuthStore } from '../Store/AuthStore'

interface IProps {
    list: IWHitList
    onChange?: (list: IWHitList) => void
}

export const HitList: FunctionComponent<IProps> = (props: IProps) => {
    const [list, setList] = React.useState<IWHitList>(props.list)
    const token = AuthStore.useState((s) => s.jwt)

    const handleChange = async (index: number, value: IWHitListEntry) => {
        try {
            if (token)
                await HitListAPI.setStatus(
                    list.id,
                    value.id,
                    value.completed,
                    token
                )
        } catch (error) {
            notification.error({
                message: 'Error updating status',
                description: error.message
            })
        }

        const entries = list.entries.slice()
        entries[index] = value
        setList((prevState) => ({ ...prevState, ...{ entries } }))
    }

    React.useEffect(() => {
        props.onChange && props.onChange(list)
    }, [list])

    React.useEffect(() => {
        setList(props.list)
    }, [props.list])

    return (
        <Card>
            {list.entries.map((entry, index) => (
                <HitListEntry
                    key={index}
                    entry={entry}
                    onChange={(newEntry) => {
                        console.log('HitList: ' + newEntry.completed)
                        handleChange(index, newEntry)
                    }}
                />
            ))}
        </Card>
    )
}
