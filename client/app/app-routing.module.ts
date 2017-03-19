import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent }   from './to-do-list.component';
import { LoginComponent } from './login.component';

// To Do List App's routes.
const routes: Routes = [
  { path: 'toDoList',  component: ToDoListComponent},
  { path: '',  component: LoginComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

/**
 * Routing module class for the To Do List App.
 */
export class AppRoutingModule {}
