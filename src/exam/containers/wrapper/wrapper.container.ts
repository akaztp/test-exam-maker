import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { CommonContainer } from '../../utils/common-container';
import { State as ExamState, MODULE_STORE_TOKEN } from '../../logic/reducers';

@Component({
    selector: 'exm-wrapper',
    templateUrl: './wrapper.container.html',
    styleUrls: ['./wrapper.container.scss'],
})
export class WrapperContainer extends CommonContainer
{
    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<ExamState>,
        protected changeDetectorRef: ChangeDetectorRef,
    )
    {
        super(store$, changeDetectorRef);
    }
}
