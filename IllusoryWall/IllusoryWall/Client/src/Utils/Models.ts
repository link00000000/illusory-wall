/* There are mirrored from the API */

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
    hp: number
    souls: number
}

export type IWDrop = {
    rate: number
    location: string
}

export type IWDamage = {
    type: string
    category: string
}
