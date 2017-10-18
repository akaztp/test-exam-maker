/**
 * A naif deep equal comparison function. Non-object values are compared using double equal operator.
 * Object values use the tripple equal operator. Other values use the double equal operator.
 * @param a
 * @param b
 */
export function deepEqual(a: any, b: any): boolean
{
    const typea = typeof a;
    if (typea !== typeof b)
        return false;

    if (typea !== 'object')
        return a == b; // tslint:disable-line triple-equals

    if (a === b)
        return true;

    if (!a || !b)
        return false;

    const keysa = Object.keys(a);
    if (keysa.length !== Object.keys(b).length)
        return false;
    return keysa.findIndex(k => !deepEqual(a[k], b[k])) === -1;
}
