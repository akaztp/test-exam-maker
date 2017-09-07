export function deepEqual(a: any, b: any): boolean
{
	return levelEqual(a, b, deepEqual);
}

function levelEqual(a: any, b: any, comparator: (a, b) => boolean): boolean
{
	const typea = typeof a;
	if (typea !== typeof b)
		return false;
	if (typea !== 'object')
		return a == b;

	if (a === b)
		return true;

	if (!a || !b)
		return false;

	const keysa = Object.keys(a);
	if (keysa.length !== Object.keys(b).length)
		return false;
	return keysa.findIndex(k => !comparator(a[k], b[k])) === -1;
}
