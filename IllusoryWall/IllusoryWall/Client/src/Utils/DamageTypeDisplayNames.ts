import { DamageType } from './Types'

const DamageTypeDisplayNames: { [key in DamageType]: string } = {
    [DamageType.MAGIC]: 'Magic',
    [DamageType.FIRE]: 'Fire',
    [DamageType.LIGHTNING]: 'Lightning',
    [DamageType.DARK]: 'Dark',
    [DamageType.PHYSICAL]: 'Physical',
    [DamageType.STRIKE]: 'Strike',
    [DamageType.SLASH]: 'Slash',
    [DamageType.THRUST]: 'Thrust'
}

export default DamageTypeDisplayNames
