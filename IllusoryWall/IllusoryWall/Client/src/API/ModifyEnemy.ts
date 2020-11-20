import axios from 'axios'
import { IWEnemy } from '../Utils/Models'
import Nullify from '../Utils/Nullify'

const ENDPOINT = '/enemy/update'

/**
 * Update enemy in database
 * @param model New enemy model to add to database
 */
export async function commit(
    id: number,
    model: IWEnemy,
    token?: string
): Promise<Error | null> {
    try {
        const response = await axios({
            method: 'PUT',
            url: ENDPOINT + '/' + id,
            data: Nullify(model),
            headers: {
                Authorization: 'Bearer ' + token
            },
            validateStatus: () => true
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
