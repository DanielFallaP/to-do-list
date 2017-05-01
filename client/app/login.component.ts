declare function showToast(message: string, delay: number): void;
declare function setFadeInAnimation(el: string):void;

import { OnInit } from '@angular/core';
import { Component, ApplicationRef } from '@angular/core';
import { ToDoListService } from './to-do-list.service';
import { User } from './user';
import { ToDo } from './to-do';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';

import 'app/commons.js'
declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'login',
  templateUrl: 'login.component.html',
})

/**
 * Component class for the log in page.
 */
export class LoginComponent implements OnInit{
  
  constructor (private toDoListService: ToDoListService,
				private http:Http,
				private router: Router,
				private ref: ApplicationRef){}
  
  //Represents the user typing on the sign in form
  user: User;
  
  /**
   * Starts component with predefined credentials.
   */
  ngOnInit(): void{
	this.user = new User();
	this.user.username = 'harry';
	this.user.password = '5f4dcc3b5aa765d61d8327deb882cf99'
	setFadeInAnimation('#loginForm');
  };
  
  /**
   * Signs into the todo list page with current user info.
   */
  signIn(user: User): void{
	this.toDoListService.signIn(user)
		.then((res: Response) => {
				this.toDoListService.sessionId = res.json().sessionId;
			if (res.json().sessionId){
				var author: any = {
				};
				this.ref.tick();
				this.router.navigate(['/toDoList']);

			}
			else{
				showToast('Wrong credentials. Please try again', 3000);
			}
		})
		.catch(this.handleError);
  };
  
  /**
   * Handles server error
   */
  private handleError(error: any): void{
	showToast('Something went wrong. Please try again later', 3000)
  }
}