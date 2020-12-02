import axios from 'axios'
import { IWEnemy } from '../Utils/Models'
import Nullify from '../Utils/Nullify'

const ENDPOINT = '/enemy/add'

/**
 * Add new enemy to database
 * @param model New enemy model to add to database
 */
export async function commit(
    model: IWEnemy,
    token?: string,
    baseURL?: string
): Promise<Error | null> {
    try {
        const response = await axios({
            method: 'POST',
            url: ENDPOINT,
            data: Nullify(model),
            headers: {
                Authorization: 'Bearer ' + token
            },
            validateStatus: () => true,
            baseURL
        })

        if (response.status === 401) {
            return Error('Not authorized')
        }

        if (response.status !== 200) {
            return Error(response.statusText)
        }

        return null
    } catch (error) {
        return error
    }
}
