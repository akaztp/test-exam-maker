export interface Answer
{
    /**
     * Starts at zero
     */
    num: number;
    text: string;
    checked: boolean;
}

export interface Question
{
    /**
     * Starts at 1
     */
    num: number;
    title: string;
    description: string;
    multichoice: boolean;
    answers: Answer[]; // Answers must be ordered by answer.num increasingly
}
