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

// Constants represents the only 2 todo states
const INCOMPLETE = 'notCompleted';
const COMPLETE = 'completed';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/**
  * Router mockup
  */
class MockedRouter{
}

/**
  * ToDo service mockup
  */
class MockToDoListService {
  
	// Mocks logged in user
    loggedInUser: any = {
		username: 'ali'
	}
	
	// Mocks get list method
	getToDoList(skip: number, limit: number): Promise<ToDo[]>{
		var response: ToDo[] = [];

		let toDo1 = new ToDo();
		toDo1._id = '1';
		toDo1.description = '';
		toDo1.title = '';
		toDo1.status = INCOMPLETE;
		toDo1.author = {"_id":"5757e6e41b0a244b256ac1d6", "username":"harry"};
		response.push(toDo1);
			
		let toDo2 = new ToDo();
		toDo2._id = '2';
		toDo2.description = '';
		toDo2.title = '';
		toDo2.status = INCOMPLETE;
		toDo2.author = {"_id":"5757e6e41b0a244b256ac1d5", "username":"ali"};
		response.push(toDo2);
		
		let toDo3 = new ToDo();
		toDo3._id = '3';
		toDo3.description = '';
		toDo3.title = '';
		toDo3.status = INCOMPLETE;
		toDo3.author = {"_id":"5757e6e41b0a244b256ac1d6", "username":"harry"};
		response.push(toDo3);
		
		let toDo4 = new ToDo();
		toDo4._id = '4';
		toDo4.description = '';
		toDo4.title = '';
		toDo4.status = COMPLETE;
		toDo4.author = {"_id":"5757e6e41b0a244b256ac1d5", "username":"ali"};
		response.push(toDo4);
		
		let toDo5 = new ToDo();
		toDo5._id = '5';
		toDo5.description = '';
		toDo5.title = '';
		toDo5.status = COMPLETE;
		toDo5.author = {"_id":"5757e6e41b0a244b256ac1d5", "username":"ali"};
		response.push(toDo5);
		
		return Promise.resolve(response);
	}
	
	// Mocks save method
	saveToDo(toDo: ToDo): Promise<ToDo> {
		if (toDo._id == undefined || toDo._id == null)
			toDo._id = new Date().getTime().toString();
		return Promise.resolve(toDo);
	}
	
	// Mocks delete method
	deleteToDo(toDo: ToDo) : Promise<ToDo> {
		return Promise.resolve(toDo);
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
		{ provide: Router, useClass: MockedRouter }
	]
    }).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListComponent);
	let loggedInUser: User = new User();
	loggedInUser.username = 'ali';
	
	fixture.componentInstance.loggedInUser = loggedInUser;

    fixture.detectChanges();
  });

  it('Should load items into complete and incomplete lists correctly', async(inject([], () => {
    
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
		
		expect(instance.incomplete.length).toBe(3);	
		expect(instance.complete.length).toBe(2);
	
        return fixture.whenStable();
      })
  })));
  
  it('Should load item permissions properly', async(inject([], () => {
    
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
		var editable = instance.incomplete.filter((toDo: ToDo) => {
			return toDo.editable === true;
		}).length;
		
		editable += instance.complete.filter((toDo: ToDo) => {
			return toDo.editable === true;
		}).length;
		
		var deletable = instance.incomplete.filter((toDo: ToDo) => {
			return toDo.deletable === true;
		}).length;
		
		deletable += instance.complete.filter((toDo: ToDo) => {
			return toDo.deletable === true;
		}).length;
		
		expect(editable).toBe(3);
		expect(deletable).toBe(3);	

		
        return fixture.whenStable();
      })
  })));
  
  it('Should get mouse cursor correctly according to permissions', async(inject([], () => {
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
		  let toDo: ToDo = new ToDo();
		  toDo.editable = true;
		  
		  expect(instance.getCursor(toDo)).toBe('text');
		  
		  toDo.editable = false;
		  
		  expect(instance.getCursor(toDo)).toBe('move');
	  });
  })));
  
  it('Should save title and description', async(inject([], () => {
	var instance = fixture.componentInstance;
	var toDo: ToDo;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
	  .then(() => {
        fixture.detectChanges();
	    toDo = instance.incomplete[0];
		toDo.editable = true;
		toDo.title = 'new title';
		toDo.description = 'new description';
		
		instance.saveToDo(toDo);  
        return fixture.whenStable();
      })
      .then(() => {
		  expect(instance.incomplete[0].title).toBe('new title');
		  
		  toDo.editable = false;
		  
		  expect(instance.incomplete[0].description).toBe('new description');
	  });
  })));
  
  it('Should delete items correctly from incomplete list', async(inject([], () => {
	var instance = fixture.componentInstance;
	var toDelete: ToDo;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
			toDelete = instance.incomplete[0];
			instance.deleteToDo(toDelete);
			
			return fixture.whenStable();
	  })
	  .then(() => {
			fixture.detectChanges();
			return fixture.whenStable();
	  })
	  .then(() => {
			setTimeout(() => {
				var filtered: any = instance.incomplete.filter((toDo: ToDo) => {
					return toDo === toDelete;
				});
				expect(instance.incomplete.length).toBe(2);
				expect(filtered.length).toBe(0);
			},400)
	  });
  })));
  
  it('Should delete items correctly from complete list', async(inject([], () => {
	var instance = fixture.componentInstance;
	var toDelete: ToDo;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
			toDelete = instance.complete[0];
			instance.deleteToDo(toDelete);
			
			return fixture.whenStable();
	  })
	  .then(() => {
			setTimeout(() => {
				var filtered: any = instance.complete.filter((toDo: ToDo) => {
					return toDo === toDelete;
				});
				expect(instance.complete.length).toBe(1);
				expect(filtered.length).toBe(0);
			}, 400);
	  });
  })));
  
  it('Should add an item correctly, and it should be editable and deletable', async(inject([], () => {
	
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
			instance.addToDo();
			
			return fixture.whenStable();
	  })
	  .then(() => {
			var added = instance.incomplete.filter((toDo: ToDo) => {
				return toDo._id.length !== 1;
			})[0];
			expect(instance.incomplete.length).toBe(4);
			expect(added.editable).toBe(true);
			expect(added.editable).toBe(true);
			
			return fixture.whenStable();

	  });
  })));
  
  it('Should get source bucket correctly', async(inject([], () => {
	
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
		
        return fixture.whenStable();
      })
	  .then(() => {
			instance.draggingToDo = instance.incomplete[0];
			
			expect(instance.getSource()).toBe('leftBucket');
			
			instance.draggingToDo = instance.complete[0];
			
			expect(instance.getSource()).toBe('rightBucket');
			
			return fixture.whenStable();

	  });
  })));
  
  it('Should move item to incomplete list correctly', async(inject([], () => {
	
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
		
        return fixture.whenStable();
      })
      .then(() => {
			var toComplete: ToDo = instance.incomplete[0];
			instance.draggingToDo = toComplete;
			instance.moveToComplete();
			
			return fixture.whenStable();
	  })
	  .then(() => {
			expect(instance.incomplete.length).toBe(2);
			expect(instance.complete.length).toBe(3);
			
			return fixture.whenStable();

	  });
  })));
  
  it('Should move item to complete list correctly', async(inject([], () => {
	
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
		
        return fixture.whenStable();
      })
      .then(() => {
			var toIncomplete: ToDo = instance.complete[0];
			instance.draggingToDo = toIncomplete;
			instance.moveToIncomplete();
			
			return fixture.whenStable();
	  })
	  .then(() => {
			expect(instance.incomplete.length).toBe(4);
			expect(instance.complete.length).toBe(1);
			
			return fixture.whenStable();

	  });
  })));
  
  it('Should drop item to incomplete list correctly', async(inject([], () => {
	
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
		
        return fixture.whenStable();
      })
      .then(() => {
			instance.draggingToDo = instance.complete[0];
			
			var event: any = { screenX : 0, preventDefault : function(){}};
			instance.onDrop(event);
			
			return fixture.whenStable();
	  })
	  .then(() => {
			expect(instance.incomplete.length).toBe(4);
			expect(instance.complete.length).toBe(1);
			
			return fixture.whenStable();

	  });
  })));
  
  it('Should drop item to complete list correctly', async(inject([], () => {
	
	var instance = fixture.componentInstance;
	fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
		
        return fixture.whenStable();
      })
      .then(() => {
			instance.draggingToDo = instance.incomplete[0];
			
			var event: any = { screenX : 5000, preventDefault : function(){}};
			instance.onDrop(event);
			
			return fixture.whenStable();
	  })
	  .then(() => {
			expect(instance.incomplete.length).toBe(2);
			expect(instance.complete.length).toBe(3);
			
			return fixture.whenStable();

	  });
  })));
 
});