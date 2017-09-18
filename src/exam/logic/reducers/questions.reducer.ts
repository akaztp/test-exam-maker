import { ActionReducer, Action } from '@ngrx/store';

import { Question } from '../../models/question';
import { AsyncDataSer } from '../../../utils/asyncData';
import * as actions from '../actions/questions.actions';

export interface State
{
    current: number;
    data: AsyncDataSer<Array<Question>>;  // Questions must be ordered by question.num increasingly
}

const initialState: State = {
    current: 0,
    data: null,
};

export function reducer(state: State = initialState, action: Action): State
{
    switch (action.type)
    {
        case actions.ACTION_QUESTIONS_CURRENT:
            return { ...state, current: (action as actions.QuestionsCurrentAction).payload.num };
        case actions.ACTION_QUESTIONS_DATA:
            return { ...state, data: (action as actions.QuestionsDataAction).payload.data };
        case actions.ACTION_QUESTIONS_ANSWER:
            {
                let newState: State = state;
                if (AsyncDataSer.hasData(state.data, false))
                    newState = { ...newState, data: setAnswer(newState.data, (action as actions.QuestionsAnswerAction).payload) };
                return newState;
            }
    }

    return state;
}

export function setAnswer(
    questions: AsyncDataSer<Array<Question>>,
    { questionNum, answerNum, checked }: { questionNum: number, answerNum: number, checked: boolean }
): AsyncDataSer<Array<Question>>
{
    const newData: AsyncDataSer<Array<Question>> = {
        ...questions,
        data: questions.data.slice()
    };

    if (questionNum >= 0 && questionNum < newData.data.length)
    {
        const question: Question = Object.assign({}, newData.data[questionNum]);
        newData.data[questionNum] = question;
        if (answerNum >= 0 && answerNum < question.answers.length)
        {
            question.answers = question.answers.slice();

            question.answers[answerNum] = Object.assign({}, question.answers[answerNum]);
            question.answers[answerNum].checked = checked;

            if (question.multichoice && checked)
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
            console.warn('reducer. For action ' + actions.ACTION_QUESTIONS_ANSWER + '. answerNum is out of range.');
    }
    else
        console.warn('reducer. For action ' + actions.ACTION_QUESTIONS_ANSWER + '. questionNum is out of range.');

    return newData;
}
