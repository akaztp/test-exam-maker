import { flush } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

/**
 * An helper class to assert if an Observer produces the specified values.
 * It does not care about the time between values produced by the observer.
 * It is expected to be called inside an Angular fakeAsync() method.
 * @param obs$ The observer to test.
 * @param values The array of values to expect in the observable.
 * @param doneFn The testing framework done function callback.
 * @param expectComplete If at the end of the expected values, the observer is expected to complete.
 * @param errorAfter If after the specified number of values the observer is expected to error.
 */
export function expectObservableValues<T>(
    obs$: Observable<T>,
    values: Array<T>,
    doneFn: any,
    expectComplete: boolean = true,
    errorAfter: number = -1
): void
{
    let expectedStep = 0;
    const subs: Subscription = obs$.subscribe(
        (value) =>
        {
            if (expectedStep >= values.length)
                fail('Too many values on observable: ' + JSON.stringify(value));
            else
            {
                expect(value).toEqual(values[expectedStep]);
                expectedStep++;
                if (!expectComplete && expectedStep === values.length)
                {
                    doneFn();
                    flush();
                }
            }
        },
        (error) =>
        {
            if (subs)
                subs.unsubscribe();
            if (errorAfter >= 0 && expectedStep === errorAfter)
            {
                doneFn();
                flush();
            }
            else
            {
                fail('Observable errored unexpectedly. Error: ' + error.toString());
            }
        },
        () =>
        { // because the above actions observable does complete
            subs.unsubscribe();
            if (expectedStep === values.length)
            {
                doneFn();
                flush();
            }
            else
                fail(`Observable completed unexpectedly after ${expectedStep} value emissions. `
                    + (expectedStep < values.length
                        ? 'Missing values from observable.'
                        : 'Too many values on observable.'));
        }
    );

}
