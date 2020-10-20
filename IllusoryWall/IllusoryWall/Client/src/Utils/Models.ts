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
    hp: number
    souls: number
    name: string
}

export type IWDrop = {
    rate: number
    location: string
}

export type IWDamage = {
    type: string
    category: string
}
