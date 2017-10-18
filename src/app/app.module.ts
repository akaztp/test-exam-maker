import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LogicModule } from './logic/logic.module';
import { StartComponent } from './components/start/start.component';

@NgModule({
    declarations: [
        AppComponent,
        StartComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LogicModule,
        AppRoutingModule,
        NgbModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
