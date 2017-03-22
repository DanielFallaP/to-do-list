declare var outcome: string;
import { ToDoListService } from './to-do-list.service';
import { Router } from '@angular/router';
import { ToDoListComponent } from './to-do-list.component';
import {
  async,
  inject,
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';
import { User } from './user';
import { ToDo } from './to-do';

import 'app/mocks/commons-mock.js';

var toDoList: ToDo[];

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/**
  * ToDo service mockup
  */
class MockToDoListService {
  
	getToDos(skip: number, limit: number): Promise<ToDo[]>{
		toDoList = [];
		let toDo1 = new ToDo();
		
		
		let toDo2 = new ToDo();
		
		let toDo3 = new ToDo();
		
		let toDo4 = new ToDo();
		
		let toDo5 = new ToDo();
		
		
		let toDo6 = new ToDo();
		
		let toDo7 = new ToDo();
		
		
		let toDo8 = new ToDo();
		
		
		var response: ToDo[] = [];
		
		var end = skip + limit;
		for (var i = skip; i < end; i++){
			response.push(toDoList[i]);
		}
		
		return Promise.resolve(response);
	}
	
	testMethod(): void {
	}
}

/**
  * Unit tests for ToDoListComponent
  */
describe('Testing ToDo List Component', () => {
  let fixture: ComponentFixture<ToDoListComponent>;
  let user: User;

  beforeEach(async(() => {
	
	user = new User();
	user.username = 'ali';
	user.password = '5f4dcc3b5aa765d61d8327deb882cf99';

    TestBed.configureTestingModule({
      declarations: [
        ToDoListComponent,
      ],
      providers: [
        { provide: ToDoListService, useClass: MockToDoListService },
	]
    }).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListComponent);
    fixture.detectChanges();
  });

  /*
  it('Should calculate rating for all toDoList after load', async(inject([], () => {
    
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
		expect(fixture.componentInstance.toDoList[0][0].rating).toEqual(3);
		expect(fixture.componentInstance.toDoList[0][1].rating).toEqual(4);
		expect(fixture.componentInstance.toDoList[1][0].rating).toEqual(0);
      });
  })));
  
  it('Should stop playback if playing toDo is different', async(inject([], () => {
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
		var instance = fixture.componentInstance;
		instance.updatePlayingToDo(instance.toDoList[0][0]);
		var firstplayed = instance.playingToDo;
		instance.updatePlayingToDo(instance.toDoList[0][1]);
		expect(firstplayed === instance.playingToDo).toBe(false);
	  });
  })));
  
  it('Should not stop playback if playing toDo is different', async(inject([], () => {
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
		var instance = fixture.componentInstance;
		instance.updatePlayingToDo(instance.toDoList[0][0]);
		var firstplayed = instance.playingToDo;
		instance.updatePlayingToDo(instance.toDoList[0][0]);
		expect(firstplayed === instance.playingToDo).toBe(true);
	  });
  })));
  
  it('Should add more toDoList correctly to original list', async(inject([], () => {
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
		var size = 0;
		for (var i in instance.toDoList){
			for (var j in instance.toDoList[i]){
				size ++;
			}
		}
		
		expect(size).toBe(4);
		instance.getMoreToDos(null);
		
        return fixture.whenStable();
      })
      .then(() => {
		var size = 0;
		for (var i in instance.toDoList){
			for (var j in instance.toDoList[i]){
				size ++;
			}
		}
		expect(size).toBe(8);
	  });
  })));*/
});