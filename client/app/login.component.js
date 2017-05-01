System.register(['@angular/core', './to-do-list.service', './user', '@angular/http', '@angular/router', 'app/commons.js'], function(exports_1, context_1) {
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
    var core_1, to_do_list_service_1, user_1, http_1, router_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (to_do_list_service_1_1) {
                to_do_list_service_1 = to_do_list_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (_1) {}],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(toDoListService, http, router, ref) {
                    this.toDoListService = toDoListService;
                    this.http = http;
                    this.router = router;
                    this.ref = ref;
                }
                /**
                 * Starts component with predefined credentials.
                 */
                LoginComponent.prototype.ngOnInit = function () {
                    this.user = new user_1.User();
                    this.user.username = 'harry';
                    this.user.password = '5f4dcc3b5aa765d61d8327deb882cf99';
                    setFadeInAnimation('#loginForm');
                };
                ;
                /**
                 * Signs into the todo list page with current user info.
                 */
                LoginComponent.prototype.signIn = function (user) {
                    var _this = this;
                    this.toDoListService.signIn(user)
                        .then(function (res) {
                        _this.toDoListService.sessionId = res.json().sessionId;
                        if (res.json().sessionId) {
                            var author = {};
                            _this.ref.tick();
                            _this.router.navigate(['/toDoList']);
                        }
                        else {
                            showToast('Wrong credentials. Please try again', 3000);
                        }
                    })
                        .catch(this.handleError);
                };
                ;
                /**
                 * Handles server error
                 */
                LoginComponent.prototype.handleError = function (error) {
                    showToast('Something went wrong. Please try again later', 3000);
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        moduleId: __moduleName,
                        selector: 'login',
                        templateUrl: 'login.component.html',
                    }), 
                    __metadata('design:paramtypes', [to_do_list_service_1.ToDoListService, http_1.Http, router_1.Router, core_1.ApplicationRef])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXVCQTtnQkFFRSx3QkFBcUIsZUFBZ0MsRUFDM0MsSUFBUyxFQUNULE1BQWMsRUFDZCxHQUFtQjtvQkFIUixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7b0JBQzNDLFNBQUksR0FBSixJQUFJLENBQUs7b0JBQ1QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtvQkFDZCxRQUFHLEdBQUgsR0FBRyxDQUFnQjtnQkFBRSxDQUFDO2dCQUtoQzs7bUJBRUc7Z0JBQ0gsaUNBQVEsR0FBUjtvQkFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztvQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsa0NBQWtDLENBQUE7b0JBQ3ZELGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoQyxDQUFDOztnQkFFRDs7bUJBRUc7Z0JBQ0gsK0JBQU0sR0FBTixVQUFPLElBQVU7b0JBQWpCLGlCQWdCQztvQkFmRixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7eUJBQy9CLElBQUksQ0FBQyxVQUFDLEdBQWE7d0JBQ2xCLEtBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ3ZELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDOzRCQUN6QixJQUFJLE1BQU0sR0FBUSxFQUNqQixDQUFDOzRCQUNGLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ2hCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFFckMsQ0FBQzt3QkFDRCxJQUFJLENBQUEsQ0FBQzs0QkFDSixTQUFTLENBQUMscUNBQXFDLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ3hELENBQUM7b0JBQ0YsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7O2dCQUVEOzttQkFFRztnQkFDSyxvQ0FBVyxHQUFuQixVQUFvQixLQUFVO29CQUMvQixTQUFTLENBQUMsOENBQThDLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQzlELENBQUM7Z0JBdkRIO29CQUFDLGdCQUFTLENBQUM7d0JBQ1QsUUFBUSxFQUFFLFlBQVk7d0JBQ3RCLFFBQVEsRUFBRSxPQUFPO3dCQUNqQixXQUFXLEVBQUUsc0JBQXNCO3FCQUNwQyxDQUFDOztrQ0FBQTtnQkFvREYscUJBQUM7WUFBRCxDQUFDLEFBL0NELElBK0NDO1lBL0NELDJDQStDQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBmdW5jdGlvbiBzaG93VG9hc3QobWVzc2FnZTogc3RyaW5nLCBkZWxheTogbnVtYmVyKTogdm9pZDtcclxuZGVjbGFyZSBmdW5jdGlvbiBzZXRGYWRlSW5BbmltYXRpb24oZWw6IHN0cmluZyk6dm9pZDtcclxuXHJcbmltcG9ydCB7IE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEFwcGxpY2F0aW9uUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRvRG9MaXN0U2VydmljZSB9IGZyb20gJy4vdG8tZG8tbGlzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XHJcbmltcG9ydCB7IFRvRG8gfSBmcm9tICcuL3RvLWRvJztcclxuaW1wb3J0IHsgSGVhZGVycywgSHR0cCwgUmVxdWVzdE9wdGlvbnMsIFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgJ2FwcC9jb21tb25zLmpzJ1xyXG5kZWNsYXJlIHZhciBfX21vZHVsZU5hbWU6IHN0cmluZztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBfX21vZHVsZU5hbWUsXHJcbiAgc2VsZWN0b3I6ICdsb2dpbicsXHJcbiAgdGVtcGxhdGVVcmw6ICdsb2dpbi5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcblxyXG4vKipcclxuICogQ29tcG9uZW50IGNsYXNzIGZvciB0aGUgbG9nIGluIHBhZ2UuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IgKHByaXZhdGUgdG9Eb0xpc3RTZXJ2aWNlOiBUb0RvTGlzdFNlcnZpY2UsXHJcblx0XHRcdFx0cHJpdmF0ZSBodHRwOkh0dHAsXHJcblx0XHRcdFx0cHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuXHRcdFx0XHRwcml2YXRlIHJlZjogQXBwbGljYXRpb25SZWYpe31cclxuICBcclxuICAvL1JlcHJlc2VudHMgdGhlIHVzZXIgdHlwaW5nIG9uIHRoZSBzaWduIGluIGZvcm1cclxuICB1c2VyOiBVc2VyO1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBjb21wb25lbnQgd2l0aCBwcmVkZWZpbmVkIGNyZWRlbnRpYWxzLlxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWR7XHJcblx0dGhpcy51c2VyID0gbmV3IFVzZXIoKTtcclxuXHR0aGlzLnVzZXIudXNlcm5hbWUgPSAnaGFycnknO1xyXG5cdHRoaXMudXNlci5wYXNzd29yZCA9ICc1ZjRkY2MzYjVhYTc2NWQ2MWQ4MzI3ZGViODgyY2Y5OSdcclxuXHRzZXRGYWRlSW5BbmltYXRpb24oJyNsb2dpbkZvcm0nKTtcclxuICB9O1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIFNpZ25zIGludG8gdGhlIHRvZG8gbGlzdCBwYWdlIHdpdGggY3VycmVudCB1c2VyIGluZm8uXHJcbiAgICovXHJcbiAgc2lnbkluKHVzZXI6IFVzZXIpOiB2b2lke1xyXG5cdHRoaXMudG9Eb0xpc3RTZXJ2aWNlLnNpZ25Jbih1c2VyKVxyXG5cdFx0LnRoZW4oKHJlczogUmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHR0aGlzLnRvRG9MaXN0U2VydmljZS5zZXNzaW9uSWQgPSByZXMuanNvbigpLnNlc3Npb25JZDtcclxuXHRcdFx0aWYgKHJlcy5qc29uKCkuc2Vzc2lvbklkKXtcclxuXHRcdFx0XHR2YXIgYXV0aG9yOiBhbnkgPSB7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR0aGlzLnJlZi50aWNrKCk7XHJcblx0XHRcdFx0dGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdG9Eb0xpc3QnXSk7XHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2V7XHJcblx0XHRcdFx0c2hvd1RvYXN0KCdXcm9uZyBjcmVkZW50aWFscy4gUGxlYXNlIHRyeSBhZ2FpbicsIDMwMDApO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0LmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gIH07XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlcyBzZXJ2ZXIgZXJyb3JcclxuICAgKi9cclxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiB2b2lke1xyXG5cdHNob3dUb2FzdCgnU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInLCAzMDAwKVxyXG4gIH1cclxufSJdfQ==