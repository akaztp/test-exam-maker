import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';

export enum ExamStatus { OFF, READY, RUNNING, TIME_ENDED, ENDED }

export interface State
{
    data: AsyncDataSer<ExamInfo>;
    resultScore: AsyncDataSer<number>;
    timeLeft: number; // seconds
    status: ExamStatus;
}

export const initialState: State = {
    data: null,
    resultScore: null,
    timeLeft: 0,
    status: ExamStatus.OFF,
};
