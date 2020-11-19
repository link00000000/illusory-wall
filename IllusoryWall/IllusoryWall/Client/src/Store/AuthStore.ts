import { Store } from 'pullstate'

export interface IAuthStore {
    authenticated: boolean
    username?: string
    jwt?: string
}

export const AuthStore = new Store<IAuthStore>({
    authenticated: false
})
