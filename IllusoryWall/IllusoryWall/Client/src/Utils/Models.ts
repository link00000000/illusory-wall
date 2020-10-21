/* Mirrored from API */

export type IWEnemy = {
    name: string
    description?: string
    respawns?: boolean
    class?: string
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
    damageType:
        | 'magic'
        | 'fire'
        | 'lightning'
        | 'dark'
        | 'standard'
        | 'strike'
        | 'slash'
        | 'thrust'
    category?: 'weakness' | 'resistance' | 'immunity'
}
