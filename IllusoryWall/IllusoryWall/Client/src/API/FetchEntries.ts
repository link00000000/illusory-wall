import axios from 'axios'
import { EnemyEntry } from './../Utils/Models'

const ENDPOINT = '/enemy/all'

/**
 * Fetch all entries from the database
 */
export async function fetch(): Promise<EnemyEntry[]> {
    try {
        const response = await axios({
            method: 'GET',
            url: ENDPOINT
        })

        if (response.status !== 200) {
            throw Error(response.statusText)
        }

        return response.data as EnemyEntry[]
    } catch (error) {
        console.error(error)
        throw error
    }
}
