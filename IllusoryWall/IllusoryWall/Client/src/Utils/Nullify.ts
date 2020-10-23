/**
 * Deep replace all undefined values with null
 * @param obj Object to nullify
 */
export default function (obj: {}) {
    return JSON.parse(
        JSON.stringify(obj, (_key, value) =>
            value === undefined ? null : value
        )
    )
}
