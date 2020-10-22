import { DamageType } from './Types'

const DamageTypeDisplayNames: { [key in DamageType]: string } = {
    magic: 'Magic',
    fire: 'Fire',
    lightning: 'Lightning',
    dark: 'Dark',
    physical: 'Physical',
    strike: 'Strike',
    slash: 'Slash',
    thrust: 'Thrust'
}

export default DamageTypeDisplayNames
