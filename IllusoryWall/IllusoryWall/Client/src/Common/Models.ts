/* There are mirrored from the API */

export interface IWEnemy {
    name: string
    description?: string
    respawns?: boolean
    class?: string
    imagePath?: string
    locations?: IWLocation[]
    drops?: IWDrop[]
    damages?: IWDamage[]
}

export interface IWLocation {
    hp: number
    souls: number
    name: string
}

export interface IWDrop {
    rate: number
    location: string
}

export interface IWDamage {
    type: string
    category: string
}
