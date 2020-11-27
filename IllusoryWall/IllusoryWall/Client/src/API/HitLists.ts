import axios from 'axios'
import { IWHitList, IWHitListEntry } from '../Utils/Models'

export const fetch = async (token: string): Promise<IWHitList[]> => {
    const response = await axios({
        url: '/hitlist',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return response.data.map(
        (list: any): IWHitList => ({
            id: list.id,
            entries: list.enemies.map(
                (enemy: any): IWHitListEntry => ({
                    id: enemy.id,
                    name: enemy.name,
                    imagePath: enemy.imagePath,
                    completed: enemy.status
                })
            )
        })
    )
}

export const setStatus = async (
    listId: number,
    enemyId: number,
    completed: boolean,
    token: string
) => {
    await axios({
        url: '/hitlist/status',
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + token
        },
        data: {
            listId,
            enemyId,
            status: completed
        }
    })
}

export const deleteList = async (listId: number, token: string) => {
    await axios({
        url: '/hitlist/' + listId,
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

export const createList = async (token: string, length?: number) => {
    await axios({
        url: '/hitlist',
        params: length ? { size: length } : null,
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
