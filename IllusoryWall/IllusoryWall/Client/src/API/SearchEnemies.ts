import axios from 'axios'
import { EnemyEntry } from '../Utils/Models'

const ENDPOINT = '/enemy/search'

/**
 * Search for enemy in database
 * @param name Enemy name
 */
export async function search(name: string): Promise<EnemyEntry[]> {
    try {
        const response = await axios({
            method: 'GET',
            url: ENDPOINT,
            params: { name }
        })

        if (response.status !== 200) {
            throw Error(response.statusText)
        }

        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
