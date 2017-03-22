"use strict";
var to_do_list_service_1 = require('./to-do-list.service');
var to_do_list_component_1 = require('./to-do-list.component');
var testing_1 = require('@angular/core/testing');
var user_1 = require('./user');
var to_do_1 = require('./to-do');
require('app/mocks/commons-mock.js');
var toDoList;
/**
  * ToDo service mockup
  */
var MockToDoListService = (function () {
    function MockToDoListService() {
    }
    MockToDoListService.prototype.getToDos = function (skip, limit) {
        toDoList = [];
        var toDo1 = new to_do_1.ToDo();
        var toDo2 = new to_do_1.ToDo();
        var toDo3 = new to_do_1.ToDo();
        var toDo4 = new to_do_1.ToDo();
        var toDo5 = new to_do_1.ToDo();
        var toDo6 = new to_do_1.ToDo();
        var toDo7 = new to_do_1.ToDo();
        var toDo8 = new to_do_1.ToDo();
        var response = [];
        var end = skip + limit;
        for (var i = skip; i < end; i++) {
            response.push(toDoList[i]);
        }
        return Promise.resolve(response);
    };
    MockToDoListService.prototype.testMethod = function () {
    };
    return MockToDoListService;
}());
/**
  * Unit tests for ToDoListComponent
  */
describe('Testing ToDo List Component', function () {
    var fixture;
    var user;
    beforeEach(testing_1.async(function () {
        user = new user_1.User();
        user.username = 'ali';
        user.password = '5f4dcc3b5aa765d61d8327deb882cf99';
        testing_1.TestBed.configureTestingModule({
            declarations: [
                to_do_list_component_1.ToDoListComponent,
            ],
            providers: [
                { provide: to_do_list_service_1.ToDoListService, useClass: MockToDoListService },
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(to_do_list_component_1.ToDoListComponent);
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
//# sourceMappingURL=to-do-list.spec.js.map