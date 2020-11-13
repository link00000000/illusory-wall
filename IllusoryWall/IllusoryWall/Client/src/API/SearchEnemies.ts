import { EnemyClass } from './../Utils/Types'
import axios from 'axios'
import { EnemyEntry } from '../Utils/Models'
import * as FetchEntries from './FetchEntries'

const ENDPOINT = '/enemy/search'

/**
 * Search for enemy in database
 * @param name Enemy name
 */
export async function search(
    name: string,
    respawns?: boolean | null,
    classification?: EnemyClass,
    hp?: [number, number],
    souls?: [number, number]
): Promise<EnemyEntry[]> {
    let options: { [key: string]: any } = {
        name
    }

    options['use_respawns'] = respawns !== undefined
    if (respawns !== undefined) {
        options['respawns'] = respawns
    }

    options['use_class'] = classification !== undefined
    if (classification !== undefined) {
        options['classification'] = classification
    }

    if (hp !== undefined) {
        if (hp[1] !== Infinity) {
            options['hplt'] = hp[1]
        }
        if (!(hp[1] === Infinity && hp[0] === 0)) {
            options['hpgt'] = hp[0]
        }
    }

    if (souls !== undefined) {
        if (souls[1] !== Infinity) {
            options['soulslt'] = souls[1]
        }
        if (!(souls[1] === Infinity && souls[0] === 0)) {
            options['soulsgt'] = souls[0]
        }
    }

    try {
        const response = await axios({
            method: 'GET',
            url: ENDPOINT,
            params: options
        })

        if (response.status !== 200) {
            throw Error(response.statusText)
        }

        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
