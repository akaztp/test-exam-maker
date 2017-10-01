import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionContainer } from './containers/question/question.container';
import { ResultContainer } from './containers/result/result.container';
import { WrapperComponent } from './containers/wrapper/wrapper.component';

export const startRouteId = '3b44a794-3df8-4cb8-94aa-1cdb63d48f10';
export const questionRouteId = '02b4240c-3647-490b-9072-e129fd948787';
export const questionParamNum = 'num';
export const resultRouteId = '6f0c35fe-95c6-4831-81dc-c7c669bd3102';
// Adding more route paths must change effects/page-start.effects.ts

export const routes: Routes = [
    {
        path: '',
        component: WrapperComponent,
        children: [
            { path: '', redirectTo: 'start' },
            {
                path: 'start',
                component: ResultContainer,
                data: {
                    uid: startRouteId
                },
            },
            {
                path: 'question/:' + questionParamNum,
                component: QuestionContainer,
                data: {
                    uid: questionRouteId
                },
            },
            {
                path: 'result',
                component: ResultContainer,
                data: {
                    uid: resultRouteId
                },
            }
        ],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ],
})
export class ExamRoutingModule { }
