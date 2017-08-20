import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { MyLogComponent } from './my-log/my-log.component';
import { DialogComponent } from './dialogComponent/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MyLogComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
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
