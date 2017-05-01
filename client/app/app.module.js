System.register(['@angular/core', '@angular/platform-browser', '@angular/http', './app.component', './to-do-list.service', './to-do-list.component', './login.component', './app-routing.module', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, platform_browser_1, http_1, app_component_1, to_do_list_service_1, to_do_list_component_1, login_component_1, app_routing_module_1, forms_1;
    var AppModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (to_do_list_service_1_1) {
                to_do_list_service_1 = to_do_list_service_1_1;
            },
            function (to_do_list_component_1_1) {
                to_do_list_component_1 = to_do_list_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (app_routing_module_1_1) {
                app_routing_module_1 = app_routing_module_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            //Imports modules, components, services and the bootstrap component
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            http_1.HttpModule,
                            app_routing_module_1.AppRoutingModule,
                            forms_1.FormsModule,
                        ],
                        declarations: [
                            app_component_1.AppComponent,
                            to_do_list_component_1.ToDoListComponent,
                            login_component_1.LoginComponent
                        ],
                        providers: [
                            to_do_list_service_1.ToDoListService
                        ],
                        bootstrap: [app_component_1.AppComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_1("AppModule", AppModule);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQSxtRUFBbUU7WUFrQm5FO2dCQUFBO2dCQUF5QixDQUFDO2dCQWpCMUI7b0JBQUMsZUFBUSxDQUFDO3dCQUNSLE9BQU8sRUFBTzs0QkFDWixnQ0FBYTs0QkFDYixpQkFBVTs0QkFDVixxQ0FBZ0I7NEJBQ25CLG1CQUFXO3lCQUNUO3dCQUNELFlBQVksRUFBRTs0QkFDWiw0QkFBWTs0QkFDWix3Q0FBaUI7NEJBQ3BCLGdDQUFjO3lCQUNaO3dCQUNELFNBQVMsRUFBRTs0QkFDVCxvQ0FBZTt5QkFDaEI7d0JBQ0QsU0FBUyxFQUFFLENBQUUsNEJBQVksQ0FBRTtxQkFDNUIsQ0FBQzs7NkJBQUE7Z0JBQ3VCLGdCQUFDO1lBQUQsQ0FBQyxBQUExQixJQUEwQjtZQUExQixpQ0FBMEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9ICBmcm9tICcuL2FwcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9Eb0xpc3RTZXJ2aWNlIH0gZnJvbSAnLi90by1kby1saXN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVG9Eb0xpc3RDb21wb25lbnQgfSBmcm9tICcuL3RvLWRvLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dpbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL2FwcC1yb3V0aW5nLm1vZHVsZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9ICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vL0ltcG9ydHMgbW9kdWxlcywgY29tcG9uZW50cywgc2VydmljZXMgYW5kIHRoZSBib290c3RyYXAgY29tcG9uZW50XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiAgICAgIFtcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEh0dHBNb2R1bGUsXG4gICAgQXBwUm91dGluZ01vZHVsZSxcblx0Rm9ybXNNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICBUb0RvTGlzdENvbXBvbmVudCxcblx0TG9naW5Db21wb25lbnRcdFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBUb0RvTGlzdFNlcnZpY2VcbiAgXSxcbiAgYm9vdHN0cmFwOiBbIEFwcENvbXBvbmVudCBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==