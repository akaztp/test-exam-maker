import { AsyncDataSer } from '../../../utils/asyncData';
import { Question } from '../../models/question';

export interface State
{
    current: number; // starting at one
    data: AsyncDataSer<Question[]>;  // Questions must be ordered by question.num increasingly
}

export const initialState: State = {
    current: 1,
    data: null,
};
