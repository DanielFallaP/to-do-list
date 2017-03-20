"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var to_do_list_service_1 = require('./to-do-list.service');
var to_do_1 = require('./to-do');
var router_1 = require('@angular/router');
require('app/commons.js');
var INCOMPLETE = 'notCompleted';
var COMPLETE = 'completed';
var ToDoListComponent = (function () {
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
            showToast('To-dos loaded!!', 4000);
            //readjustPanels();
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
            _this.incomplete.push(toDo);
            setFadeInAnimation('#' + toDo._id + 'Card');
            showToast('To-Do added!!', 4000);
            setInlineEditor();
            //readjustPanels();
        });
    };
    ToDoListComponent.prototype.saveToDo = function (toDo) {
        this.savePromise(toDo)
            .then(function (saved) {
            toDo.author = saved.author;
            showToast('To-Do saved!!', 4000);
            //readjustPanels();
        });
    };
    ToDoListComponent.prototype.savePromise = function (toDo) {
        var element = document.getElementById(toDo._id);
        var toSave = new to_do_1.ToDo();
        toSave.status = toDo.status;
        if (toDo._id)
            toSave.id = toDo._id;
        toSave.title = element.querySelector(".title").innerHTML;
        toSave.description = element.querySelector(".description").innerHTML;
        return this.toDoListService.saveToDo(toSave);
    };
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
                //readjustPanels();
            }, 200);
        });
    };
    ToDoListComponent.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    ToDoListComponent.prototype.onDrag = function (toDo) {
        this.draggingToDo = toDo;
    };
    ToDoListComponent.prototype.onDropComplete = function (event) {
        var _this = this;
        event.preventDefault();
        var self = this;
        this.draggingToDo.status = COMPLETE;
        this.savePromise(this.draggingToDo)
            .then(function (saved) {
            showToast('To-Do completed!!', 4000);
            _this.incomplete = _this.incomplete.filter(function (td) {
                return td._id !== _this.draggingToDo._id;
            });
            _this.complete.push(_this.draggingToDo);
            //readjustPanels();
        });
    };
    ToDoListComponent.prototype.onDropIncomplete = function (event) {
        var _this = this;
        event.preventDefault();
        this.draggingToDo.status = INCOMPLETE;
        this.savePromise(this.draggingToDo)
            .then(function (saved) {
            showToast('To-Do not completed!!', 4000);
            _this.complete = _this.complete.filter(function (td) {
                return td._id !== _this.draggingToDo._id;
            });
            _this.incomplete.push(_this.draggingToDo);
            //readjustPanels();
        });
    };
    /**
     * Signs out from the app.
     */
    ToDoListComponent.prototype.signOut = function () {
        this.toDoListService.signOut()
            .then(function () { });
        this.router.navigate(['/']);
    };
    ToDoListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'to-do-list',
            templateUrl: 'to-do-list.component.html',
            styleUrls: ['to-do-list.component.css']
        }), 
        __metadata('design:paramtypes', [to_do_list_service_1.ToDoListService, router_1.Router])
    ], ToDoListComponent);
    return ToDoListComponent;
}());
exports.ToDoListComponent = ToDoListComponent;
//# sourceMappingURL=to-do-list.component.js.map