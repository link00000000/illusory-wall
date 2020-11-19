import axios from 'axios'
import { Credentials } from '../Utils/AuthModels'

/**
 * Use user credentials to get JWT used to authenticate with authorized
 * endpoints
 * @param credentials User's username and password
 * @throws
 */
export async function login(credentials: Credentials): Promise<string> {
    const response = await axios({
        method: 'POST',
        url: '/user/login',
        data: credentials
    })

    if (response.status !== 200) {
        throw Error(response.statusText)
    }

    return response.data.token as string
}

/**
 * Register a new user with given credentials
 * @param credentials User's username and password
 * @throws
 */
export async function register(credentials: Credentials): Promise<void> {
    const response = await axios({
        method: 'POST',
        url: '/user/register',
        data: credentials
    })

    if (response.status !== 200) {
        throw Error(response.statusText)
    }
}
