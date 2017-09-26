import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LogicModule } from './logic/logic.module';
import { StartContainer } from './containers/start/start.container';

@NgModule({
    declarations: [
        AppComponent,
        StartContainer
    ],
    imports: [
        BrowserModule,
        LogicModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule
{
}
