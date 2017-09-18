import { deepEqual } from './deep-equal';
import 'jasmine';

export const deepEqualMatcher: jasmine.CustomMatcherFactories = {
    toDeepEqual: function (util, customEqualityTesters)
    {
        return {
            compare: function (actual, expected)
            {
                return { pass: deepEqual(actual, expected) };
            }
        };
    }
};
