import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/delay';

/**
 * An helper function to assert if an Observer produces the specified values.
 * It does not care about the time between values produced by the observer.
 * Returns a promise that either completes if test passed ok, or reject with an error message if not.
 * @param obs$ The observer to test.
 * @param values The array of values to expect in the observable.
 * @param expectComplete If at the end of the expected values, the observer is expected to complete,
 *  if this parameter is true. If false, no expectation on complete is made.
 * @param errorAfter If after the specified number of values the observer is expected to error.
 * @param matcher An equality function for matching the observable values with the values array provided.
 */
export function matchObservable<T>(
    obs$: Observable<T>,
    values: Array<T>,
    expectComplete: boolean = true,
    expectError: boolean = false,
    matcher: (actual: T, expected: T) => boolean = (a, b) => a === b,
): Promise<void>
{
    return new Promise<void>(matchObs);

    function matchObs(resolve: () => void, reject: (reason: any) => void)
    {
        let expectedStep = 0;
        // the next .delay(0) makes sure that the subscription callbacks are called only after the subs local var is filled up
        const subs: Subscription = obs$.delay(0).subscribe({ next, error, complete });
        return;

        function next(value)
        {
            if (expectedStep >= values.length)
            {
                subs.unsubscribe();
                reject('Too many values on observable: ' + JSON.stringify(value));
            }
            else
            {
                if (matcher(value, values[expectedStep]) === false)
                {
                    subs.unsubscribe();
                    reject('Values are expected to match: ' + JSON.stringify(value)
                        + ' and ' + JSON.stringify(values[expectedStep]));
                }
                else
                {
                    // expect(value).toEqual(values[expectedStep]);
                    expectedStep++;
                    if (!expectComplete && expectedStep === values.length)
                    {
                        subs.unsubscribe();
                        resolve();
                    }
                }
            }
        }

        function error(error)
        {
            subs.unsubscribe();
            if (expectError && expectedStep === values.length)
                resolve();
            else
                reject('Observable errored unexpectedly. Error: ' + error.toString());
        }

        function complete()
        {
            subs.unsubscribe();
            if (expectedStep === values.length)
                resolve();
            else
                reject(`Observable completed unexpectedly after ${expectedStep} value emissions. `
                    + (expectedStep < values.length
                        ? 'Missing values from observable.'
                        : 'Too many values on observable.'));
        }
    }
}
