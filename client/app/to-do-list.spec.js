"use strict";
var to_do_list_service_1 = require('./to-do-list.service');
var router_1 = require('@angular/router');
var to_do_list_component_1 = require('./to-do-list.component');
var testing_1 = require('@angular/core/testing');
var user_1 = require('./user');
var to_do_1 = require('./to-do');
require('app/mocks/commons-mock.js');
var toDoList;
// Constants represents the only 2 todo states
var INCOMPLETE = 'notCompleted';
var COMPLETE = 'completed';
/**
  * Router mockup
  */
var MockedRouter = (function () {
    function MockedRouter() {
    }
    return MockedRouter;
}());
/**
  * ToDo service mockup
  */
var MockToDoListService = (function () {
    function MockToDoListService() {
        // Mocks logged in user
        this.loggedInUser = {
            username: 'ali'
        };
    }
    // Mocks get list method
    MockToDoListService.prototype.getToDoList = function (skip, limit) {
        var response = [];
        var toDo1 = new to_do_1.ToDo();
        toDo1._id = '1';
        toDo1.description = '';
        toDo1.title = '';
        toDo1.status = INCOMPLETE;
        toDo1.author = { "_id": "5757e6e41b0a244b256ac1d6", "username": "harry" };
        response.push(toDo1);
        var toDo2 = new to_do_1.ToDo();
        toDo2._id = '2';
        toDo2.description = '';
        toDo2.title = '';
        toDo2.status = INCOMPLETE;
        toDo2.author = { "_id": "5757e6e41b0a244b256ac1d5", "username": "ali" };
        response.push(toDo2);
        var toDo3 = new to_do_1.ToDo();
        toDo3._id = '3';
        toDo3.description = '';
        toDo3.title = '';
        toDo3.status = INCOMPLETE;
        toDo3.author = { "_id": "5757e6e41b0a244b256ac1d6", "username": "harry" };
        response.push(toDo3);
        var toDo4 = new to_do_1.ToDo();
        toDo4._id = '4';
        toDo4.description = '';
        toDo4.title = '';
        toDo4.status = COMPLETE;
        toDo4.author = { "_id": "5757e6e41b0a244b256ac1d5", "username": "ali" };
        response.push(toDo4);
        var toDo5 = new to_do_1.ToDo();
        toDo5._id = '5';
        toDo5.description = '';
        toDo5.title = '';
        toDo5.status = COMPLETE;
        toDo5.author = { "_id": "5757e6e41b0a244b256ac1d5", "username": "ali" };
        response.push(toDo5);
        return Promise.resolve(response);
    };
    // Mocks save method
    MockToDoListService.prototype.saveToDo = function (toDo) {
        if (toDo._id == undefined || toDo._id == null)
            toDo._id = new Date().getTime().toString();
        return Promise.resolve(toDo);
    };
    // Mocks delete method
    MockToDoListService.prototype.deleteToDo = function (toDo) {
        return Promise.resolve(toDo);
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
                { provide: router_1.Router, useClass: MockedRouter }
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(to_do_list_component_1.ToDoListComponent);
        var loggedInUser = new user_1.User();
        loggedInUser.username = 'ali';
        fixture.componentInstance.loggedInUser = loggedInUser;
        fixture.detectChanges();
    });
    it('Should load items into complete and incomplete lists correctly', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            expect(instance.incomplete.length).toBe(3);
            expect(instance.complete.length).toBe(2);
            return fixture.whenStable();
        });
    })));
    it('Should load item permissions properly', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            var editable = instance.incomplete.filter(function (toDo) {
                return toDo.editable === true;
            }).length;
            editable += instance.complete.filter(function (toDo) {
                return toDo.editable === true;
            }).length;
            var deletable = instance.incomplete.filter(function (toDo) {
                return toDo.deletable === true;
            }).length;
            deletable += instance.complete.filter(function (toDo) {
                return toDo.deletable === true;
            }).length;
            expect(editable).toBe(3);
            expect(deletable).toBe(3);
            return fixture.whenStable();
        });
    })));
    it('Should get mouse cursor correctly according to permissions', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            var toDo = new to_do_1.ToDo();
            toDo.editable = true;
            expect(instance.getCursor(toDo)).toBe('text');
            toDo.editable = false;
            expect(instance.getCursor(toDo)).toBe('move');
        });
    })));
    it('Should save title and description', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        var toDo;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            fixture.detectChanges();
            toDo = instance.incomplete[0];
            toDo.editable = true;
            toDo.title = 'new title';
            toDo.description = 'new description';
            instance.saveToDo(toDo);
            return fixture.whenStable();
        })
            .then(function () {
            expect(instance.incomplete[0].title).toBe('new title');
            toDo.editable = false;
            expect(instance.incomplete[0].description).toBe('new description');
        });
    })));
    it('Should delete items correctly from incomplete list', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        var toDelete;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            toDelete = instance.incomplete[0];
            instance.deleteToDo(toDelete);
            return fixture.whenStable();
        })
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            setTimeout(function () {
                var filtered = instance.incomplete.filter(function (toDo) {
                    return toDo === toDelete;
                });
                expect(instance.incomplete.length).toBe(2);
                expect(filtered.length).toBe(0);
            }, 400);
        });
    })));
    it('Should delete items correctly from complete list', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        var toDelete;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            toDelete = instance.complete[0];
            instance.deleteToDo(toDelete);
            return fixture.whenStable();
        })
            .then(function () {
            setTimeout(function () {
                var filtered = instance.complete.filter(function (toDo) {
                    return toDo === toDelete;
                });
                expect(instance.complete.length).toBe(1);
                expect(filtered.length).toBe(0);
            }, 400);
        });
    })));
    it('Should add an item correctly, and it should be editable and deletable', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            instance.addToDo();
            return fixture.whenStable();
        })
            .then(function () {
            var added = instance.incomplete.filter(function (toDo) {
                return toDo._id.length !== 1;
            })[0];
            expect(instance.incomplete.length).toBe(4);
            expect(added.editable).toBe(true);
            expect(added.editable).toBe(true);
            return fixture.whenStable();
        });
    })));
    it('Should get source bucket correctly', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            instance.draggingToDo = instance.incomplete[0];
            expect(instance.getSource()).toBe('leftBucket');
            instance.draggingToDo = instance.complete[0];
            expect(instance.getSource()).toBe('rightBucket');
            return fixture.whenStable();
        });
    })));
    it('Should move item to incomplete list correctly', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            var toComplete = instance.incomplete[0];
            instance.draggingToDo = toComplete;
            instance.moveToComplete();
            return fixture.whenStable();
        })
            .then(function () {
            expect(instance.incomplete.length).toBe(2);
            expect(instance.complete.length).toBe(3);
            return fixture.whenStable();
        });
    })));
    it('Should move item to complete list correctly', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            var toIncomplete = instance.complete[0];
            instance.draggingToDo = toIncomplete;
            instance.moveToIncomplete();
            return fixture.whenStable();
        })
            .then(function () {
            expect(instance.incomplete.length).toBe(4);
            expect(instance.complete.length).toBe(1);
            return fixture.whenStable();
        });
    })));
    it('Should drop item to incomplete list correctly', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            instance.draggingToDo = instance.complete[0];
            var event = { screenX: 0, preventDefault: function () { } };
            instance.onDrop(event);
            return fixture.whenStable();
        })
            .then(function () {
            expect(instance.incomplete.length).toBe(4);
            expect(instance.complete.length).toBe(1);
            return fixture.whenStable();
        });
    })));
    it('Should drop item to complete list correctly', testing_1.async(testing_1.inject([], function () {
        var instance = fixture.componentInstance;
        fixture.whenStable()
            .then(function () {
            fixture.detectChanges();
            return fixture.whenStable();
        })
            .then(function () {
            instance.draggingToDo = instance.incomplete[0];
            var event = { screenX: 5000, preventDefault: function () { } };
            instance.onDrop(event);
            return fixture.whenStable();
        })
            .then(function () {
            expect(instance.incomplete.length).toBe(2);
            expect(instance.complete.length).toBe(3);
            return fixture.whenStable();
        });
    })));
});
//# sourceMappingURL=to-do-list.spec.js.map