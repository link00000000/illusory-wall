import { DamageCategory } from './Types'

const DamageCategoryDisplayNames: { [key in DamageCategory]: string } = {
    [DamageCategory.WEAKNESS]: 'Weakness',
    [DamageCategory.RESISTANCE]: 'Resistance',
    [DamageCategory.IMMUNITY]: 'Immunity'
}

export default DamageCategoryDisplayNames
