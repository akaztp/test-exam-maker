export interface Answer
{
    num: number;
    text: string;
    checked: boolean;
}

export interface Question
{
    num: number;
    title: string;
    description: string;
    multichoice: boolean;
    answers: Array<Answer>; // Answers must be ordered by answer.num increasingly
}
