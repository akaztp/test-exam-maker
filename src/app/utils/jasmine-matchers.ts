import { deepEqual } from './deep-equal';

export const deepEqualMatcher: jasmine.CustomMatcherFactories = {
	toDeepEqual: function (util, customEqualityTesters)
	{
		return {
			compare: function (actual, expected)
			{
				return { pass: deepEqual(actual, expected) };
			}
		}
	}
}
