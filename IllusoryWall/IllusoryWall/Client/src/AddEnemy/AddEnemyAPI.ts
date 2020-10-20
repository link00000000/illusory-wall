import axios from 'axios'
import { IWEnemy } from '../Common/Models'

const ENDPOINT = '/enemy/add'

export async function commit(model: IWEnemy): Promise<Error | null> {
    try {
        const response = await axios({
            method: 'POST',
            url: ENDPOINT,
            data: model
        })

        if (response.status !== 200) {
            return Error(response.statusText)
        }

        return null
    } catch (error) {
        console.error(error)
        return error
    }
}
