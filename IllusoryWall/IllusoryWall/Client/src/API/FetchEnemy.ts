import axios from 'axios'
import { IWEnemy } from './../Utils/Models'

const ENDPOINT = '/enemy'

/**
 * Fetch enemy from the database
 * @param id ID of the enemy to fetch
 */
export async function fetch(id: number): Promise<IWEnemy> {
    try {
        const response = await axios({
            method: 'GET',
            url: ENDPOINT + '/' + id.toString()
        })

        if (response.status !== 200) {
            throw Error(response.statusText)
        }

        return response.data as IWEnemy
    } catch (error) {
        console.error(error)
        throw error
    }
}
