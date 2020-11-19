import { Store } from 'pullstate'
import { IWEnemy } from '../Utils/Models'

export interface EnemyState {
    [id: number]: IWEnemy | null
}

export interface IViewEnemiesStore {
    enemies: EnemyState
}

export const ViewEnemiesStore = new Store<IViewEnemiesStore>({
    enemies: {}
})
