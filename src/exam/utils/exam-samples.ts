import { ExamInfo } from '../models/exam-info';
import { Question, Answer } from '../models/question';

export function createExam1(): { exam: ExamInfo, questions: Array<Question>, solutions: Array<Array<number>> }
{
    const solutions = [[1], [2]];

    const questions: Array<Question> = [
        createQuestion(
            1,
            'Produce white',
            'In additive color mixing, what combination produces white:',
            false,
            [
                createAnswer(0, 'red,  blue'),
                createAnswer(1, 'green, red, blue'),
                createAnswer(2, 'green, red'),
                createAnswer(3, 'green, red, cyan'),
            ]),
        createQuestion(
            2,
            'Produce black',
            'In subtractive color mixing, what combination produces black:',
            false,
            [
                createAnswer(0, 'red,  blue'),
                createAnswer(1, 'cyan, magenta, blue'),
                createAnswer(2, 'cyan, yellow, magenta'),
                createAnswer(3, 'yellow, magenta'),
            ]),
    ];

    const exam: ExamInfo = {
        name: 'Color mixing',
        description: 'An exam about color mixing, both additive and subtractive.',
        duration: 10 * 60,
        passScore: 50,
        totalScore: 100,
    };

    return { exam: exam, questions: questions, solutions: solutions };
}

export function solveQuestions(questions: Array<Question>, solutions: Array<Array<number>>)
{
    questions.forEach(
        (question, idx) =>
        {
            // clear all answers
            question.answers.forEach((answer) => { answer.checked = false; });

            if (idx < solutions.length)
            {
                solutions[idx].forEach(
                    (correctAnswerNum) =>
                    {
                        question.answers[correctAnswerNum].checked = true;
                    });
            }
        });
}

function createAnswer(num: number, text: string): Answer
{
    return { num: num, text: text, checked: false };
}

function createQuestion(num: number, title: string, description: string, multichoice: boolean, answers: Array<Answer>): Question
{
    return {
        num: num,
        title: title,
        description: description,
        multichoice: multichoice,
        answers: answers,
    };
}