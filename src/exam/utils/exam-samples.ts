import { ExamInfo } from '../models/exam-info';
import { Question, Answer } from '../models/question';

export function createExam(id: string): { exam: ExamInfo, questions: Question[], solutions: number[][] }
{
    const solutions = [[1], [2], [0, 4, 5]];

    const questions: Question[] = [
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
        createQuestion(
            3,
            'Warm Colors',
            'Mark all color that are warm colors:',
            true,
            [
                createAnswer(0, 'red'),
                createAnswer(1, 'blue'),
                createAnswer(2, 'cyan'),
                createAnswer(3, 'green'),
                createAnswer(4, 'yellow'),
                createAnswer(5, 'orange'),
            ]),
    ];

    const exam: ExamInfo = {
        id,
        name: 'Color mixing',
        description: 'An exam about color mixing, both additive and subtractive.',
        duration: 1 * 60,
        passScore: 50,
        totalScore: 100,
    };

    return { exam, questions, solutions };
}

export function solveQuestions(questions: Question[], solutions: number[][])
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
    return { num, text, checked: false };
}

function createQuestion(num: number, title: string, description: string, multichoice: boolean, answers: Answer[]): Question
{
    return {
        num,
        title,
        description,
        multichoice,
        answers,
    };
}
