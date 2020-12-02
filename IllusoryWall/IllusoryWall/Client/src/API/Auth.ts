import axios from 'axios'
import { Credentials } from '../Utils/AuthModels'

/**
 * Use user credentials to get JWT used to authenticate with authorized
 * endpoints
 * @param credentials User's username and password
 * @throws
 */
export async function login(
    credentials: Credentials,
    baseURL?: string
): Promise<string> {
    const response = await axios({
        method: 'POST',
        url: '/user/login',
        data: credentials,
        validateStatus: () => true,
        baseURL
    })

    if (response.status === 400) {
        throw Error('Could not find an account with that username and password')
    }

    if (response.status === 500) {
        throw Error('An error has occurred, please try again later')
    }

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
        data: credentials,
        validateStatus: () => true
    })

    if (response.status === 401) {
        throw Error('An account with that username already exists')
    }

    if (response.status === 500) {
        throw Error('An error has occurred, please try again later')
    }

    if (response.status !== 200) {
        throw Error(response.statusText)
    }
}
