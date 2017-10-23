import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { CommonContainer } from '../../utils/common-container';
import { State, MODULE_STORE_TOKEN } from '../../logic/state/state';

@Component({
    selector: 'exm-wrapper',
    templateUrl: './wrapper.container.html',
    styleUrls: ['./wrapper.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapperContainer extends CommonContainer
{
    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<State>,
        protected changeDetectorRef: ChangeDetectorRef,
    )
    {
        super(store$, changeDetectorRef);
    }
}
