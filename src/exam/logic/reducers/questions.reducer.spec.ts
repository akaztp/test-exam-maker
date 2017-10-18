import { AsyncDataSer } from '../../../utils/asyncData';
import { Question } from '../../models/question';
import * as reducer from './questions.reducer';

describe('Exam/logic/reducers/questions', () =>
{
    let questionsA: AsyncDataSer<Question[]> = null;

    beforeEach(() =>
    {
        const questions: Question[] = [
            {
                num: 1,
                title: 'Test Question 1',
                description: '',
                multichoice: false,
                answers: [
                    { num: 0, text: 'Answer 1', checked: false },
                    { num: 1, text: 'Answer 2', checked: false },
                    { num: 2, text: 'Answer 3', checked: false },
                ],
            },
            {
                num: 2,
                title: 'Test Question 2',
                description: '',
                multichoice: true,
                answers: [
                    { num: 0, text: 'Answer 1', checked: false },
                    { num: 1, text: 'Answer 2', checked: false },
                    { num: 2, text: 'Answer 3', checked: false },
                ],
            },
        ];

        questionsA = new AsyncDataSer(questions, false);
    });

    it('changes multichoice answer', () =>
    {
        const answer = { questionNum: 2, answerNum: 0, checked: true };
        questionsA.data[1].answers[1].checked = true; // to check if it does not reset other answers

        const newQuestionsA: AsyncDataSer<Question[]> = reducer.setAnswer(questionsA, answer);

        expect(newQuestionsA).not.toBe(questionsA); // should have mutated
        expect(newQuestionsA.data).not.toBe(questionsA.data); // should have mutated
        expect(newQuestionsA.data[0]).toBe(questionsA.data[0]); // should not have mutated
        expect(newQuestionsA.data[1]).not.toBe(questionsA.data[1]); // should have mutated
        expect(newQuestionsA.data[1]).toEqual(jasmine.objectContaining({
            num: newQuestionsA.data[1].num,
            title: newQuestionsA.data[1].title,
            description: newQuestionsA.data[1].description,
            multichoice: newQuestionsA.data[1].multichoice,
        })); // should have mutated but mantaining the lot
        expect(newQuestionsA.data[1].answers).not.toBe(questionsA.data[1].answers); // should have mutated
        (expect(newQuestionsA.data[1].answers) as any).toEqual([
            { num: 0, text: 'Answer 1', checked: true },
            { num: 1, text: 'Answer 2', checked: true },
            { num: 2, text: 'Answer 3', checked: false },
        ]); // should have been set
    });

    it('changes single choice answer', () =>
    {
        const answer = { questionNum: 1, answerNum: 0, checked: true };
        questionsA.data[0].answers[1].checked = true; // to check if it resets other answers
        questionsA.data[0].answers[2].checked = true; // to check if it resets other answers

        const newQuestionsA: AsyncDataSer<Question[]> = reducer.setAnswer(questionsA, answer);

        expect(newQuestionsA).not.toBe(questionsA); // should have mutated
        expect(newQuestionsA.data).not.toBe(questionsA.data); // should have mutated
        expect(newQuestionsA.data[1]).toBe(questionsA.data[1]); // should not have mutated
        expect(newQuestionsA.data[0]).not.toBe(questionsA.data[0]); // should have mutated
        expect(newQuestionsA.data[0]).toEqual(jasmine.objectContaining({
            num: newQuestionsA.data[0].num,
            title: newQuestionsA.data[0].title,
            description: newQuestionsA.data[0].description,
            multichoice: newQuestionsA.data[0].multichoice,
        })); // should have mutated but mantaining the lot
        expect(newQuestionsA.data[0].answers).not.toBe(questionsA.data[0].answers); // should have mutated
        (expect(newQuestionsA.data[0].answers) as any).toEqual([
            { num: 0, text: 'Answer 1', checked: true },
            { num: 1, text: 'Answer 2', checked: false },
            { num: 2, text: 'Answer 3', checked: false },
        ]); // should have been set
    });

});
