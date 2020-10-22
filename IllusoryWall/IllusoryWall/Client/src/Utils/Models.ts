/* Mirrored from API */
import { DamageCategory, DamageType, EnemyClass } from './Types'

export type IWEnemy = {
    name: string
    description?: string
    respawns?: boolean
    class?: EnemyClass
    imagePath?: string
    locations?: IWLocation[]
    drops?: IWDrop[]
    damages?: IWDamage[]
}

export type IWLocation = {
    name: string
    hp?: number
    souls?: number
}

export type IWDrop = {
    name: string
    rate?: number
    location?: string
}

export type IWDamage = {
    damageType: DamageType
    category?: DamageCategory
}
