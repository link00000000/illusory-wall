import { DamageCategory } from './Types'

const DamageCategoryDisplayNames: { [key in DamageCategory]: string } = {
    w: 'Weakness',
    r: 'Resistance',
    i: 'Immunity'
}

export default DamageCategoryDisplayNames
