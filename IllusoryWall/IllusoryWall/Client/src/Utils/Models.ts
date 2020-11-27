/* Mirrored from API */
import { DamageCategory, DamageType, EnemyClass } from './Types'

export type IWEnemy = {
    name: string
    description?: string
    respawns?: boolean | null
    class?: EnemyClass
    imagePath?: string
    locations: IWLocation[]
    drops: IWDrop[]
    damages: IWDamage[]
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
    category: DamageCategory
}

export type EnemyEntry = {
    name: string
    id: number
}

export type IWHitListEntry = {
    id: number
    name: string
    imagePath: string
    completed: boolean
}

export type IWHitList = {
    id: number
    entries: IWHitListEntry[]
}
