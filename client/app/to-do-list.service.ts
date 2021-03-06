import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ToDo } from './to-do';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from './user';

/**
 * Service class handling all communication with the API.
 */
@Injectable()
export class ToDoListService{
	constructor(private http:Http,
		private router: Router){}
	
	// Logged in user session Id
	sessionId: string;
	
	// Array of loaded todos
	todos: ToDo[];
	
	// User currently in session
	loggedInUser: any;
	
	/**
	 * Gets the todos by paging if appropriate parameters are present.
	 */
	getToDoList(skip: number, limit: number) : Promise<ToDo[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('sessionId', this.sessionId);
		var paramsReq = {};
		if (skip != null && limit != null){
			params.set('skip', skip.toString());
			params.set('limit', limit.toString());
		}
		
        return this.http.get('todos', { search: params })
			.toPromise()
			.then((res: Response) => res.json().data as ToDo[])
			.catch(this.handleError);
    }
	
	/**
	 * Signs into the app.
	 */
	signIn(user: User) : Promise<any> {
		let headers = new Headers({ 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}); 
		let options = new RequestOptions({ headers: headers });
		this.loggedInUser = {};
		this.loggedInUser.username = user.username;
		return this.http.post('user/auth', user, options)
			.toPromise()
			.catch(this.handleError);
	}
	
	/**
	 * Creates/updates todo in DB.
	 */ 
	saveToDo(toDo: ToDo) : Promise<ToDo> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('sessionId', this.sessionId);
		
		let headers = new Headers({ 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		});
		
		let options = new RequestOptions({ headers: headers, search: params });

		return this.http.put('todo', toDo, options)
			.toPromise()
			.then((res: Response) => {
				var newToDo = res.json().data;
				if (!toDo.author || !toDo.author.username)
					newToDo.author = this.loggedInUser;
				return newToDo as ToDo;
			})
			.catch(this.handleError);
	}
	
	/**
	 * Deletes todo in DB.
	 */
	deleteToDo(toDo: ToDo) : Promise<ToDo> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('sessionId', this.sessionId);
		
		let headers = new Headers({ 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		});
		
		let options = new RequestOptions({ headers: headers, search: params, body: toDo });

		return this.http.delete('todo', options)
			.toPromise()
			.then((res: Response) => res.json().data as ToDo)
			.catch(this.handleError);
	}
	
	
	/**
	 * Signs out user from the app.
	 */
	signOut(): Promise<any> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('sessionId', this.sessionId);
		
		return this.http.get('user/logout', { search: params })
			.toPromise()
			.catch(this.handleError);
	}
	
	/**
	 * Handles server error.
	 */
	private handleError(error: any): Promise<any>{
		return Promise.reject(error.error || error);
	}
	
}