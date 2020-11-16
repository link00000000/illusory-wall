import { DamageType } from './Types'

const DamageTypeDisplayNames: { [key in DamageType]: string } = {
    [DamageType.PHYSICAL]: 'Physical',
    [DamageType.MAGIC]: 'Magic',
    [DamageType.FIRE]: 'Fire',
    [DamageType.LIGHTNING]: 'Lightning',
    [DamageType.DARK]: 'Dark',
    [DamageType.BLEED]: 'Bleed',
    [DamageType.POISON]: 'Poison',
    [DamageType.FROST]: 'Frost'
}

export default DamageTypeDisplayNames
