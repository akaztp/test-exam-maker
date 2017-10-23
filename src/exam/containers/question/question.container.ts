import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, MODULE_STORE_TOKEN } from '../../logic/state/state';
import { CommonContainer } from '../../utils/common-container';
import { AsyncDataSer } from '../../../utils/asyncData';
import { Question } from '../../models/question';
import { NavigationGoAction } from 'router-store-ser';
import { QuestionsAnswerAction } from '../../logic/actions/questions.actions';
import { moduleNavigationCommands } from '../../module-config';

@Component({
    selector: 'exm-question',
    templateUrl: './question.container.html',
    styleUrls: ['./question.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionContainer extends CommonContainer
{
    public questionNum: number = null;
    public question: Question = null;
    public numQuestions = 0;
    public timeLeft = 0;

    public onGo(event: Event, dir: number)
    {
        this.store$.dispatch(new NavigationGoAction({
            commands: [...moduleNavigationCommands, 'question', this.questionNum + dir],
        }));
    }

    public onSubmit(event: Event)
    {
        this.store$.dispatch(new NavigationGoAction({
            commands: [...moduleNavigationCommands, 'result'],
        }));
    }

    public onChangeAnswer(event: Event, num: number)
    {
        this.store$.dispatch(new QuestionsAnswerAction({
            answerNum: num,
            checked: !this.question.answers[num].checked,
            questionNum: this.questionNum,
        }));
    }

    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<State>,
        protected changeDetectorRef: ChangeDetectorRef,
    )
    {
        super(store$, changeDetectorRef);

        store$
            .select(s => s.questions)
            .takeUntil(this.componentDestroyed$)
            .subscribe(
                    (questions) =>
                    {
                        this.questionNum = questions.current;
                        if (AsyncDataSer.hasData(questions.data) && this.questionNum && this.questionNum > 0)
                        {
                            this.numQuestions = questions.data.data.length;
                            this.question = questions.data.data[this.questionNum - 1];
                        }
                        else
                        {
                            this.question = null;
                            this.numQuestions = 0;
                        }

                        changeDetectorRef.markForCheck();
                    },
                );

        this.store$
            .select(state => state.exam)
            .takeUntil(this.componentDestroyed$)
            .subscribe({
                next:
                    (exam) =>
                    {
                        this.timeLeft = exam.timeLeft;
                        this.changeDetectorRef.markForCheck();
                    },
                error: (e) => { throw e; } });
    }
}
