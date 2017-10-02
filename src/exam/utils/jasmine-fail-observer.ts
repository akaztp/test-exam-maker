import { Observable } from 'rxjs/Observable';

export function failOnObsError(err, caught): Observable<any>
{
    if (err instanceof Error)
        fail(err.message + '\n' + err.stack);
    else
        fail(err.toString());
    return Observable.empty();
}
