import { Action } from '@ngrx/store';

import { Question } from '../../models/question';
import { AsyncDataSer } from '../../../utils/asyncData';
import * as actions from '../actions/questions.actions';
import { State, initialState } from '../state/questions.state';

export function reducer(state: State = initialState, action: Action): State
{
    switch (action.type)
    {
        case actions.QuestionsCurrentAction.type:
            return { ...state, current: (action as actions.QuestionsCurrentAction).payload.num };

        case actions.QuestionsDataAction.type:
            return { ...state, data: (action as actions.QuestionsDataAction).payload.data };

        case actions.QuestionsAnswerAction.type:
            {
                let newState: State = state;
                if (AsyncDataSer.hasData(state.data, false))
                    newState = { ...newState, data: setAnswer(newState.data, (action as actions.QuestionsAnswerAction).payload) };
                return newState;
            }
    }

    return state;
}

/**
 * Sets an answer in the questions state data, producing a new questions state data.
 * @param questions The questions state data.
 * @param __namedParameters An object with the answer data.
 */
export function setAnswer(
    questions: AsyncDataSer<Question[]>,
    { questionNum, answerNum, checked }: { questionNum: number, answerNum: number, checked: boolean },
): AsyncDataSer<Question[]>
{
    const newData: AsyncDataSer<Question[]> = {
        ...questions,
        data: [...questions.data],
    };

    if (questionNum > 0 && questionNum <= newData.data.length)
    {
        const question = Object.assign({}, newData.data[questionNum - 1]);
        newData.data[questionNum - 1] = question;
        if (answerNum >= 0 && answerNum < question.answers.length)
        {
            question.answers = [...question.answers];

            question.answers[answerNum] = Object.assign({}, question.answers[answerNum]);
            question.answers[answerNum].checked = checked;

            if (!question.multichoice && checked)
                for (let i = question.answers.length - 1; i >= 0; i--)
                {
                    const answer = question.answers[i];
                    if (answer.num !== answerNum && answer.checked)
                    {
                        question.answers[i] = Object.assign({}, answer);
                        question.answers[i].checked = false;
                    }
                }
        }
        else
            console.warn('Reducer for action ' + actions.QuestionsAnswerAction.type + '. answerNum is out of range:', answerNum);
    }
    else
        console.warn('Reducer for action ' + actions.QuestionsAnswerAction.type + '. questionNum is out of range: ', questionNum);

    return newData;
}
