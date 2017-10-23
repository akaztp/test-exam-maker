import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { QuestionContainer } from './containers/question/question.container';
import { ResultContainer } from './containers/result/result.container';

import { LogicModule as ExamLogicModule } from './logic/logic.module';
import { ExamTimerService } from './data/exam-timer.service';
import { ExamRoutingModule } from './exam-routing.module';
import { WrapperContainer } from './containers/wrapper/wrapper.container';
import { StartContainer } from './containers/start/start.container';
import { ExamFetchService } from './data/exam-fetch.service';
import { QuestionsFetchService } from './data/questions-fetch.service';
import { ExamEvalService } from './data/exam-eval.service';
import { Sec2TimePipe } from './pipes/sec2time.pipe';
import { featureName } from './module-config';

@NgModule({
    id: featureName,
    imports: [
        CommonModule,
        NgbModule,
        ExamRoutingModule,
        ExamLogicModule,
    ],
    declarations: [
        WrapperContainer,
        StartContainer,
        QuestionContainer,
        ResultContainer,
        Sec2TimePipe,
    ],
    exports: [
    ],
    providers: [
        ExamTimerService,
        ExamFetchService,
        ExamEvalService,
        QuestionsFetchService,
    ],
})
export class ExamModule {}
