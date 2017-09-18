import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { PageQuestionStartEffects } from './page-question-start.effects';
import { QuestionContainer } from '../../containers/question/question.container';
import { ExamStatus, initialState as examInitialState } from '../reducers/exam.reducer';
import { ExamStartAction } from '../actions/exam.actions';

describe('Exam/Logic/' + PageQuestionStartEffects.name, () =>
{
    let effects: PageQuestionStartEffects;
    let actions: Observable<any>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                PageQuestionStartEffects,
                provideMockActions(() => actions),
            ]
        });

        effects = TestBed.get(PageQuestionStartEffects);
    });

    it('should emit no action', () =>
    {
        const routerAction = {
            type: ROUTER_NAVIGATION,
            payload: {
                routerState: {
                    root: {
                        firstChild: {
                            component: QuestionContainer,
                            params: { num: '1' },
                        }
                    }
                }
            }
        };

        actions = hot('a', { a: routerAction });

        const expected = cold('', {});

        expect(effects.effect$).toBeObservable(expected);
    });

    it('should emit one action', () =>
    {
        const routerAction = {
            type: ROUTER_NAVIGATION,
            payload: {
                routerState: {
                    root: {
                        firstChild: {
                            component: QuestionContainer,
                            params: { num: null },
                        }
                    }
                }
            }
        };

        actions = hot('a', { a: routerAction });

        const expected = cold('a', { a: new ExamStartAction() });

        expect(effects.effect$).toBeObservable(expected);
    });

});
