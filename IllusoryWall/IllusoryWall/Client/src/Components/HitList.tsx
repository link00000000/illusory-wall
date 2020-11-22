import { Card } from 'antd'
import React, { FunctionComponent } from 'react'
import { IWHitList, IWHitListEntry } from '../Utils/Models'
import { HitListEntry } from './HitListEntry'

interface IProps {
    list: IWHitList
    onChange?: (list: IWHitList) => void
}

export const HitList: FunctionComponent<IProps> = (props: IProps) => {
    const [list, setList] = React.useState<IWHitList>(props.list)

    const handleChange = (index: number, value: IWHitListEntry) => {
        const entries = list.entries.slice()
        entries[index] = value
        setList((prevState) => ({ ...prevState, ...{ entries } }))
    }

    React.useEffect(() => {
        props.onChange && props.onChange(list)
    }, [list])

    return (
        <Card>
            {list.entries.map((entry, index) => (
                <HitListEntry
                    key={index}
                    entry={entry}
                    onChange={(newEntry) => {
                        handleChange(index, newEntry)
                    }}
                />
            ))}
        </Card>
    )
}
