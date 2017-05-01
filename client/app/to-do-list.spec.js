System.register(['./to-do-list.service', '@angular/router', './to-do-list.component', '@angular/core/testing', './user', './to-do', 'app/mocks/commons-mock.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var to_do_list_service_1, router_1, to_do_list_component_1, testing_1, user_1, to_do_1;
    var toDoList, INCOMPLETE, COMPLETE, MockedRouter, MockToDoListService;
    return {
        setters:[
            function (to_do_list_service_1_1) {
                to_do_list_service_1 = to_do_list_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (to_do_list_component_1_1) {
                to_do_list_component_1 = to_do_list_component_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (to_do_1_1) {
                to_do_1 = to_do_1_1;
            },
            function (_1) {}],
        execute: function() {
            // Constants represents the only 2 todo states
            INCOMPLETE = 'notCompleted';
            COMPLETE = 'completed';
            /**
              * Router mockup
              */
            MockedRouter = (function () {
                function MockedRouter() {
                }
                return MockedRouter;
            }());
            /**
              * ToDo service mockup
              */
            MockToDoListService = (function () {
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
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tZG8tbGlzdC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG8tZG8tbGlzdC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFlSSxRQUFRLEVBR04sVUFBVSxFQUNWLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRmQsOENBQThDO1lBQ3hDLFVBQVUsR0FBRyxjQUFjLENBQUM7WUFDNUIsUUFBUSxHQUFHLFdBQVcsQ0FBQztZQU83Qjs7Z0JBRUk7WUFDSjtnQkFBQTtnQkFDQSxDQUFDO2dCQUFELG1CQUFDO1lBQUQsQ0FBQyxBQURELElBQ0M7WUFFRDs7Z0JBRUk7WUFDSjtnQkFBQTtvQkFFQyx1QkFBdUI7b0JBQ3BCLGlCQUFZLEdBQVE7d0JBQ3RCLFFBQVEsRUFBRSxLQUFLO3FCQUNmLENBQUE7Z0JBNERGLENBQUM7Z0JBMURBLHdCQUF3QjtnQkFDeEIseUNBQVcsR0FBWCxVQUFZLElBQVksRUFBRSxLQUFhO29CQUN0QyxJQUFJLFFBQVEsR0FBVyxFQUFFLENBQUM7b0JBRTFCLElBQUksS0FBSyxHQUFHLElBQUksWUFBSSxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO29CQUNoQixLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ2pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO29CQUMxQixLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUMsS0FBSyxFQUFDLDBCQUEwQixFQUFFLFVBQVUsRUFBQyxPQUFPLEVBQUMsQ0FBQztvQkFDdEUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxZQUFJLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7b0JBQ2hCLEtBQUssQ0FBQyxXQUFXLEdBQUcs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QUksRUFBRSxjQUFjLEVBQUcsY0FBVyxDQUFDLEVBQUMsQ0FBQzt3QkFDbEUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFFdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQyxDQUFDO3lCQUNELElBQUksQ0FBQzt3QkFDTixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFekMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFNUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWNsYXJlIHZhciBvdXRjb21lOiBzdHJpbmc7XHJcbmltcG9ydCB7IFRvRG9MaXN0U2VydmljZSB9IGZyb20gJy4vdG8tZG8tbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgVG9Eb0xpc3RDb21wb25lbnQgfSBmcm9tICcuL3RvLWRvLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBhc3luYyxcclxuICBpbmplY3QsXHJcbiAgVGVzdEJlZCxcclxuICBDb21wb25lbnRGaXh0dXJlLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL3VzZXInO1xyXG5pbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi90by1kbyc7XHJcblxyXG5pbXBvcnQgJ2FwcC9tb2Nrcy9jb21tb25zLW1vY2suanMnO1xyXG5cclxudmFyIHRvRG9MaXN0OiBUb0RvW107XHJcblxyXG4vLyBDb25zdGFudHMgcmVwcmVzZW50cyB0aGUgb25seSAyIHRvZG8gc3RhdGVzXHJcbmNvbnN0IElOQ09NUExFVEUgPSAnbm90Q29tcGxldGVkJztcclxuY29uc3QgQ09NUExFVEUgPSAnY29tcGxldGVkJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQnJvd3NlckR5bmFtaWNUZXN0aW5nTW9kdWxlLFxyXG4gIHBsYXRmb3JtQnJvd3NlckR5bmFtaWNUZXN0aW5nXHJcbn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3Rlc3RpbmcnO1xyXG5cclxuLyoqXHJcbiAgKiBSb3V0ZXIgbW9ja3VwXHJcbiAgKi9cclxuY2xhc3MgTW9ja2VkUm91dGVye1xyXG59XHJcblxyXG4vKipcclxuICAqIFRvRG8gc2VydmljZSBtb2NrdXBcclxuICAqL1xyXG5jbGFzcyBNb2NrVG9Eb0xpc3RTZXJ2aWNlIHtcclxuICBcclxuXHQvLyBNb2NrcyBsb2dnZWQgaW4gdXNlclxyXG4gICAgbG9nZ2VkSW5Vc2VyOiBhbnkgPSB7XHJcblx0XHR1c2VybmFtZTogJ2FsaSdcclxuXHR9XHJcblx0XHJcblx0Ly8gTW9ja3MgZ2V0IGxpc3QgbWV0aG9kXHJcblx0Z2V0VG9Eb0xpc3Qoc2tpcDogbnVtYmVyLCBsaW1pdDogbnVtYmVyKTogUHJvbWlzZTxUb0RvW10+e1xyXG5cdFx0dmFyIHJlc3BvbnNlOiBUb0RvW10gPSBbXTtcclxuXHJcblx0XHRsZXQgdG9EbzEgPSBuZXcgVG9EbygpO1xyXG5cdFx0dG9EbzEuX2lkID0gJzEnO1xyXG5cdFx0dG9EbzEuZGVzY3JpcHRpb24gPSAnJztcclxuXHRcdHRvRG8xLnRpdGxlID0gJyc7XHJcblx0XHR0b0RvMS5zdGF0dXMgPSBJTkNPTVBMRVRFO1xyXG5cdFx0dG9EbzEuYXV0aG9yID0ge1wiX2lkXCI6XCI1NzU3ZTZlNDFiMGEyNDRiMjU2YWMxZDZcIiwgXCJ1c2VybmFtZVwiOlwiaGFycnlcIn07XHJcblx0XHRyZXNwb25zZS5wdXNoKHRvRG8xKTtcclxuXHRcdFx0XHJcblx0XHRsZXQgdG9EbzIgPSBuZXcgVG9EbygpO1xyXG5cdFx0dG9EbzIuX2lkID0gJzInO1xyXG5cdFx0dG9EbzIuZGVzY3JpcHRpb24gPSAnJztcclxuXHRcdHRvRG8yLnRpdGxlID0gJyc7XHJcblx0XHR0b0RvMi5zdGF0dXMgPSBJTkNPTVBMRVRFO1xyXG5cdFx0dG9EbzIuYXV0aG9yID0ge1wiX2lkXCI6XCI1NzU3ZTZlNDFiMGEyNDRiMjU2YWMxZDVcIiwgXCJ1c2VybmFtZVwiOlwiYWxpXCJ9O1xyXG5cdFx0cmVzcG9uc2UucHVzaCh0b0RvMik7XHJcblx0XHRcclxuXHRcdGxldCB0b0RvMyA9IG5ldyBUb0RvKCk7XHJcblx0XHR0b0RvMy5faWQgPSAnMyc7XHJcblx0XHR0b0RvMy5kZXNjcmlwdGlvbiA9ICcnO1xyXG5cdFx0dG9EbzMudGl0bGUgPSAnJztcclxuXHRcdHRvRG8zLnN0YXR1cyA9IElOQ09NUExFVEU7XHJcblx0XHR0b0RvMy5hdXRob3IgPSB7XCJfaWRcIjpcIjU3NTdlNmU0MWIwYTI0NGIyNTZhYzFkNlwiLCBcInVzZXJuYW1lXCI6XCJoYXJyeVwifTtcclxuXHRcdHJlc3BvbnNlLnB1c2godG9EbzMpO1xyXG5cdFx0XHJcblx0XHRsZXQgdG9EbzQgPSBuZXcgVG9EbygpO1xyXG5cdFx0dG9EbzQuX2lkID0gJzQnO1xyXG5cdFx0dG9EbzQuZGVzY3JpcHRpb24gPSAnJztcclxuXHRcdHRvRG80LnRpdGxlID0gJyc7XHJcblx0XHR0b0RvNC5zdGF0dXMgPSBDT01QTEVURTtcclxuXHRcdHRvRG80LmF1dGhvciA9IHtcIl9pZFwiOlwiNTc1N2U2ZTQxYjBhMjQ0YjI1NmFjMWQ1XCIsIFwidXNlcm5hbWVcIjpcImFsaVwifTtcclxuXHRcdHJlc3BvbnNlLnB1c2godG9EbzQpO1xyXG5cdFx0XHJcblx0XHRsZXQgdG9EbzUgPSBuZXcgVG9EbygpO1xyXG5cdFx0dG9EbzUuX2lkID0gJzUnO1xyXG5cdFx0dG9EbzUuZGVzY3JpcHRpb24gPSAnJztcclxuXHRcdHRvRG81LnRpdGxlID0gJyc7XHJcblx0XHR0b0RvNS5zdGF0dXMgPSBDT01QTEVURTtcclxuXHRcdHRvRG81LmF1dGhvciA9IHtcIl9pZFwiOlwiNTc1N2U2ZTQxYjBhMjQ0YjI1NmFjMWQ1XCIsIFwidXNlcm5hbWVcIjpcImFsaVwifTtcclxuXHRcdHJlc3BvbnNlLnB1c2godG9EbzUpO1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHR9XHJcblx0XHJcblx0Ly8gTW9ja3Mgc2F2ZSBtZXRob2RcclxuXHRzYXZlVG9Ebyh0b0RvOiBUb0RvKTogUHJvbWlzZTxUb0RvPiB7XHJcblx0XHRpZiAodG9Eby5faWQgPT0gdW5kZWZpbmVkIHx8IHRvRG8uX2lkID09IG51bGwpXHJcblx0XHRcdHRvRG8uX2lkID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKTtcclxuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodG9Ebyk7XHJcblx0fVxyXG5cdFxyXG5cdC8vIE1vY2tzIGRlbGV0ZSBtZXRob2RcclxuXHRkZWxldGVUb0RvKHRvRG86IFRvRG8pIDogUHJvbWlzZTxUb0RvPiB7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRvRG8pO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAgKiBVbml0IHRlc3RzIGZvciBUb0RvTGlzdENvbXBvbmVudFxyXG4gICovXHJcbmRlc2NyaWJlKCdUZXN0aW5nIFRvRG8gTGlzdCBDb21wb25lbnQnLCAoKSA9PiB7XHJcbiAgbGV0IGZpeHR1cmU6IENvbXBvbmVudEZpeHR1cmU8VG9Eb0xpc3RDb21wb25lbnQ+O1xyXG4gIGxldCB1c2VyOiBVc2VyO1xyXG5cclxuICBiZWZvcmVFYWNoKGFzeW5jKCgpID0+IHtcclxuXHRcclxuXHR1c2VyID0gbmV3IFVzZXIoKTtcclxuXHR1c2VyLnVzZXJuYW1lID0gJ2FsaSc7XHJcblx0dXNlci5wYXNzd29yZCA9ICc1ZjRkY2MzYjVhYTc2NWQ2MWQ4MzI3ZGViODgyY2Y5OSc7XHJcblxyXG4gICAgVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlKHtcclxuICAgICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgVG9Eb0xpc3RDb21wb25lbnQsXHJcbiAgICAgIF0sXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHsgcHJvdmlkZTogVG9Eb0xpc3RTZXJ2aWNlLCB1c2VDbGFzczogTW9ja1RvRG9MaXN0U2VydmljZSB9LFxyXG5cdFx0eyBwcm92aWRlOiBSb3V0ZXIsIHVzZUNsYXNzOiBNb2NrZWRSb3V0ZXIgfVxyXG5cdF1cclxuICAgIH0pLmNvbXBpbGVDb21wb25lbnRzKCk7XHJcbiAgfSkpO1xyXG4gIFxyXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xyXG4gICAgZml4dHVyZSA9IFRlc3RCZWQuY3JlYXRlQ29tcG9uZW50KFRvRG9MaXN0Q29tcG9uZW50KTtcclxuXHRsZXQgbG9nZ2VkSW5Vc2VyOiBVc2VyID0gbmV3IFVzZXIoKTtcclxuXHRsb2dnZWRJblVzZXIudXNlcm5hbWUgPSAnYWxpJztcclxuXHRcclxuXHRmaXh0dXJlLmNvbXBvbmVudEluc3RhbmNlLmxvZ2dlZEluVXNlciA9IGxvZ2dlZEluVXNlcjtcclxuXHJcbiAgICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcclxuICB9KTtcclxuXHJcbiAgaXQoJ1Nob3VsZCBsb2FkIGl0ZW1zIGludG8gY29tcGxldGUgYW5kIGluY29tcGxldGUgbGlzdHMgY29ycmVjdGx5JywgYXN5bmMoaW5qZWN0KFtdLCAoKSA9PiB7XHJcbiAgICBcclxuXHR2YXIgaW5zdGFuY2UgPSBmaXh0dXJlLmNvbXBvbmVudEluc3RhbmNlO1xyXG5cdGZpeHR1cmUud2hlblN0YWJsZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdFxyXG5cdFx0ZXhwZWN0KGluc3RhbmNlLmluY29tcGxldGUubGVuZ3RoKS50b0JlKDMpO1x0XHJcblx0XHRleHBlY3QoaW5zdGFuY2UuY29tcGxldGUubGVuZ3RoKS50b0JlKDIpO1xyXG5cdFxyXG4gICAgICAgIHJldHVybiBmaXh0dXJlLndoZW5TdGFibGUoKTtcclxuICAgICAgfSlcclxuICB9KSkpO1xyXG4gIFxyXG4gIGl0KCdTaG91bGQgbG9hZCBpdGVtIHBlcm1pc3Npb25zIHByb3Blcmx5JywgYXN5bmMoaW5qZWN0KFtdLCAoKSA9PiB7XHJcbiAgICBcclxuXHR2YXIgaW5zdGFuY2UgPSBmaXh0dXJlLmNvbXBvbmVudEluc3RhbmNlO1xyXG5cdGZpeHR1cmUud2hlblN0YWJsZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdHZhciBlZGl0YWJsZSA9IGluc3RhbmNlLmluY29tcGxldGUuZmlsdGVyKCh0b0RvOiBUb0RvKSA9PiB7XHJcblx0XHRcdHJldHVybiB0b0RvLmVkaXRhYmxlID09PSB0cnVlO1xyXG5cdFx0fSkubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHRlZGl0YWJsZSArPSBpbnN0YW5jZS5jb21wbGV0ZS5maWx0ZXIoKHRvRG86IFRvRG8pID0+IHtcclxuXHRcdFx0cmV0dXJuIHRvRG8uZWRpdGFibGUgPT09IHRydWU7XHJcblx0XHR9KS5sZW5ndGg7XHJcblx0XHRcclxuXHRcdHZhciBkZWxldGFibGUgPSBpbnN0YW5jZS5pbmNvbXBsZXRlLmZpbHRlcigodG9EbzogVG9EbykgPT4ge1xyXG5cdFx0XHRyZXR1cm4gdG9Eby5kZWxldGFibGUgPT09IHRydWU7XHJcblx0XHR9KS5sZW5ndGg7XHJcblx0XHRcclxuXHRcdGRlbGV0YWJsZSArPSBpbnN0YW5jZS5jb21wbGV0ZS5maWx0ZXIoKHRvRG86IFRvRG8pID0+IHtcclxuXHRcdFx0cmV0dXJuIHRvRG8uZGVsZXRhYmxlID09PSB0cnVlO1xyXG5cdFx0fSkubGVuZ3RoO1xyXG5cdFx0XHJcblx0XHRleHBlY3QoZWRpdGFibGUpLnRvQmUoMyk7XHJcblx0XHRleHBlY3QoZGVsZXRhYmxlKS50b0JlKDMpO1x0XHJcblxyXG5cdFx0XHJcbiAgICAgICAgcmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG4gICAgICB9KVxyXG4gIH0pKSk7XHJcbiAgXHJcbiAgaXQoJ1Nob3VsZCBnZXQgbW91c2UgY3Vyc29yIGNvcnJlY3RseSBhY2NvcmRpbmcgdG8gcGVybWlzc2lvbnMnLCBhc3luYyhpbmplY3QoW10sICgpID0+IHtcclxuXHR2YXIgaW5zdGFuY2UgPSBmaXh0dXJlLmNvbXBvbmVudEluc3RhbmNlO1xyXG5cdGZpeHR1cmUud2hlblN0YWJsZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICByZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHRcdCAgbGV0IHRvRG86IFRvRG8gPSBuZXcgVG9EbygpO1xyXG5cdFx0ICB0b0RvLmVkaXRhYmxlID0gdHJ1ZTtcclxuXHRcdCAgXHJcblx0XHQgIGV4cGVjdChpbnN0YW5jZS5nZXRDdXJzb3IodG9EbykpLnRvQmUoJ3RleHQnKTtcclxuXHRcdCAgXHJcblx0XHQgIHRvRG8uZWRpdGFibGUgPSBmYWxzZTtcclxuXHRcdCAgXHJcblx0XHQgIGV4cGVjdChpbnN0YW5jZS5nZXRDdXJzb3IodG9EbykpLnRvQmUoJ21vdmUnKTtcclxuXHQgIH0pO1xyXG4gIH0pKSk7XHJcbiAgXHJcbiAgaXQoJ1Nob3VsZCBzYXZlIHRpdGxlIGFuZCBkZXNjcmlwdGlvbicsIGFzeW5jKGluamVjdChbXSwgKCkgPT4ge1xyXG5cdHZhciBpbnN0YW5jZSA9IGZpeHR1cmUuY29tcG9uZW50SW5zdGFuY2U7XHJcblx0dmFyIHRvRG86IFRvRG87XHJcblx0Zml4dHVyZS53aGVuU3RhYmxlKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGZpeHR1cmUuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIHJldHVybiBmaXh0dXJlLndoZW5TdGFibGUoKTtcclxuICAgICAgfSlcclxuXHQgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcclxuXHQgICAgdG9EbyA9IGluc3RhbmNlLmluY29tcGxldGVbMF07XHJcblx0XHR0b0RvLmVkaXRhYmxlID0gdHJ1ZTtcclxuXHRcdHRvRG8udGl0bGUgPSAnbmV3IHRpdGxlJztcclxuXHRcdHRvRG8uZGVzY3JpcHRpb24gPSAnbmV3IGRlc2NyaXB0aW9uJztcclxuXHRcdFxyXG5cdFx0aW5zdGFuY2Uuc2F2ZVRvRG8odG9Ebyk7ICBcclxuICAgICAgICByZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHRcdCAgZXhwZWN0KGluc3RhbmNlLmluY29tcGxldGVbMF0udGl0bGUpLnRvQmUoJ25ldyB0aXRsZScpO1xyXG5cdFx0ICBcclxuXHRcdCAgdG9Eby5lZGl0YWJsZSA9IGZhbHNlO1xyXG5cdFx0ICBcclxuXHRcdCAgZXhwZWN0KGluc3RhbmNlLmluY29tcGxldGVbMF0uZGVzY3JpcHRpb24pLnRvQmUoJ25ldyBkZXNjcmlwdGlvbicpO1xyXG5cdCAgfSk7XHJcbiAgfSkpKTtcclxuICBcclxuICBpdCgnU2hvdWxkIGRlbGV0ZSBpdGVtcyBjb3JyZWN0bHkgZnJvbSBpbmNvbXBsZXRlIGxpc3QnLCBhc3luYyhpbmplY3QoW10sICgpID0+IHtcclxuXHR2YXIgaW5zdGFuY2UgPSBmaXh0dXJlLmNvbXBvbmVudEluc3RhbmNlO1xyXG5cdHZhciB0b0RlbGV0ZTogVG9EbztcclxuXHRmaXh0dXJlLndoZW5TdGFibGUoKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgZml4dHVyZS5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcblx0XHRcdHRvRGVsZXRlID0gaW5zdGFuY2UuaW5jb21wbGV0ZVswXTtcclxuXHRcdFx0aW5zdGFuY2UuZGVsZXRlVG9Ebyh0b0RlbGV0ZSk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcblx0ICB9KVxyXG5cdCAgLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdFx0cmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG5cdCAgfSlcclxuXHQgIC50aGVuKCgpID0+IHtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dmFyIGZpbHRlcmVkOiBhbnkgPSBpbnN0YW5jZS5pbmNvbXBsZXRlLmZpbHRlcigodG9EbzogVG9EbykgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRvRG8gPT09IHRvRGVsZXRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGV4cGVjdChpbnN0YW5jZS5pbmNvbXBsZXRlLmxlbmd0aCkudG9CZSgyKTtcclxuXHRcdFx0XHRleHBlY3QoZmlsdGVyZWQubGVuZ3RoKS50b0JlKDApO1xyXG5cdFx0XHR9LDQwMClcclxuXHQgIH0pO1xyXG4gIH0pKSk7XHJcbiAgXHJcbiAgaXQoJ1Nob3VsZCBkZWxldGUgaXRlbXMgY29ycmVjdGx5IGZyb20gY29tcGxldGUgbGlzdCcsIGFzeW5jKGluamVjdChbXSwgKCkgPT4ge1xyXG5cdHZhciBpbnN0YW5jZSA9IGZpeHR1cmUuY29tcG9uZW50SW5zdGFuY2U7XHJcblx0dmFyIHRvRGVsZXRlOiBUb0RvO1xyXG5cdGZpeHR1cmUud2hlblN0YWJsZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICByZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHRcdFx0dG9EZWxldGUgPSBpbnN0YW5jZS5jb21wbGV0ZVswXTtcclxuXHRcdFx0aW5zdGFuY2UuZGVsZXRlVG9Ebyh0b0RlbGV0ZSk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcblx0ICB9KVxyXG5cdCAgLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHR2YXIgZmlsdGVyZWQ6IGFueSA9IGluc3RhbmNlLmNvbXBsZXRlLmZpbHRlcigodG9EbzogVG9EbykgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRvRG8gPT09IHRvRGVsZXRlO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGV4cGVjdChpbnN0YW5jZS5jb21wbGV0ZS5sZW5ndGgpLnRvQmUoMSk7XHJcblx0XHRcdFx0ZXhwZWN0KGZpbHRlcmVkLmxlbmd0aCkudG9CZSgwKTtcclxuXHRcdFx0fSwgNDAwKTtcclxuXHQgIH0pO1xyXG4gIH0pKSk7XHJcbiAgXHJcbiAgaXQoJ1Nob3VsZCBhZGQgYW4gaXRlbSBjb3JyZWN0bHksIGFuZCBpdCBzaG91bGQgYmUgZWRpdGFibGUgYW5kIGRlbGV0YWJsZScsIGFzeW5jKGluamVjdChbXSwgKCkgPT4ge1xyXG5cdFxyXG5cdHZhciBpbnN0YW5jZSA9IGZpeHR1cmUuY29tcG9uZW50SW5zdGFuY2U7XHJcblx0Zml4dHVyZS53aGVuU3RhYmxlKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGZpeHR1cmUuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIHJldHVybiBmaXh0dXJlLndoZW5TdGFibGUoKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRpbnN0YW5jZS5hZGRUb0RvKCk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcblx0ICB9KVxyXG5cdCAgLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHR2YXIgYWRkZWQgPSBpbnN0YW5jZS5pbmNvbXBsZXRlLmZpbHRlcigodG9EbzogVG9EbykgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB0b0RvLl9pZC5sZW5ndGggIT09IDE7XHJcblx0XHRcdH0pWzBdO1xyXG5cdFx0XHRleHBlY3QoaW5zdGFuY2UuaW5jb21wbGV0ZS5sZW5ndGgpLnRvQmUoNCk7XHJcblx0XHRcdGV4cGVjdChhZGRlZC5lZGl0YWJsZSkudG9CZSh0cnVlKTtcclxuXHRcdFx0ZXhwZWN0KGFkZGVkLmVkaXRhYmxlKS50b0JlKHRydWUpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG5cclxuXHQgIH0pO1xyXG4gIH0pKSk7XHJcbiAgXHJcbiAgaXQoJ1Nob3VsZCBnZXQgc291cmNlIGJ1Y2tldCBjb3JyZWN0bHknLCBhc3luYyhpbmplY3QoW10sICgpID0+IHtcclxuXHRcclxuXHR2YXIgaW5zdGFuY2UgPSBmaXh0dXJlLmNvbXBvbmVudEluc3RhbmNlO1xyXG5cdGZpeHR1cmUud2hlblN0YWJsZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdFxyXG4gICAgICAgIHJldHVybiBmaXh0dXJlLndoZW5TdGFibGUoKTtcclxuICAgICAgfSlcclxuXHQgIC50aGVuKCgpID0+IHtcclxuXHRcdFx0aW5zdGFuY2UuZHJhZ2dpbmdUb0RvID0gaW5zdGFuY2UuaW5jb21wbGV0ZVswXTtcclxuXHRcdFx0XHJcblx0XHRcdGV4cGVjdChpbnN0YW5jZS5nZXRTb3VyY2UoKSkudG9CZSgnbGVmdEJ1Y2tldCcpO1xyXG5cdFx0XHRcclxuXHRcdFx0aW5zdGFuY2UuZHJhZ2dpbmdUb0RvID0gaW5zdGFuY2UuY29tcGxldGVbMF07XHJcblx0XHRcdFxyXG5cdFx0XHRleHBlY3QoaW5zdGFuY2UuZ2V0U291cmNlKCkpLnRvQmUoJ3JpZ2h0QnVja2V0Jyk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcblxyXG5cdCAgfSk7XHJcbiAgfSkpKTtcclxuICBcclxuICBpdCgnU2hvdWxkIG1vdmUgaXRlbSB0byBpbmNvbXBsZXRlIGxpc3QgY29ycmVjdGx5JywgYXN5bmMoaW5qZWN0KFtdLCAoKSA9PiB7XHJcblx0XHJcblx0dmFyIGluc3RhbmNlID0gZml4dHVyZS5jb21wb25lbnRJbnN0YW5jZTtcclxuXHRmaXh0dXJlLndoZW5TdGFibGUoKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgZml4dHVyZS5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0XHRcclxuICAgICAgICByZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuXHRcdFx0dmFyIHRvQ29tcGxldGU6IFRvRG8gPSBpbnN0YW5jZS5pbmNvbXBsZXRlWzBdO1xyXG5cdFx0XHRpbnN0YW5jZS5kcmFnZ2luZ1RvRG8gPSB0b0NvbXBsZXRlO1xyXG5cdFx0XHRpbnN0YW5jZS5tb3ZlVG9Db21wbGV0ZSgpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG5cdCAgfSlcclxuXHQgIC50aGVuKCgpID0+IHtcclxuXHRcdFx0ZXhwZWN0KGluc3RhbmNlLmluY29tcGxldGUubGVuZ3RoKS50b0JlKDIpO1xyXG5cdFx0XHRleHBlY3QoaW5zdGFuY2UuY29tcGxldGUubGVuZ3RoKS50b0JlKDMpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG5cclxuXHQgIH0pO1xyXG4gIH0pKSk7XHJcbiAgXHJcbiAgaXQoJ1Nob3VsZCBtb3ZlIGl0ZW0gdG8gY29tcGxldGUgbGlzdCBjb3JyZWN0bHknLCBhc3luYyhpbmplY3QoW10sICgpID0+IHtcclxuXHRcclxuXHR2YXIgaW5zdGFuY2UgPSBmaXh0dXJlLmNvbXBvbmVudEluc3RhbmNlO1xyXG5cdGZpeHR1cmUud2hlblN0YWJsZSgpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBmaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdFxyXG4gICAgICAgIHJldHVybiBmaXh0dXJlLndoZW5TdGFibGUoKTtcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHR2YXIgdG9JbmNvbXBsZXRlOiBUb0RvID0gaW5zdGFuY2UuY29tcGxldGVbMF07XHJcblx0XHRcdGluc3RhbmNlLmRyYWdnaW5nVG9EbyA9IHRvSW5jb21wbGV0ZTtcclxuXHRcdFx0aW5zdGFuY2UubW92ZVRvSW5jb21wbGV0ZSgpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG5cdCAgfSlcclxuXHQgIC50aGVuKCgpID0+IHtcclxuXHRcdFx0ZXhwZWN0KGluc3RhbmNlLmluY29tcGxldGUubGVuZ3RoKS50b0JlKDQpO1xyXG5cdFx0XHRleHBlY3QoaW5zdGFuY2UuY29tcGxldGUubGVuZ3RoKS50b0JlKDEpO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG5cclxuXHQgIH0pO1xyXG4gIH0pKSk7XHJcbiAgXHJcbiAgaXQoJ1Nob3VsZCBkcm9wIGl0ZW0gdG8gaW5jb21wbGV0ZSBsaXN0IGNvcnJlY3RseScsIGFzeW5jKGluamVjdChbXSwgKCkgPT4ge1xyXG5cdFxyXG5cdHZhciBpbnN0YW5jZSA9IGZpeHR1cmUuY29tcG9uZW50SW5zdGFuY2U7XHJcblx0Zml4dHVyZS53aGVuU3RhYmxlKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGZpeHR1cmUuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdFx0XHJcbiAgICAgICAgcmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcblx0XHRcdGluc3RhbmNlLmRyYWdnaW5nVG9EbyA9IGluc3RhbmNlLmNvbXBsZXRlWzBdO1xyXG5cdFx0XHRcclxuXHRcdFx0dmFyIGV2ZW50OiBhbnkgPSB7IHNjcmVlblggOiAwLCBwcmV2ZW50RGVmYXVsdCA6IGZ1bmN0aW9uKCl7fX07XHJcblx0XHRcdGluc3RhbmNlLm9uRHJvcChldmVudCk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcblx0ICB9KVxyXG5cdCAgLnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRleHBlY3QoaW5zdGFuY2UuaW5jb21wbGV0ZS5sZW5ndGgpLnRvQmUoNCk7XHJcblx0XHRcdGV4cGVjdChpbnN0YW5jZS5jb21wbGV0ZS5sZW5ndGgpLnRvQmUoMSk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gZml4dHVyZS53aGVuU3RhYmxlKCk7XHJcblxyXG5cdCAgfSk7XHJcbiAgfSkpKTtcclxuICBcclxuICBpdCgnU2hvdWxkIGRyb3AgaXRlbSB0byBjb21wbGV0ZSBsaXN0IGNvcnJlY3RseScsIGFzeW5jKGluamVjdChbXSwgKCkgPT4ge1xyXG5cdFxyXG5cdHZhciBpbnN0YW5jZSA9IGZpeHR1cmUuY29tcG9uZW50SW5zdGFuY2U7XHJcblx0Zml4dHVyZS53aGVuU3RhYmxlKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGZpeHR1cmUuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdFx0XHJcbiAgICAgICAgcmV0dXJuIGZpeHR1cmUud2hlblN0YWJsZSgpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcblx0XHRcdGluc3RhbmNlLmRyYWdnaW5nVG9EbyA9IGluc3RhbmNlLmluY29tcGxldGVbMF07XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgZXZlbnQ6IGFueSA9IHsgc2NyZWVuWCA6IDUwMDAsIHByZXZlbnREZWZhdWx0IDogZnVuY3Rpb24oKXt9fTtcclxuXHRcdFx0aW5zdGFuY2Uub25Ecm9wKGV2ZW50KTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBmaXh0dXJlLndoZW5TdGFibGUoKTtcclxuXHQgIH0pXHJcblx0ICAudGhlbigoKSA9PiB7XHJcblx0XHRcdGV4cGVjdChpbnN0YW5jZS5pbmNvbXBsZXRlLmxlbmd0aCkudG9CZSgyKTtcclxuXHRcdFx0ZXhwZWN0KGluc3RhbmNlLmNvbXBsZXRlLmxlbmd0aCkudG9CZSgzKTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBmaXh0dXJlLndoZW5TdGFibGUoKTtcclxuXHJcblx0ICB9KTtcclxuICB9KSkpO1xyXG4gXHJcbn0pOyJdfQ==