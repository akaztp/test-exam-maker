import { RouterStateSer, RouterNodeSer } from 'router-store-ser';
import { startRouterState } from '../../utils/router-state-samples';
import { questionRouteId, questionParamNum } from '../exam-routing.module';

const examState: RouterStateSer = JSON.parse(JSON.stringify(startRouterState));
examState.url += '/exam';
examState.root.children = [
    {
        configPath: 'exam',
        data: null,
        params: {},
        children: [],
    },
];
export function examRouterState(): RouterStateSer
{
    return JSON.parse(JSON.stringify(examState));
}

export function questionRouterState(num: number): RouterStateSer
{
    const state: RouterStateSer = JSON.parse(JSON.stringify(examState));
    state.url += '/question';

    const parent: RouterNodeSer = state.root.children[0]; // get to the 'exam' state level
    parent.children = [{
        configPath: 'question',
        data: {
            uid: questionRouteId,
        },
        params: {},
        children: [],
    }];

    if (num === undefined || num === null || isNaN(num))
        throw new Error('questionRouterState(num): num must be a number > 0');

    state.url += '/' + num;
    parent.children[0].params[questionParamNum] = num;

    return state;
}
