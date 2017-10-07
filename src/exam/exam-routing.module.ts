import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionContainer } from './containers/question/question.container';
import { ResultContainer } from './containers/result/result.container';
import { WrapperContainer } from './containers/wrapper/wrapper.container';
import { StartContainer } from './containers/start/start.container';

/**
 * Route unique IDs to be used by the serializer provided by router-store-ser
 */

export const startRouteId = '3b44a794-3df8-4cb8-94aa-1cdb63d48f10';
export const questionRouteId = '02b4240c-3647-490b-9072-e129fd948787';
export const questionParamNum = 'num';
export const resultRouteId = '6f0c35fe-95c6-4831-81dc-c7c669bd3102';
// Adding more route paths must change effects/page-start.effects.ts

export const routes: Routes = [
    {
        path: '',
        component: WrapperContainer,
        children: [
            { path: '', redirectTo: 'start' },
            {
                path: 'start',
                component: StartContainer,
                data: {
                    uid: startRouteId,
                },
            },
            {
                path: 'question/:' + questionParamNum,
                component: QuestionContainer,
                data: {
                    uid: questionRouteId,
                },
            },
            {
                path: 'result',
                component: ResultContainer,
                data: {
                    uid: resultRouteId,
                },
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ExamRoutingModule { }
