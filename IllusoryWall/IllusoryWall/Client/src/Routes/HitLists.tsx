import React, { FunctionComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { HitList } from '../Components/HitList'
import { AuthStore } from '../Store/AuthStore'
import { IWHitList } from '../Utils/Models'
import * as HitListAPI from '../API/HitLists'
import { notification, Pagination } from 'antd'

interface IProps {}

export const HitLists: FunctionComponent<IProps> = (props: IProps) => {
    const [authenticated] = AuthStore.useState((s) => [s.authenticated])
    const token = AuthStore.useState((s) => s.jwt)

    const [hitlists, setHitlists] = React.useState<IWHitList[]>([])
    const [selection, setSelection] = React.useState<number>(1)

    React.useEffect(() => {
        if (token === undefined || token === null) {
            notification.error({
                message: 'Error fetching HitList data',
                description: 'Token is undefined'
            })
            return
        }

        HitListAPI.fetch(token)
            .then((data) => {
                console.log(data)
                setHitlists(data)
            })
            .catch((error) => {
                notification.error({
                    message: 'Error fetching HitList data',
                    description: error.message
                })
            })
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
            <Pagination
                current={selection}
                pageSize={1}
                total={hitlists.length}
                onChange={(value) => {
                    setSelection(value)
                }}
                style={{ marginBottom: '16px' }}
            />
            {hitlists.map((list, index) => (
                <div
                    key={index}
                    style={{
                        display: index + 1 === selection ? 'block' : 'none'
                    }}
                >
                    <HitList list={list} onChange={handleChange} />
                </div>
            ))}
        </div>
    )
}
