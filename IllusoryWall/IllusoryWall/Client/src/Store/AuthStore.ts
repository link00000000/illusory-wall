import { AuthorizationLevel } from './../Utils/AuthModels'
import { Store } from 'pullstate'
import jwt_decode from 'jwt-decode'

export interface IAuthStore {
    authenticated: boolean
    username?: string
    jwt?: string
    level?: AuthorizationLevel
}

const localStorageKey = 'IWAuth'

export const AuthStore = new Store<IAuthStore>(fromLocalStorage())

/**
 * When authenticated value in store changes, update
 * serialized AuthStore in localStorage
 */
AuthStore.createReaction((s) => s, toLocalStorage)

/**
 * When the token changes, update all other values in the store and write to
 * localStorage
 */
AuthStore.createReaction(
    (s) => s.jwt,
    (jwt, draft) => {
        if (!jwt) {
            draft.username = ''
            draft.authenticated = false
            return
        }

        try {
            const { username, level } = parseClaims(jwt)
            draft.authenticated = true
            draft.username = username
            draft.level = level

            toLocalStorage({ authenticated: true, username, level, jwt })
        } catch (error) {
            console.error(error)
        }
    }
)

/**
 * Parse claims out of token
 * @param jwt Web Token
 */
function parseClaims(jwt: string) {
    const claims = jwt_decode(jwt) as {
        'Username': string | undefined
        'Account Type': string | undefined
    }

    if (!claims['Username'] || !claims['Account Type'])
        throw Error('Invalid Token')

    const level = parseAccountTypeClaim(claims['Account Type'])
    if (level === AuthorizationLevel.None) throw Error('Invalid Token')

    return {
        username: claims['Username'],
        level
    }
}

/**
 * Cast AccountType claim to AuthorizationLevel
 * @param claim AccountType claim
 */
function parseAccountTypeClaim(claim: string) {
    if (claim === 'admin') return AuthorizationLevel.Admin
    if (claim === 'general') return AuthorizationLevel.User
    return AuthorizationLevel.None
}

function toLocalStorage(store: IAuthStore) {
    if (store.authenticated) {
        window.localStorage.setItem(localStorageKey, JSON.stringify(store))
    } else {
        window.localStorage.removeItem(localStorageKey)
    }
}

function fromLocalStorage(): IAuthStore {
    if (!window.localStorage) {
        console.warn(
            'Browser does not support localStorage, login will not persist between page refresh!'
        )
        return {
            authenticated: false
        }
    }

    const serialAuthStore = window.localStorage.getItem(localStorageKey)
    if (!serialAuthStore) {
        console.log('No cached AuthStore found')
        return {
            authenticated: false
        }
    }

    let parsedAuthStore: { [key: string]: any | undefined }
    try {
        parsedAuthStore = JSON.parse(serialAuthStore)
    } catch (error) {
        console.error('Unable to parse stored AuthStore: ' + error.message)
        window.localStorage.removeItem(localStorageKey)
        return {
            authenticated: false
        }
    }

    const { authenticated, username, jwt, level } = parsedAuthStore
    if (!authenticated || !username || !jwt || !level) {
        console.error('Invalid AuthStore')
        window.localStorage.removeItem(localStorageKey)
        return {
            authenticated: false
        }
    }

    return {
        authenticated,
        username,
        jwt,
        level
    }
}
