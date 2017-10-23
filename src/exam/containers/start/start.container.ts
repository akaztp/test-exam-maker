import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, MODULE_STORE_TOKEN } from '../../logic/state/state';
import { CommonContainer } from '../../utils/common-container';
import { ExamStartAction } from '../../logic/actions/exam.actions';

@Component({
    selector: 'exm-start',
    templateUrl: './start.container.html',
    styleUrls: ['./start.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartContainer extends CommonContainer
{
    public startDisabled = false;

    public onStart(event: Event)
    {
        this.startDisabled = true;
        this.store$.dispatch(new ExamStartAction());
    }

    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<State>,
        protected changeDetectorRef: ChangeDetectorRef,
    )
    {
        super(store$, changeDetectorRef);
    }
}
