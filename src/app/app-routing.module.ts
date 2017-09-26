import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { StartContainer } from './containers/start/start.container';

export const startRouteId = '1551915f-b5c9-4b3d-91c3-6abe16d5b459';

const appRoutes: Routes = [
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    {
        path: 'start',
        component: StartContainer,
        data: {
            uid: startRouteId,
        }
    },
    {
        path: 'exam',
        loadChildren: '../exam/exam.module.ts#ExamModule',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: true, // <-- debugging purposes only
                // useHash: false,
                preloadingStrategy: PreloadAllModules,
            }
        ),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
 }
