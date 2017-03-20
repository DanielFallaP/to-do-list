declare function showModal():void;
declare function showToast(message:string, delay:number):void;
declare function setInlineEditor():void;
declare var self: any;
declare var Math: any;
declare var document: any;

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do';
import { Router } from '@angular/router';

import 'app/commons.js';

const INCOMPLETE = 'notCompleted';
const COMPLETE = 'completed';

@Component({
  moduleId: module.id,
  selector: 'to-do-list',
  templateUrl: 'to-do-list.component.html',
  styleUrls: ['to-do-list.component.css']
})

/**
 * Component class for the to-do list page.
 */
export class ToDoListComponent implements OnInit{
  
	constructor(private toDoListService: ToDoListService,
				private router: Router){}
	
	// Represents the incomplete todos
	private incomplete: ToDo[];
	
	// Represents the complete todos
	private complete: ToDo[];
	
	// Represents a blank to do to add
	private blankToDo: ToDo;
	
	// Todo being dragged
	private draggingToDo: ToDo;
	
	
	/**
	 * Loads todos, splits thems in two according to 
	 * status.
	 */
	ngOnInit(): void{
		
		this.toDoListService.getToDoList(null, null)
			.then((toDoList: ToDo[]) => {
				this.incomplete = toDoList.filter(function (toDo){
					return toDo.status === INCOMPLETE;
				});
				
				this.complete = toDoList.filter(function (toDo){
					return toDo.status === COMPLETE;
				});		
				
				setInlineEditor();
				showToast('To-dos loaded!!', 4000);
			});
	}
	
	/**
	 * Returns display attribute value according to todo 
	 * position in the list.
	 */
	getDisplay(toDo: ToDo): string{
		return toDo.lastItem? 'none' : 'block';
	}
	
	/**
	 * Creates new todo, and adds it to the incomplete list.
	 */
	addToDo(): void{
				
		this.blankToDo = new ToDo();
		this.blankToDo.title = 'Enter Title';
		this.blankToDo.status = INCOMPLETE;
		this.blankToDo.description = 'Enter Description';
		//this.blankToDo.lastItem = true;
				
		this.toDoListService.saveToDo(this.blankToDo)
			.then((toDo: ToDo) => {
				this.incomplete.push(toDo);
				showToast('To-Do added!!', 4000);
				setInlineEditor();
			});
	}
	
	saveToDo(toDo: ToDo): void{
		this.savePromise(toDo)
			.then((saved: ToDo) => {
				toDo.author = saved.author;
				showToast('To-Do saved!!', 4000);
			})
	}
	
	savePromise(toDo: ToDo): Promise<ToDo>{
		var element = document.getElementById(toDo._id);
		var toSave = new ToDo();
		
		toSave.status = toDo.status;
		if (toDo._id)
			toSave.id = toDo._id;
		toSave.title = element.querySelector(".title").innerHTML;
		toSave.description = element.querySelector(".description").innerHTML;
		
		return this.toDoListService.saveToDo(toSave);
	}
	
	deleteToDo(toDo: ToDo): void{
		var toDelete = new ToDo();
		toDelete.id = toDo._id;
		this.toDoListService.deleteToDo(toDelete)
			.then(() => {
				showToast('To-Do deleted (forever!!)', 4000);
				if (toDo.status === INCOMPLETE)
					this.incomplete = this.incomplete.filter((td) => {
						return td._id !== toDo._id;
					});
				else
					this.complete = this.complete.filter((td) => {
						return td._id !== toDo._id;
					})
			});
	}
	
	onDragOver(event: any): void{
		event.preventDefault();
	}

	onDrag(toDo: ToDo): void{
		this.draggingToDo = toDo;
	}
	
	onDropComplete(event: any): void{
		event.preventDefault();
		
		this.draggingToDo.status = COMPLETE;
		this.savePromise(this.draggingToDo)
			.then((saved: ToDo) => {
				
				showToast('To-Do completed!!', 4000);
				this.incomplete = this.incomplete.filter((td) => {
						return td._id !== this.draggingToDo._id;
					});
					
				this.complete.push(this.draggingToDo);
			});
	}
	
	onDropIncomplete(event: any): void{
		event.preventDefault();
		
		this.draggingToDo.status = INCOMPLETE;
		this.savePromise(this.draggingToDo)
			.then((saved: ToDo) => {
				
				showToast('To-Do not completed!!', 4000);
				this.complete = this.complete.filter((td) => {
						return td._id !== this.draggingToDo._id;
					});
					
				this.incomplete.push(this.draggingToDo);
			});
	}
	
	/**
	 * Signs out from the app.
	 */
	signOut(): void{
		this.toDoListService.signOut()
			.then(() => {});
		this.router.navigate(['/']);
	}
}