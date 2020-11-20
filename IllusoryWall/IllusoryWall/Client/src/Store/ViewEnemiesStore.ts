import { Store } from 'pullstate'
import { IWEnemy } from '../Utils/Models'

export interface IEnemyState {
    [id: number]: IWEnemy | null
}

export interface IViewEnemiesStore {
    enemies: IEnemyState
}

export const ViewEnemiesStore = new Store<IViewEnemiesStore>({
    enemies: {}
})
