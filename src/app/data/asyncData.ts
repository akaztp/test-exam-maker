import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

export class AsyncDataSer<T>
{
    public error: boolean = false;
    public errorsData?: Array<ServerError> = null;

    public constructor(
        public data: T,
        public loading: boolean = false,
        public cursor: any = null)
    {
    }

    public static hasData(adata: AsyncDataSer<any>, orError: boolean = false): boolean
	{
		if (!adata)
			return false;

        if (orError)
            return adata.error || (!adata.loading && adata.data != null);
            
        return !adata.error && !adata.loading && adata.data != null;
    }

    /**
     * Substitute the data on an existing  AsyncDataSer by a provided one of different type.
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

    public static errored<T>(errors?: Array<any>, data: T = null): AsyncDataSer<T>
    {
        const obs: AsyncDataSer<T> = new AsyncDataSer<T>(data);
        obs.error = true;
        if (errors && Array.isArray(errors))
            obs.errorsData = errors.filter((error) => (error.name && error.name === 'ServerError'));
        return obs;
    }

    public static loading<T>(): AsyncDataSer<T>
    {
        const obs: AsyncDataSer<T> = new AsyncDataSer<T>(null);
        obs.loading = true;
        return obs;
    }

    public static filterForData<T>(input: Observable<AsyncDataSer<T>>, orError: boolean): Observable<AsyncDataSer<T>>
    {
        return input.filter(adata => adata && AsyncDataSer.hasData(adata, orError));
    }
}

export class ServerError
{
    public name: string;
    public message: string;
    public data: { code: ServerErrorCode };
    public time_thrown: string;

    constructor(init: any)
    {
        this.name = init.name || 'ServerError';
        this.message = init.message || '';
        this.data = Object.assign<{ code: ServerErrorCode }, any>({ code: ServerErrorCode.UNKNOWN }, init.data);
        this.time_thrown = init.time_thrown || new Date().toISOString();
    }

    public static isCode(e: ServerError, code: ServerErrorCode): boolean
    {
        return e.name && e.name === 'ServerError' && (e as ServerError).data.code === code;
    }

    public static hasCode(errors: Array<ServerError>, code: ServerErrorCode): ServerError
    {
        return errors ? errors.find(e => ServerError.isCode(e, code)) : null;
    }
}

export enum ServerErrorCode
{
    UNKNOWN = 0,
};

