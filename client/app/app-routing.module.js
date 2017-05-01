System.register(['@angular/core', '@angular/router', './to-do-list.component', './login.component'], function(exports_1, context_1) {
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
    var core_1, router_1, to_do_list_component_1, login_component_1;
    var routes, AppRoutingModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (to_do_list_component_1_1) {
                to_do_list_component_1 = to_do_list_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            // To Do List App's routes.
            routes = [
                { path: 'toDoList', component: to_do_list_component_1.ToDoListComponent },
                { path: '', component: login_component_1.LoginComponent }
            ];
            AppRoutingModule = (function () {
                function AppRoutingModule() {
                }
                AppRoutingModule = __decorate([
                    core_1.NgModule({
                        imports: [router_1.RouterModule.forRoot(routes)],
                        exports: [router_1.RouterModule]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppRoutingModule);
                return AppRoutingModule;
            }());
            exports_1("AppRoutingModule", AppRoutingModule);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFNTSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7O1lBRFosMkJBQTJCO1lBQ3JCLE1BQU0sR0FBVztnQkFDckIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFHLFNBQVMsRUFBRSx3Q0FBaUIsRUFBQztnQkFDbEQsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFHLFNBQVMsRUFBRSxnQ0FBYyxFQUFDO2FBQ3hDLENBQUM7WUFTRjtnQkFBQTtnQkFBK0IsQ0FBQztnQkFSaEM7b0JBQUMsZUFBUSxDQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFFLHFCQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFFO3dCQUN6QyxPQUFPLEVBQUUsQ0FBRSxxQkFBWSxDQUFFO3FCQUMxQixDQUFDOztvQ0FBQTtnQkFLNkIsdUJBQUM7WUFBRCxDQUFDLEFBQWhDLElBQWdDO1lBQWhDLCtDQUFnQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlLCBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBUb0RvTGlzdENvbXBvbmVudCB9ICAgZnJvbSAnLi90by1kby1saXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi5jb21wb25lbnQnO1xyXG5cclxuLy8gVG8gRG8gTGlzdCBBcHAncyByb3V0ZXMuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHsgcGF0aDogJ3RvRG9MaXN0JywgIGNvbXBvbmVudDogVG9Eb0xpc3RDb21wb25lbnR9LFxyXG4gIHsgcGF0aDogJycsICBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50fVxyXG5dO1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFsgUm91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKSBdLFxyXG4gIGV4cG9ydHM6IFsgUm91dGVyTW9kdWxlIF1cclxufSlcclxuXHJcbi8qKlxyXG4gKiBSb3V0aW5nIG1vZHVsZSBjbGFzcyBmb3IgdGhlIFRvIERvIExpc3QgQXBwLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUge31cclxuIl19