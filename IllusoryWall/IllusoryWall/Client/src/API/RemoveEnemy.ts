import axios from 'axios'

const ENDPOINT = '/enemy/remove'

/**
 * Remove enemy from database
 * @param id Id of the enemy to remove
 */
export async function commit(id: number): Promise<Error | null> {
    try {
        const response = await axios({
            method: 'DELETE',
            url: ENDPOINT + '/' + id.toString()
        })

        if (response.status !== 200) {
            return Error(response.statusText)
        }

        return null
    } catch (error) {
        console.error(error)
        throw error
    }
}
