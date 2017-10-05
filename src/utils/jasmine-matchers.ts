import { deepEqual } from './deep-equal';
import 'jasmine';

export const deepEqualMatcher: jasmine.CustomMatcherFactories = { toDeepEqual };

function toDeepEqual(util, customEqualityTesters)
{
    return { compare };
}

function compare(actual, expected)
{
    return { pass: deepEqual(actual, expected) };
}
