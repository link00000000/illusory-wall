import { Store } from 'pullstate'

export interface IAuthStore {
    authenticated: boolean
    username?: string
    jwt?: string
}

const localStorageKey = 'IWAuth'

export const AuthStore = (() => {
    if (!window.localStorage) {
        console.warn(
            'Browser does not support localStorage, login will not persist between page refresh!'
        )
        return new Store<IAuthStore>({
            authenticated: false
        })
    }

    const serialAuthStore = window.localStorage.getItem(localStorageKey)
    if (!serialAuthStore) {
        console.log('No cached AuthStore found')
        return new Store<IAuthStore>({
            authenticated: false
        })
    }

    let parsedAuthStore: { [key: string]: any | undefined }
    try {
        parsedAuthStore = JSON.parse(serialAuthStore)
    } catch (error) {
        console.error('Unable to parse stored AuthStore: ' + error.message)
        return new Store<IAuthStore>({
            authenticated: false
        })
    }

    const { authenticated, username, jwt } = parsedAuthStore
    if (!authenticated || !username || !jwt) {
        console.error('Invalid AuthStore')
        return new Store<IAuthStore>({
            authenticated: false
        })
    }

    return new Store<IAuthStore>({
        authenticated,
        username,
        jwt
    })
})()

AuthStore.createReaction(
    (s) => s.authenticated,
    (authenticated, _, original) => {
        if (authenticated) {
            window.localStorage.setItem(
                localStorageKey,
                JSON.stringify(original)
            )
        } else {
            window.localStorage.removeItem(localStorageKey)
        }
    }
)
