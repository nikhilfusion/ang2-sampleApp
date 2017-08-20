import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSemanticModule } from "ng-semantic";

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { MyLogComponent } from './my-log/my-log.component';
import { FilterPipe } from './pipes/unique.records.pipes';
import { DialogComponent } from './dialogComponent/dialog.component';
import { DaterangepickerModule } from 'angular-2-daterangepicker';


@NgModule({
  declarations: [
    AppComponent,
    MyLogComponent,
    DialogComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgSemanticModule,
    DaterangepickerModule,
    RouterModule.forRoot([
    	{
    		path: '',
    		component: MyLogComponent
    	}
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
