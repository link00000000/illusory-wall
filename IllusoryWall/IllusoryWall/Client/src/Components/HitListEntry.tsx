import { Checkbox } from 'antd'
import React, { FunctionComponent } from 'react'
import { IWHitListEntry } from '../Utils/Models'

interface IProps {
    entry: IWHitListEntry
    onChange?: (enemy: IWHitListEntry) => void
}

export const HitListEntry: FunctionComponent<IProps> = (props: IProps) => {
    const [entry, setEntry] = React.useState<IWHitListEntry>(props.entry)

    const handleCheckbox = (value: boolean) => {
        setEntry((prevState) => ({ ...prevState, completed: value }))
    }

    React.useEffect(() => {
        props.onChange && props.onChange(entry)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entry])

    return (
        <div>
            <Checkbox
                checked={entry.completed}
                onChange={({ target: { checked } }) => {
                    handleCheckbox(checked)
                }}
            />
            {props.entry.imagePath && (
                <img src={entry.imagePath} alt={'Image of ' + entry.name} />
            )}
            <h1>{props.entry.name}</h1>
        </div>
    )
}
