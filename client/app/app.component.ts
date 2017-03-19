import { Component } from '@angular/core';
import { ToDoListService } from './to-do-list.service';

@Component({
  selector: 'my-app',
  
  template: `
	<router-outlet></router-outlet>
  `,
})

/**
 * Component class for the video portal app.
 */
export class AppComponent  {
	constructor (private toDoListService: ToDoListService){}
}
