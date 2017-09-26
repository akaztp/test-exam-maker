export function tassign2<T, K extends keyof T>(target: T, ...source: Pick<T, K>[]): T
{
    return Object.assign({}, target, ...source);
}
