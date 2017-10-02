import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class CommonContainer implements OnDestroy
{
    protected disposableSubs: Array<Subscription> = [];

    public ngOnDestroy()
    {
        this.disposableSubs.forEach(s => s.unsubscribe());
    }
}
