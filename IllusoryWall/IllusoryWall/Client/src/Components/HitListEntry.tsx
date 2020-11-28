import { Checkbox } from 'antd'
import React, { FunctionComponent } from 'react'
import { IWHitListEntry } from '../Utils/Models'
import styles from './HitListEntry.module.css'

interface IProps {
    entry: IWHitListEntry
    onChange?: (enemy: IWHitListEntry) => void
}

export const HitListEntry: FunctionComponent<IProps> = (props: IProps) => {
    const [entry, setEntry] = React.useState<IWHitListEntry>(props.entry)

    const handleCheckbox = (value: boolean) => {
        let newEntry = Object.assign({}, entry)
        newEntry.completed = value
        setEntry(newEntry)

        props.onChange && props.onChange(newEntry)
    }

    React.useEffect(() => {
        setEntry(props.entry)
    }, [props.entry])

    return (
        <div
            className={styles['hitlist-entry']}
            onClick={() => handleCheckbox(!entry.completed)}
        >
            <img
                src={entry.imagePath || '/fallback-image.png'}
                alt={'Image of ' + entry.name}
                className={styles['image']}
                style={
                    entry.completed
                        ? { filter: 'grayscale(1) opacity(0.7)' }
                        : {}
                }
            />
            <h1
                className={styles['name']}
                style={
                    entry.completed
                        ? { textDecoration: 'line-through', opacity: 0.7 }
                        : {}
                }
            >
                {props.entry.name}
            </h1>
            <Checkbox
                className={styles['checkbox']}
                checked={entry.completed}
            />
        </div>
    )
}
