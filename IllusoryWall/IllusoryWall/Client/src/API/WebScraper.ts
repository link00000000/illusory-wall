import { IWEnemy } from './../Utils/Models'
import axios from 'axios'

const ENDPOINT = '/webscraper'

export async function fetch(url: string): Promise<IWEnemy> {
    try {
        const response = await axios({
            method: 'GET',
            url: ENDPOINT,
            params: { url },
            validateStatus: function (_status) {
                return true
            }
        })

        if (response.status === 400) {
            throw Error(response.data)
        }

        if (response.status !== 200) {
            throw Error('Error: ' + response.statusText)
        }

        return response.data as IWEnemy
    } catch (error) {
        throw error
    }
}
