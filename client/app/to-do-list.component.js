System.register(['@angular/core', './to-do-list.service', './to-do', '@angular/router', 'app/commons.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, to_do_list_service_1, to_do_1, router_1;
    var INCOMPLETE, COMPLETE, ToDoListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (to_do_list_service_1_1) {
                to_do_list_service_1 = to_do_list_service_1_1;
            },
            function (to_do_1_1) {
                to_do_1 = to_do_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {}],
        execute: function() {
            // Constants represents the only 2 todo states
            INCOMPLETE = 'notCompleted';
            COMPLETE = 'completed';
            ToDoListComponent = (function () {
                function ToDoListComponent(toDoListService, router) {
                    this.toDoListService = toDoListService;
                    this.router = router;
                }
                /**
                 * Loads todos, splits thems in two according to
                 * status.
                 */
                ToDoListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.toDoListService.getToDoList(null, null)
                        .then(function (toDoList) {
                        _this.loggedInUser = _this.toDoListService.loggedInUser;
                        for (var i in toDoList) {
                            if (toDoList[i].author.username
                                === _this.loggedInUser.username) {
                                toDoList[i].deletable = true;
                                toDoList[i].editable = true;
                            }
                            else {
                                toDoList[i].deletable = false;
                                toDoList[i].editable = false;
                            }
                        }
                        _this.incomplete = toDoList.filter(function (toDo) {
                            return toDo.status === INCOMPLETE;
                        });
                        _this.complete = toDoList.filter(function (toDo) {
                            return toDo.status === COMPLETE;
                        });
                        setInlineEditor();
                        setListAnimation('#incompleteList', true);
                        setListAnimation('#completeList', false);
                        setFadeInAnimation('#addButton');
                        showToast('Welcome back, ' + _this.loggedInUser.username + '!!', 4000);
                        readjustPanels();
                    });
                };
                /**
                 * Creates new todo, and adds it to the incomplete list.
                 */
                ToDoListComponent.prototype.addToDo = function () {
                    var _this = this;
                    this.blankToDo = new to_do_1.ToDo();
                    this.blankToDo.title = 'Enter Title';
                    this.blankToDo.status = INCOMPLETE;
                    this.blankToDo.description = 'Enter Description';
                    this.toDoListService.saveToDo(this.blankToDo)
                        .then(function (toDo) {
                        toDo.editable = true;
                        toDo.deletable = true;
                        _this.incomplete.push(toDo);
                        setFadeInAnimation('#' + toDo._id + 'Card');
                        showToast('To-Do added!!', 4000);
                        setInlineEditor();
                        readjustPanels();
                        setTimeout(function () {
                            window.scrollTo(0, document.getElementById('incompleteList').scrollHeight);
                        }, 0);
                    });
                };
                /**
                 * Gets the cursor for the todo according to the value
                 * of field 'editable'
                 */
                ToDoListComponent.prototype.getCursor = function (toDo) {
                    return toDo.editable ? 'text' : 'move';
                };
                /**
                 * Saves todo.
                 */
                ToDoListComponent.prototype.saveToDo = function (toDo) {
                    this.savePromise(toDo)
                        .then(function (saved) {
                        showToast('To-Do saved!!', 4000);
                        readjustPanels();
                    });
                };
                /**
                 * Returns a promise with the payload todo object
                 * prepared from input todo.
                 */
                ToDoListComponent.prototype.savePromise = function (toDo) {
                    var element = document.getElementById(toDo._id);
                    var toSave = new to_do_1.ToDo();
                    toSave.status = toDo.status;
                    if (toDo._id)
                        toSave.id = toDo._id;
                    delete toSave.deletable;
                    delete toSave.editable;
                    if (toDo.editable) {
                        toSave.title = element.querySelector(".title").innerHTML;
                        toSave.description = element.querySelector(".description").innerHTML;
                    }
                    return this.toDoListService.saveToDo(toSave);
                };
                /**
                 * Deletes todo, and updates both lists.
                 */
                ToDoListComponent.prototype.deleteToDo = function (toDo) {
                    var _this = this;
                    var toDelete = new to_do_1.ToDo();
                    toDelete.id = toDo._id;
                    this.toDoListService.deleteToDo(toDelete)
                        .then(function () {
                        showToast('To-Do deleted (forever!!)', 4000);
                        var element = document.getElementById(toDo._id + 'Card');
                        element.className += " scale-out";
                        setTimeout(function () {
                            if (toDo.status === INCOMPLETE)
                                _this.incomplete = _this.incomplete.filter(function (td) {
                                    return td._id !== toDo._id;
                                });
                            else
                                _this.complete = _this.complete.filter(function (td) {
                                    return td._id !== toDo._id;
                                });
                            readjustPanels();
                        }, 200);
                    });
                };
                /**
                 * Prevents default.
                 */
                ToDoListComponent.prototype.onDragOver = function (event) {
                    event.preventDefault();
                };
                /**
                 * Updates item being dragged.
                 */
                ToDoListComponent.prototype.onDrag = function (toDo) {
                    this.draggingToDo = toDo;
                };
                /**
                 * Checks if target list is different from source list.
                 * If this is the case, proceeds to save, and move todo
                 * to appropriate list.
                 */
                ToDoListComponent.prototype.onDrop = function (event) {
                    event.preventDefault();
                    var target = getTarget(event.screenX);
                    var source = this.getSource();
                    if (target !== source && target === 'rightBucket')
                        this.moveToComplete();
                    if (target !== source && target === 'leftBucket')
                        this.moveToIncomplete();
                };
                /**
                 * Gets the source list of item being dragged.
                 */
                ToDoListComponent.prototype.getSource = function () {
                    var _this = this;
                    var left = this.incomplete.filter(function (toDo) {
                        return _this.draggingToDo === toDo;
                    });
                    if (left.length != 0)
                        return 'leftBucket';
                    else
                        return 'rightBucket';
                };
                /**
                 * Saves item being dragged, and moves it to complete.
                 */
                ToDoListComponent.prototype.moveToComplete = function () {
                    var _this = this;
                    var self = this;
                    this.draggingToDo.status = COMPLETE;
                    this.savePromise(this.draggingToDo)
                        .then(function (saved) {
                        showToast('To-Do completed!!', 4000);
                        _this.incomplete = _this.incomplete.filter(function (td) {
                            return td._id !== _this.draggingToDo._id;
                        });
                        _this.draggingToDo.title = saved.title;
                        _this.draggingToDo.description = saved.description;
                        _this.complete.push(_this.draggingToDo);
                        readjustPanels();
                        setInlineEditor();
                    });
                };
                /**
                 * Saves item being dragged, and moves it to incomplete.
                 */
                ToDoListComponent.prototype.moveToIncomplete = function () {
                    var _this = this;
                    this.draggingToDo.status = INCOMPLETE;
                    this.savePromise(this.draggingToDo)
                        .then(function (saved) {
                        showToast('To-Do not completed!!', 4000);
                        _this.complete = _this.complete.filter(function (td) {
                            return td._id !== _this.draggingToDo._id;
                        });
                        _this.draggingToDo.title = saved.title;
                        _this.draggingToDo.description = saved.description;
                        _this.incomplete.push(_this.draggingToDo);
                        readjustPanels();
                        setInlineEditor();
                    });
                };
                /**
                 * Signs out user from the app.
                 */
                ToDoListComponent.prototype.signOut = function () {
                    this.toDoListService.signOut()
                        .then(function () { });
                    this.router.navigate(['/']);
                };
                ToDoListComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'to-do-list',
                        templateUrl: 'to-do-list.component.html',
                        styleUrls: ['to-do-list.component.css']
                    }), 
                    __metadata('design:paramtypes', [to_do_list_service_1.ToDoListService, router_1.Router])
                ], ToDoListComponent);
                return ToDoListComponent;
            }());
            exports_1("ToDoListComponent", ToDoListComponent);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tZG8tbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0by1kby1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBcUJNLFVBQVUsRUFDVixRQUFROzs7Ozs7Ozs7Ozs7Ozs7OztZQUZkLDhDQUE4QztZQUN4QyxVQUFVLEdBQUcsY0FBYyxDQUFDO1lBQzVCLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFZN0I7Z0JBRUMsMkJBQW9CLGVBQWdDLEVBQ3pDLE1BQWM7b0JBREwsb0JBQWUsR0FBZixlQUFlLENBQWlCO29CQUN6QyxXQUFNLEdBQU4sTUFBTSxDQUFRO2dCQUFFLENBQUM7Z0JBaUI1Qjs7O21CQUdHO2dCQUNILG9DQUFRLEdBQVI7b0JBQUEsaUJBaUNDO29CQS9CQSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO3lCQUMxQyxJQUFJLENBQUMsVUFBQyxRQUFnQjt3QkFDdEIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQzt3QkFDdEQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLENBQUEsQ0FBQzs0QkFDdkIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRO29DQUMxQixLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7Z0NBQ2hDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dDQUM3QixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzs0QkFDN0IsQ0FBQzs0QkFDRCxJQUFJLENBQUEsQ0FBQztnQ0FDSixRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQ0FDOUIsUUFBUSxDQUFDLENB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QixDQUFDO2dCQWhRRjtvQkFBQyxnQkFBUyxDQUFDO3dCQUNULFFBQVEsRUFBRSxZQUFZO3dCQUN0QixRQUFRLEVBQUUsWUFBWTt3QkFDdEIsV0FBVyxFQUFFLDJCQUEyQjt3QkFDeEMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7cUJBQ3hDLENBQUM7O3FDQUFBO2dCQTRQRix3QkFBQztZQUFELENBQUMsQUF2UEQsSUF1UEM7WUF2UEQsaURBdVBDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJkZWNsYXJlIGZ1bmN0aW9uIHNob3dNb2RhbCgpOnZvaWQ7XHJcbmRlY2xhcmUgZnVuY3Rpb24gc2hvd1RvYXN0KG1lc3NhZ2U6c3RyaW5nLCBkZWxheTpudW1iZXIpOnZvaWQ7XHJcbmRlY2xhcmUgZnVuY3Rpb24gc2V0SW5saW5lRWRpdG9yKCk6dm9pZDtcclxuZGVjbGFyZSBmdW5jdGlvbiBzZXRMaXN0QW5pbWF0aW9uKGVsOiBzdHJpbmcsIGxlZnQ6IGJvb2xlYW4pOnZvaWQ7XHJcbmRlY2xhcmUgZnVuY3Rpb24gc2V0RmFkZUluQW5pbWF0aW9uKGVsOiBzdHJpbmcpOnZvaWQ7XHJcbmRlY2xhcmUgZnVuY3Rpb24gcmVhZGp1c3RQYW5lbHMoKTogdm9pZDtcclxuZGVjbGFyZSBmdW5jdGlvbiBnZXRUYXJnZXQoeDogbnVtYmVyKTogc3RyaW5nO1xyXG5kZWNsYXJlIHZhciBNYXRoOiBhbnk7XHJcbmRlY2xhcmUgdmFyIGRvY3VtZW50OiBhbnk7XHJcbmRlY2xhcmUgdmFyIF9fbW9kdWxlTmFtZTogc3RyaW5nO1xyXG5cclxuaW1wb3J0IHsgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgVG9Eb0xpc3RTZXJ2aWNlIH0gZnJvbSAnLi90by1kby1saXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi90by1kbyc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgJ2FwcC9jb21tb25zLmpzJztcclxuXHJcbi8vIENvbnN0YW50cyByZXByZXNlbnRzIHRoZSBvbmx5IDIgdG9kbyBzdGF0ZXNcclxuY29uc3QgSU5DT01QTEVURSA9ICdub3RDb21wbGV0ZWQnO1xyXG5jb25zdCBDT01QTEVURSA9ICdjb21wbGV0ZWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQ6IF9fbW9kdWxlTmFtZSxcclxuICBzZWxlY3RvcjogJ3RvLWRvLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAndG8tZG8tbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJ3RvLWRvLWxpc3QuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IGNsYXNzIGZvciB0aGUgdG8tZG8gbGlzdCBwYWdlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRvRG9MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xyXG4gIFxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgdG9Eb0xpc3RTZXJ2aWNlOiBUb0RvTGlzdFNlcnZpY2UsXHJcblx0XHRcdFx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcil7fVxyXG5cdFxyXG5cdC8vIFJlcHJlc2VudHMgdGhlIGluY29tcGxldGUgdG9kb3NcclxuXHRpbmNvbXBsZXRlOiBUb0RvW107XHJcblx0XHJcblx0Ly8gUmVwcmVzZW50cyB0aGUgY29tcGxldGUgdG9kb3NcclxuXHRjb21wbGV0ZTogVG9Eb1tdO1xyXG5cdFxyXG5cdC8vIFJlcHJlc2VudHMgYSBibGFuayB0byBkbyB0byBhZGRcclxuXHRibGFua1RvRG86IFRvRG87XHJcblx0XHJcblx0Ly8gVG9kbyBiZWluZyBkcmFnZ2VkXHJcblx0ZHJhZ2dpbmdUb0RvOiBUb0RvO1xyXG5cdFxyXG5cdC8vIExvZ2dlZC1pbiB1c2VyXHJcblx0bG9nZ2VkSW5Vc2VyOiBhbnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWRzIHRvZG9zLCBzcGxpdHMgdGhlbXMgaW4gdHdvIGFjY29yZGluZyB0byBcclxuXHQgKiBzdGF0dXMuXHJcblx0ICovXHJcblx0bmdPbkluaXQoKTogdm9pZHtcclxuXHRcdFxyXG5cdFx0dGhpcy50b0RvTGlzdFNlcnZpY2UuZ2V0VG9Eb0xpc3QobnVsbCwgbnVsbClcclxuXHRcdFx0LnRoZW4oKHRvRG9MaXN0OiBUb0RvW10pID0+IHtcclxuXHRcdFx0XHR0aGlzLmxvZ2dlZEluVXNlciA9IHRoaXMudG9Eb0xpc3RTZXJ2aWNlLmxvZ2dlZEluVXNlcjtcclxuXHRcdFx0XHRmb3IgKHZhciBpIGluIHRvRG9MaXN0KXtcclxuXHRcdFx0XHRcdGlmICh0b0RvTGlzdFtpXS5hdXRob3IudXNlcm5hbWUgXHJcblx0XHRcdFx0XHRcdD09PSB0aGlzLmxvZ2dlZEluVXNlci51c2VybmFtZSl7XHJcblx0XHRcdFx0XHRcdHRvRG9MaXN0W2ldLmRlbGV0YWJsZSA9IHRydWU7XHJcblx0XHRcdFx0XHRcdHRvRG9MaXN0W2ldLmVkaXRhYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRcdHRvRG9MaXN0W2ldLmRlbGV0YWJsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHR0b0RvTGlzdFtpXS5lZGl0YWJsZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdFx0dGhpcy5pbmNvbXBsZXRlID0gdG9Eb0xpc3QuZmlsdGVyKGZ1bmN0aW9uICh0b0RvKXtcclxuXHRcdFx0XHRcdHJldHVybiB0b0RvLnN0YXR1cyA9PT0gSU5DT01QTEVURTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHR0aGlzLmNvbXBsZXRlID0gdG9Eb0xpc3QuZmlsdGVyKGZ1bmN0aW9uICh0b0RvKXtcclxuXHRcdFx0XHRcdHJldHVybiB0b0RvLnN0YXR1cyA9PT0gQ09NUExFVEU7XHJcblx0XHRcdFx0fSk7XHRcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHNldElubGluZUVkaXRvcigpO1xyXG5cdFx0XHRcdHNldExpc3RBbmltYXRpb24oJyNpbmNvbXBsZXRlTGlzdCcsIHRydWUpO1xyXG5cdFx0XHRcdHNldExpc3RBbmltYXRpb24oJyNjb21wbGV0ZUxpc3QnLCBmYWxzZSk7XHJcblx0XHRcdFx0c2V0RmFkZUluQW5pbWF0aW9uKCcjYWRkQnV0dG9uJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0c2hvd1RvYXN0KCdXZWxjb21lIGJhY2ssICcgKyB0aGlzLmxvZ2dlZEluVXNlci51c2VybmFtZSArICchIScgLCA0MDAwKTtcclxuXHRcdFx0XHRyZWFkanVzdFBhbmVscygpO1xyXG5cdFx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBuZXcgdG9kbywgYW5kIGFkZHMgaXQgdG8gdGhlIGluY29tcGxldGUgbGlzdC5cclxuXHQgKi9cclxuXHRhZGRUb0RvKCk6IHZvaWR7XHJcblx0XHRcdFx0XHJcblx0XHR0aGlzLmJsYW5rVG9EbyA9IG5ldyBUb0RvKCk7XHJcblx0XHR0aGlzLmJsYW5rVG9Eby50aXRsZSA9ICdFbnRlciBUaXRsZSc7XHJcblx0XHR0aGlzLmJsYW5rVG9Eby5zdGF0dXMgPSBJTkNPTVBMRVRFO1xyXG5cdFx0dGhpcy5ibGFua1RvRG8uZGVzY3JpcHRpb24gPSAnRW50ZXIgRGVzY3JpcHRpb24nO1xyXG5cdFx0XHRcdFxyXG5cdFx0dGhpcy50b0RvTGlzdFNlcnZpY2Uuc2F2ZVRvRG8odGhpcy5ibGFua1RvRG8pXHJcblx0XHRcdC50aGVuKCh0b0RvOiBUb0RvKSA9PiB7XHJcblx0XHRcdFx0dG9Eby5lZGl0YWJsZSA9IHRydWU7XHJcblx0XHRcdFx0dG9Eby5kZWxldGFibGUgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMuaW5jb21wbGV0ZS5wdXNoKHRvRG8pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHNldEZhZGVJbkFuaW1hdGlvbignIycgKyB0b0RvLl9pZCArICdDYXJkJylcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRzaG93VG9hc3QoJ1RvLURvIGFkZGVkISEnLCA0MDAwKTtcclxuXHRcdFx0XHRzZXRJbmxpbmVFZGl0b3IoKTtcclxuXHRcdFx0XHRyZWFkanVzdFBhbmVscygpO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmNvbXBsZXRlTGlzdCcpLnNjcm9sbEhlaWdodCk7XHJcblx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJzb3IgZm9yIHRoZSB0b2RvIGFjY29yZGluZyB0byB0aGUgdmFsdWVcclxuXHQgKiBvZiBmaWVsZCAnZWRpdGFibGUnXHJcblx0ICovXHJcblx0Z2V0Q3Vyc29yKHRvRG86IFRvRG8pOiBzdHJpbmd7XHJcblx0XHRyZXR1cm4gdG9Eby5lZGl0YWJsZT8gJ3RleHQnOiAnbW92ZSc7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFNhdmVzIHRvZG8uXHJcblx0ICovXHJcblx0c2F2ZVRvRG8odG9EbzogVG9Ebyk6IHZvaWR7XHJcblx0XHR0aGlzLnNhdmVQcm9taXNlKHRvRG8pXHJcblx0XHRcdC50aGVuKChzYXZlZDogVG9EbykgPT4ge1xyXG5cdFx0XHRcdHNob3dUb2FzdCgnVG8tRG8gc2F2ZWQhIScsIDQwMDApO1xyXG5cdFx0XHRcdHJlYWRqdXN0UGFuZWxzKCk7XHJcblx0XHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYSBwcm9taXNlIHdpdGggdGhlIHBheWxvYWQgdG9kbyBvYmplY3RcclxuXHQgKiBwcmVwYXJlZCBmcm9tIGlucHV0IHRvZG8uXHJcblx0ICovXHJcblx0c2F2ZVByb21pc2UodG9EbzogVG9Ebyk6IFByb21pc2U8VG9Ebz57XHJcblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRvRG8uX2lkKTtcclxuXHRcdHZhciB0b1NhdmUgPSBuZXcgVG9EbygpO1xyXG5cdFx0XHJcblx0XHR0b1NhdmUuc3RhdHVzID0gdG9Eby5zdGF0dXM7XHJcblx0XHRpZiAodG9Eby5faWQpXHJcblx0XHRcdHRvU2F2ZS5pZCA9IHRvRG8uX2lkO1xyXG5cdFx0ZGVsZXRlIHRvU2F2ZS5kZWxldGFibGU7XHJcblx0XHRkZWxldGUgdG9TYXZlLmVkaXRhYmxlO1xyXG5cdFx0aWYgKHRvRG8uZWRpdGFibGUpe1xyXG5cdFx0XHR0b1NhdmUudGl0bGUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGVcIikuaW5uZXJIVE1MO1xyXG5cdFx0XHR0b1NhdmUuZGVzY3JpcHRpb24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIikuaW5uZXJIVE1MO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGhpcy50b0RvTGlzdFNlcnZpY2Uuc2F2ZVRvRG8odG9TYXZlKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogRGVsZXRlcyB0b2RvLCBhbmQgdXBkYXRlcyBib3RoIGxpc3RzLlxyXG5cdCAqL1xyXG5cdGRlbGV0ZVRvRG8odG9EbzogVG9Ebyk6IHZvaWR7XHJcblx0XHR2YXIgdG9EZWxldGUgPSBuZXcgVG9EbygpO1xyXG5cdFx0dG9EZWxldGUuaWQgPSB0b0RvLl9pZDtcclxuXHRcdHRoaXMudG9Eb0xpc3RTZXJ2aWNlLmRlbGV0ZVRvRG8odG9EZWxldGUpXHJcblx0XHRcdC50aGVuKCgpID0+IHtcclxuXHRcdFx0XHRzaG93VG9hc3QoJ1RvLURvIGRlbGV0ZWQgKGZvcmV2ZXIhISknLCA0MDAwKTtcclxuXHRcdFx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRvRG8uX2lkICsgJ0NhcmQnKTtcclxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBzY2FsZS1vdXRcIjtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdGlmICh0b0RvLnN0YXR1cyA9PT0gSU5DT01QTEVURSlcclxuXHRcdFx0XHRcdFx0dGhpcy5pbmNvbXBsZXRlID0gdGhpcy5pbmNvbXBsZXRlLmZpbHRlcigodGQpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGQuX2lkICE9PSB0b0RvLl9pZDtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHRoaXMuY29tcGxldGUgPSB0aGlzLmNvbXBsZXRlLmZpbHRlcigodGQpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGQuX2lkICE9PSB0b0RvLl9pZDtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdHJlYWRqdXN0UGFuZWxzKCk7XHJcblx0XHRcdFx0fSwgMjAwKTtcclxuXHRcdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFByZXZlbnRzIGRlZmF1bHQuXHJcblx0ICovXHJcblx0b25EcmFnT3ZlcihldmVudDogYW55KTogdm9pZHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIGl0ZW0gYmVpbmcgZHJhZ2dlZC5cclxuXHQgKi9cclxuXHRvbkRyYWcodG9EbzogVG9Ebyk6IHZvaWR7XHJcblx0XHR0aGlzLmRyYWdnaW5nVG9EbyA9IHRvRG87XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0YXJnZXQgbGlzdCBpcyBkaWZmZXJlbnQgZnJvbSBzb3VyY2UgbGlzdC5cclxuXHQgKiBJZiB0aGlzIGlzIHRoZSBjYXNlLCBwcm9jZWVkcyB0byBzYXZlLCBhbmQgbW92ZSB0b2RvXHJcblx0ICogdG8gYXBwcm9wcmlhdGUgbGlzdC5cclxuXHQgKi9cclxuXHRvbkRyb3AoZXZlbnQ6IGFueSk6IHZvaWR7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHJcblx0XHR2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGV2ZW50LnNjcmVlblgpO1xyXG5cdFx0dmFyIHNvdXJjZSA9IHRoaXMuZ2V0U291cmNlKCk7XHJcblx0XHRcclxuXHRcdGlmICh0YXJnZXQgIT09IHNvdXJjZSAmJiB0YXJnZXQgPT09ICdyaWdodEJ1Y2tldCcpXHJcblx0XHRcdHRoaXMubW92ZVRvQ29tcGxldGUoKTtcclxuXHRcdGlmICh0YXJnZXQgIT09IHNvdXJjZSAmJiB0YXJnZXQgPT09ICdsZWZ0QnVja2V0JylcclxuXHRcdFx0dGhpcy5tb3ZlVG9JbmNvbXBsZXRlKCk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIHNvdXJjZSBsaXN0IG9mIGl0ZW0gYmVpbmcgZHJhZ2dlZC5cclxuXHQgKi9cclxuXHRnZXRTb3VyY2UoKTogc3RyaW5ne1xyXG5cdFx0dmFyIGxlZnQgPSB0aGlzLmluY29tcGxldGUuZmlsdGVyKCh0b0RvOiBUb0RvKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZHJhZ2dpbmdUb0RvID09PSB0b0RvO1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdGlmIChsZWZ0Lmxlbmd0aCAhPSAwKVxyXG5cdFx0XHRyZXR1cm4gJ2xlZnRCdWNrZXQnO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gJ3JpZ2h0QnVja2V0JztcclxuXHR9XHRcclxuXHRcclxuXHQvKipcclxuXHQgKiBTYXZlcyBpdGVtIGJlaW5nIGRyYWdnZWQsIGFuZCBtb3ZlcyBpdCB0byBjb21wbGV0ZS5cclxuXHQgKi9cclxuXHRtb3ZlVG9Db21wbGV0ZSgpOiB2b2lke1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dGhpcy5kcmFnZ2luZ1RvRG8uc3RhdHVzID0gQ09NUExFVEU7XHJcblx0XHR0aGlzLnNhdmVQcm9taXNlKHRoaXMuZHJhZ2dpbmdUb0RvKVxyXG5cdFx0XHQudGhlbigoc2F2ZWQ6IFRvRG8pID0+IHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRzaG93VG9hc3QoJ1RvLURvIGNvbXBsZXRlZCEhJywgNDAwMCk7XHJcblx0XHRcdFx0dGhpcy5pbmNvbXBsZXRlID0gdGhpcy5pbmNvbXBsZXRlLmZpbHRlcigodGQpID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRkLl9pZCAhPT0gdGhpcy5kcmFnZ2luZ1RvRG8uX2lkO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dGhpcy5kcmFnZ2luZ1RvRG8udGl0bGUgPSBzYXZlZC50aXRsZTtcclxuXHRcdFx0XHR0aGlzLmRyYWdnaW5nVG9Eby5kZXNjcmlwdGlvbiA9IHNhdmVkLmRlc2NyaXB0aW9uO1xyXG5cdFx0XHRcdHRoaXMuY29tcGxldGUucHVzaCh0aGlzLmRyYWdnaW5nVG9Ebyk7XHJcblx0XHRcdFx0cmVhZGp1c3RQYW5lbHMoKTtcclxuXHRcdFx0XHRzZXRJbmxpbmVFZGl0b3IoKTtcclxuXHRcdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTYXZlcyBpdGVtIGJlaW5nIGRyYWdnZWQsIGFuZCBtb3ZlcyBpdCB0byBpbmNvbXBsZXRlLlxyXG5cdCAqL1xyXG5cdG1vdmVUb0luY29tcGxldGUoKTogdm9pZHtcclxuXHRcdHRoaXMuZHJhZ2dpbmdUb0RvLnN0YXR1cyA9IElOQ09NUExFVEU7XHJcblx0XHR0aGlzLnNhdmVQcm9taXNlKHRoaXMuZHJhZ2dpbmdUb0RvKVxyXG5cdFx0XHQudGhlbigoc2F2ZWQ6IFRvRG8pID0+IHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRzaG93VG9hc3QoJ1RvLURvIG5vdCBjb21wbGV0ZWQhIScsIDQwMDApO1xyXG5cdFx0XHRcdHRoaXMuY29tcGxldGUgPSB0aGlzLmNvbXBsZXRlLmZpbHRlcigodGQpID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRkLl9pZCAhPT0gdGhpcy5kcmFnZ2luZ1RvRG8uX2lkO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR0aGlzLmRyYWdnaW5nVG9Eby50aXRsZSA9IHNhdmVkLnRpdGxlO1xyXG5cdFx0XHRcdHRoaXMuZHJhZ2dpbmdUb0RvLmRlc2NyaXB0aW9uID0gc2F2ZWQuZGVzY3JpcHRpb247XHJcblx0XHRcdFx0dGhpcy5pbmNvbXBsZXRlLnB1c2godGhpcy5kcmFnZ2luZ1RvRG8pO1xyXG5cdFx0XHRcdHJlYWRqdXN0UGFuZWxzKCk7XHJcblx0XHRcdFx0c2V0SW5saW5lRWRpdG9yKCk7XHJcblx0XHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBTaWducyBvdXQgdXNlciBmcm9tIHRoZSBhcHAuXHJcblx0ICovXHJcblx0c2lnbk91dCgpOiB2b2lke1xyXG5cdFx0dGhpcy50b0RvTGlzdFNlcnZpY2Uuc2lnbk91dCgpXHJcblx0XHRcdC50aGVuKCgpID0+IHt9KTtcclxuXHRcdHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddKTtcclxuXHR9XHJcbn0iXX0=