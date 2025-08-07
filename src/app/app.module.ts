import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskRowComponent } from './task-row/task-row.component';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  
  declarations: [
    AppComponent,
    TaskRowComponent
  ],
  imports: [
    BrowserModule,
   FormsModule, 
    MatIconModule,
    HttpClientModule
  ],
  exports:[
    BrowserModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
