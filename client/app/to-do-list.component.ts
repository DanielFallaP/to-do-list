declare function showModal():void;
declare function showToast(message:string, delay:number):void;
declare function setInlineEditor():void;
declare function setListAnimation(el: string, left: boolean):void;
declare function setFadeInAnimation(el: string):void;
declare function readjustPanels(): void;
declare function getTarget(x: number): string;
declare var Math: any;
declare var document: any;
declare var __moduleName: string;

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do';
import { Router } from '@angular/router';

import 'app/commons.js';

// Constants represents the only 2 todo states
const INCOMPLETE = 'notCompleted';
const COMPLETE = 'completed';

@Component({
  moduleId: __moduleName,
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
	incomplete: ToDo[];
	
	// Represents the complete todos
	complete: ToDo[];
	
	// Represents a blank to do to add
	blankToDo: ToDo;
	
	// Todo being dragged
	draggingToDo: ToDo;
	
	// Logged-in user
	loggedInUser: any;

	/**
	 * Loads todos, splits thems in two according to 
	 * status.
	 */
	ngOnInit(): void{
		
		this.toDoListService.getToDoList(null, null)
			.then((toDoList: ToDo[]) => {
				this.loggedInUser = this.toDoListService.loggedInUser;
				for (var i in toDoList){
					if (toDoList[i].author.username 
						=== this.loggedInUser.username){
						toDoList[i].deletable = true;
						toDoList[i].editable = true;
					}
					else{
						toDoList[i].deletable = false;
						toDoList[i].editable = false;
					}
				}
			
				this.incomplete = toDoList.filter(function (toDo){
					return toDo.status === INCOMPLETE;
				});
				
				this.complete = toDoList.filter(function (toDo){
					return toDo.status === COMPLETE;
				});		
				
				setInlineEditor();
				setListAnimation('#incompleteList', true);
				setListAnimation('#completeList', false);
				setFadeInAnimation('#addButton');
				
				showToast('Welcome back, ' + this.loggedInUser.username + '!!' , 4000);
				readjustPanels();
			});
	}
	
	/**
	 * Creates new todo, and adds it to the incomplete list.
	 */
	addToDo(): void{
				
		this.blankToDo = new ToDo();
		this.blankToDo.title = 'Enter Title';
		this.blankToDo.status = INCOMPLETE;
		this.blankToDo.description = 'Enter Description';
				
		this.toDoListService.saveToDo(this.blankToDo)
			.then((toDo: ToDo) => {
				toDo.editable = true;
				toDo.deletable = true;
				this.incomplete.push(toDo);
				
				setFadeInAnimation('#' + toDo._id + 'Card')
				
				showToast('To-Do added!!', 4000);
				setInlineEditor();
				readjustPanels();
				setTimeout(() => {
					window.scrollTo(0, document.getElementById('incompleteList').scrollHeight);
				}, 0);
			});
	}
	
	/**
	 * Gets the cursor for the todo according to the value
	 * of field 'editable'
	 */
	getCursor(toDo: ToDo): string{
		return toDo.editable? 'text': 'move';
	}
	
	/**
	 * Saves todo.
	 */
	saveToDo(toDo: ToDo): void{
		this.savePromise(toDo)
			.then((saved: ToDo) => {
				showToast('To-Do saved!!', 4000);
				readjustPanels();
			})
	}
	
	/**
	 * Returns a promise with the payload todo object
	 * prepared from input todo.
	 */
	savePromise(toDo: ToDo): Promise<ToDo>{
		var element = document.getElementById(toDo._id);
		var toSave = new ToDo();
		
		toSave.status = toDo.status;
		if (toDo._id)
			toSave.id = toDo._id;
		delete toSave.deletable;
		delete toSave.editable;
		if (toDo.editable){
			toSave.title = element.querySelector(".title").innerHTML;
			toSave.description = element.querySelector(".description").innerHTML;
		}
		
		return this.toDoListService.saveToDo(toSave);
	}
	
	/**
	 * Deletes todo, and updates both lists.
	 */
	deleteToDo(toDo: ToDo): void{
		var toDelete = new ToDo();
		toDelete.id = toDo._id;
		this.toDoListService.deleteToDo(toDelete)
			.then(() => {
				showToast('To-Do deleted (forever!!)', 4000);
				var element = document.getElementById(toDo._id + 'Card');
				element.className += " scale-out";
				setTimeout(() => {
					if (toDo.status === INCOMPLETE)
						this.incomplete = this.incomplete.filter((td) => {
							return td._id !== toDo._id;
						});
					else
						this.complete = this.complete.filter((td) => {
							return td._id !== toDo._id;
						})
					readjustPanels();
				}, 200);
			});
	}
	
	/**
	 * Prevents default.
	 */
	onDragOver(event: any): void{
		event.preventDefault();
	}

	/**
	 * Updates item being dragged.
	 */
	onDrag(toDo: ToDo): void{
		this.draggingToDo = toDo;
	}
	
	/**
	 * Checks if target list is different from source list.
	 * If this is the case, proceeds to save, and move todo
	 * to appropriate list.
	 */
	onDrop(event: any): void{
		event.preventDefault();
		
		var target = getTarget(event.screenX);
		var source = this.getSource();
		
		if (target !== source && target === 'rightBucket')
			this.moveToComplete();
		if (target !== source && target === 'leftBucket')
			this.moveToIncomplete();
	}
	
	/**
	 * Gets the source list of item being dragged.
	 */
	getSource(): string{
		var left = this.incomplete.filter((toDo: ToDo) => {
				return this.draggingToDo === toDo;
		});
		
		if (left.length != 0)
			return 'leftBucket';
		else
			return 'rightBucket';
	}	
	
	/**
	 * Saves item being dragged, and moves it to complete.
	 */
	moveToComplete(): void{
		var self = this;
		this.draggingToDo.status = COMPLETE;
		this.savePromise(this.draggingToDo)
			.then((saved: ToDo) => {
				
				showToast('To-Do completed!!', 4000);
				this.incomplete = this.incomplete.filter((td) => {
						return td._id !== this.draggingToDo._id;
					});
				
				this.draggingToDo.title = saved.title;
				this.draggingToDo.description = saved.description;
				this.complete.push(this.draggingToDo);
				readjustPanels();
				setInlineEditor();
			});
	}

	/**
	 * Saves item being dragged, and moves it to incomplete.
	 */
	moveToIncomplete(): void{
		this.draggingToDo.status = INCOMPLETE;
		this.savePromise(this.draggingToDo)
			.then((saved: ToDo) => {
				
				showToast('To-Do not completed!!', 4000);
				this.complete = this.complete.filter((td) => {
						return td._id !== this.draggingToDo._id;
					});
					
				this.draggingToDo.title = saved.title;
				this.draggingToDo.description = saved.description;
				this.incomplete.push(this.draggingToDo);
				readjustPanels();
				setInlineEditor();
			});
	}
	
	/**
	 * Signs out user from the app.
	 */
	signOut(): void{
		this.toDoListService.signOut()
			.then(() => {});
		this.router.navigate(['/']);
	}
}