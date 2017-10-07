import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

/**
 * This serializable class provides a placeholder for accessing asynchronously obtainable data.
 * It provides the data (possibly) and status about it, like "loading" or "error".
 * Normally it is generated on the data layer and by using it across the application every consumer
 * gets to know what's the data fetching state and can react accordingly.
 * This includes the HTML templates that can switch between different presentations of the data (or lack of).
 * Also provides a cursor property for helping paginating data.
 */
export class AsyncDataSer<T>
{
    public error = false;
    public errorsData?: Error[] = null;

    public constructor(
        public data: T,
        public loading: boolean = false,
        public cursor: any = null) {}

    /**
     * Tests an instance about its data state, assessing if
     * there is readable and non null data present in the instance.
     * If the instance has an error, it returns true only if "orError" parameter is true.
     * @param adata The instance to assess.
     * @param orError Flag to assess to true also if the instance is in an errored state.
     */
    public static hasData(adata: AsyncDataSer<any>, orError: boolean = false): boolean
    {
        if (!adata)
            return false;

        if (orError)
            return adata.error || (!adata.loading && adata.data != null);

        return !adata.error && !adata.loading && adata.data != null;
    }

    /**
     * Creates a new instance with the state of an existing AsyncDataSer, but providing a different data object.
     * This is usefull to substitute a plain object on a AsyncDataSer instance (received from server for example)
     * by an instance of a class, typically created from the plain object data.
     * Note that a new instance is created and no change is made to the existing instance.
     * @param adata
     * @param data
     */
    public static cast<R>(adata: AsyncDataSer<any>, newData: R): AsyncDataSer<R>
    {
        const newAdata: AsyncDataSer<R> = new AsyncDataSer<R>(newData, false, adata.cursor);
        newAdata.loading = adata.loading;
        newAdata.error = adata.error;
        newAdata.errorsData = adata.errorsData;
        return newAdata;
    }

    /**
     * Creates an errored instance.
     * @param errors
     * @param data
     */
    public static errored<T>(errors?: any[], data: T = null): AsyncDataSer<T>
    {
        const obs: AsyncDataSer<T> = new AsyncDataSer<T>(data);
        obs.error = true;
        if (errors && Array.isArray(errors))
            obs.errorsData = errors.filter(error => (error.name && error.name === 'ServerError'));
        return obs;
    }

    /**
     * Creates an empty instance on loading state.
     */
    public static loading<T>(): AsyncDataSer<T>
    {
        const obs: AsyncDataSer<T> = new AsyncDataSer<T>(null);
        obs.loading = true;
        return obs;
    }

    /**
     * Filters an Observable for instances of AsyncDataSer with readable non null data.
     * It's the version of [[AsyncDataSer.hasData] for observables.
     * @param input The input observable to apply the filter on.
     * @param orError See [[AsyncDataSer.hasData]] documentation.
     */
    public static filterForData<T>(input: Observable<AsyncDataSer<T>>, orError: boolean): Observable<AsyncDataSer<T>>
    {
        return input.filter(adata => adata && AsyncDataSer.hasData(adata, orError));
    }
}
