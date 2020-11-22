import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { HitList } from '../Components/HitList'
import { AuthStore } from '../Store/AuthStore'
import { IWHitList } from '../Utils/Models'

interface IProps {}

export const HitLists: FunctionComponent<IProps> = (props: IProps) => {
    const [authenticated] = AuthStore.useState((s) => [s.authenticated])

    const [hitlists, setHitlists] = React.useState<IWHitList[]>([])

    React.useEffect(() => {
        // @TODO fetch hitlists on page load
    }, [])

    const handleChange = (list: IWHitList) => {
        const newHitlists = hitlists ? hitlists.slice() : []
        let index = newHitlists.findIndex((l) => l.id === list.id)

        console.log(newHitlists)

        if (index === -1) return

        newHitlists[index] = list
        setHitlists(newHitlists)
    }

    if (!authenticated) return <Redirect to='/' />

    return (
        <div>
            {hitlists.map((list, index) => (
                <HitList key={index} list={list} onChange={handleChange} />
            ))}
        </div>
    )
}
