import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { ToDoListService } from './to-do-list.service';
import { ToDoListComponent } from './to-do-list.component';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MaterializeDirective } from 'angular2-materialize';
import { FormsModule }   from '@angular/forms';

//Imports modules, components, services and bootstrap component
@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
	FormsModule,
  ],
  declarations: [
    AppComponent,
    ToDoListComponent,
	LoginComponent,
    MaterializeDirective
  ],
  providers: [
    ToDoListService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
