import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartContainer } from './containers/start/start.container';
import { QuestionContainer } from '../exam/containers/question/question.container';
import { ResultContainer } from '../exam/containers/result/result.container';

const appRoutes: Routes = [
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: 'start', component: StartContainer },  // there are references to this route using the component
    { path: 'question/:num', component: QuestionContainer, },  // there are references to this route using the component
    { path: 'result', component: ResultContainer, },  // there are references to this route using the component
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
