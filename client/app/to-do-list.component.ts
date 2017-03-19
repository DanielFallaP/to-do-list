declare function showModal():void;
declare function showToast(message:string, delay:number):void;
declare var self: any;
declare var Math: any;

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToDoListService } from './to-do-list.service';
import { ToDo } from './to-do';
import { Router } from '@angular/router';

import 'app/modals.js';

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
				
	ngOnInit(): void{
	}
				
}