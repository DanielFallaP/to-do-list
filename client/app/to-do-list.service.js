System.register(['@angular/core', 'rxjs/add/operator/toPromise', '@angular/http', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, http_1, router_1;
    var ToDoListService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            /**
             * Service class handling all communication with the API.
             */
            ToDoListService = (function () {
                function ToDoListService(http, router) {
                    this.http = http;
                    this.router = router;
                }
                /**
                 * Gets the todos by paging if appropriate parameters are present.
                 */
                ToDoListService.prototype.getToDoList = function (skip, limit) {
                    var params = new http_1.URLSearchParams();
                    params.set('sessionId', this.sessionId);
                    var paramsReq = {};
                    if (skip != null && limit != null) {
                        params.set('skip', skip.toString());
                        params.set('limit', limit.toString());
                    }
                    return this.http.get('todos', { search: params })
                        .toPromise()
                        .then(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                /**
                 * Signs into the app.
                 */
                ToDoListService.prototype.signIn = function (user) {
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    this.loggedInUser = {};
                    this.loggedInUser.username = user.username;
                    return this.http.post('user/auth', user, options)
                        .toPromise()
                        .catch(this.handleError);
                };
                /**
                 * Creates/updates todo in DB.
                 */
                ToDoListService.prototype.saveToDo = function (toDo) {
                    var _this = this;
                    var params = new http_1.URLSearchParams();
                    params.set('sessionId', this.sessionId);
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers, search: params });
                    return this.http.put('todo', toDo, options)
                        .toPromise()
                        .then(function (res) {
                        var newToDo = res.json().data;
                        if (!toDo.author || !toDo.author.username)
                            newToDo.author = _this.loggedInUser;
                        return newToDo;
                    })
                        .catch(this.handleError);
                };
                /**
                 * Deletes todo in DB.
                 */
                ToDoListService.prototype.deleteToDo = function (toDo) {
                    var params = new http_1.URLSearchParams();
                    params.set('sessionId', this.sessionId);
                    var headers = new http_1.Headers({
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers, search: params, body: toDo });
                    return this.http.delete('todo', options)
                        .toPromise()
                        .then(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                /**
                 * Signs out user from the app.
                 */
                ToDoListService.prototype.signOut = function () {
                    var params = new http_1.URLSearchParams();
                    params.set('sessionId', this.sessionId);
                    return this.http.get('user/logout', { search: params })
                        .toPromise()
                        .catch(this.handleError);
                };
                /**
                 * Handles server error.
                 */
                ToDoListService.prototype.handleError = function (error) {
                    return Promise.reject(error.error || error);
                };
                ToDoListService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], ToDoListService);
                return ToDoListService;
            }());
            exports_1("ToDoListService", ToDoListService);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG8tZG8tbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG8tZG8tbGlzdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVFBOztlQUVHO1lBRUg7Z0JBQ0MseUJBQW9CLElBQVMsRUFDcEIsTUFBYztvQkFESCxTQUFJLEdBQUosSUFBSSxDQUFLO29CQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFRO2dCQUFFLENBQUM7Z0JBVzFCOzttQkFFRztnQkFDSCxxQ0FBVyxHQUFYLFVBQVksSUFBWSxFQUFFLEtBQWE7b0JBQ3RDLElBQUksTUFBTSxHQUFvQixJQUFJLHNCQUFlLEVBQUUsQ0FBQztvQkFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7d0JBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDdkMsQ0FBQztvQkFFSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDO3lCQUNyRCxTQUFTLEVBQUU7eUJBQ1gsSUFBSSxDQUFDLFVBQUMsR0FBYSxJQUFLLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLElBQWMsRUFBekIsQ0FBeUIsQ0FBQzt5QkFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDeEIsQ0FBQztnQkFFSjs7bUJBRUc7Z0JBQ0gsZ0NBQU0sR0FBTixVQUFPLElBQVU7b0JBQ2hCLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDO3dCQUN6QixjQUFjLEVBQUUsa0JBQWtCO3dCQUNsQyxRQUFRLEVBQUUsa0JBQWtCO3FCQUM1QixDQUFDLENBQUM7b0JBQ0gsSUFBSSxPQUFPLEdBQUcsSUFBSSxxQkFBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7eUJBQy9DLFNBQVMsRUFBRTt5QkFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2dCQUVEOzttQkFFRztnQkFDSCxrQ0FBUSxHQUFSLFVBQVMsSUFBVTtvQkFBbkIsaUJBb0JDO29CQW5CQSxJQUFJLE1BQU0sR0FBb0IsSUFBSSxzQkFBZSxFQUFFLENBQUM7b0JBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFeEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLENBQUM7d0JBQ3pCLGNBQWMsRUFBRSxrQkFBa0I7d0JBQ2xDLFFBQVEsRUFBRSxrQkFBa0I7cUJBQzVCLENBQUMsQ0FBQztvQkFFSCxJQUFJLE9BQU8sR0FBRyxJQUFJLHFCQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUV2RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUM7eUJBQ3pDLFNBQVMsRUFBRTt5QkFDWCxJQUFJLENBQUMsVUFBQyxHQUFhO3dCQUNuQixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDO3dCQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs0QkFDekMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO3dCQUNwQyxNQUFNLENBQUMsT0FBZSxDQUFDO29CQUN4QixDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0gsb0NBQVUsR0FBVixVQUFXLElBQVU7b0JBQ3BCLElBQUksTUFBTSxHQUFvQixJQUFJLHNCQUFlLEVBQUUsQ0FBQztvQkFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUV4QyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQzt3QkFDekIsY0FBYyxFQUFFLGtCQUFrQjt3QkFDbEMsUUFBUSxFQUFFLGtCQUFrQjtxQkFDNUIsQ0FBQyxDQUFDO29CQUVILElBQUksT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFFbkYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7eUJBQ3RDLFNBQVMsRUFBRTt5QkFDWCxJQUFJLENBQUMsVUFBQyxHQUFhLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBWSxFQUF2QixDQUF1QixDQUFDO3lCQUNoRCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2dCQUdEOzttQkFFRztnQkFDSCxpQ0FBTyxHQUFQO29CQUNDLElBQUksTUFBTSxHQUFvQixJQUFJLHNCQUFlLEVBQUUsQ0FBQztvQkFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUV4QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDO3lCQUNyRCxTQUFTLEVBQUU7eUJBQ1gsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0sscUNBQVcsR0FBbkIsVUFBb0IsS0FBVTtvQkFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQztnQkFDN0MsQ0FBQztnQkEvR0Y7b0JBQUMsaUJBQVUsRUFBRTs7bUNBQUE7Z0JBaUhiLHNCQUFDO1lBQUQsQ0FBQyxBQWhIRCxJQWdIQztZQWhIRCw2Q0FnSEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi90by1kbyc7XHJcbmltcG9ydCB7IEhlYWRlcnMsIEh0dHAsIFJlc3BvbnNlLCBSZXF1ZXN0T3B0aW9ucywgVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL1J4JztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vdXNlcic7XHJcblxyXG4vKipcclxuICogU2VydmljZSBjbGFzcyBoYW5kbGluZyBhbGwgY29tbXVuaWNhdGlvbiB3aXRoIHRoZSBBUEkuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBUb0RvTGlzdFNlcnZpY2V7XHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHAsXHJcblx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyKXt9XHJcblx0XHJcblx0Ly8gTG9nZ2VkIGluIHVzZXIgc2Vzc2lvbiBJZFxyXG5cdHNlc3Npb25JZDogc3RyaW5nO1xyXG5cdFxyXG5cdC8vIEFycmF5IG9mIGxvYWRlZCB0b2Rvc1xyXG5cdHRvZG9zOiBUb0RvW107XHJcblx0XHJcblx0Ly8gVXNlciBjdXJyZW50bHkgaW4gc2Vzc2lvblxyXG5cdGxvZ2dlZEluVXNlcjogYW55O1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIHRvZG9zIGJ5IHBhZ2luZyBpZiBhcHByb3ByaWF0ZSBwYXJhbWV0ZXJzIGFyZSBwcmVzZW50LlxyXG5cdCAqL1xyXG5cdGdldFRvRG9MaXN0KHNraXA6IG51bWJlciwgbGltaXQ6IG51bWJlcikgOiBQcm9taXNlPFRvRG9bXT4ge1xyXG5cdFx0bGV0IHBhcmFtczogVVJMU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cdFx0cGFyYW1zLnNldCgnc2Vzc2lvbklkJywgdGhpcy5zZXNzaW9uSWQpO1xyXG5cdFx0dmFyIHBhcmFtc1JlcSA9IHt9O1xyXG5cdFx0aWYgKHNraXAgIT0gbnVsbCAmJiBsaW1pdCAhPSBudWxsKXtcclxuXHRcdFx0cGFyYW1zLnNldCgnc2tpcCcsIHNraXAudG9TdHJpbmcoKSk7XHJcblx0XHRcdHBhcmFtcy5zZXQoJ2xpbWl0JywgbGltaXQudG9TdHJpbmcoKSk7XHJcblx0XHR9XHJcblx0XHRcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCgndG9kb3MnLCB7IHNlYXJjaDogcGFyYW1zIH0pXHJcblx0XHRcdC50b1Byb21pc2UoKVxyXG5cdFx0XHQudGhlbigocmVzOiBSZXNwb25zZSkgPT4gcmVzLmpzb24oKS5kYXRhIGFzIFRvRG9bXSlcclxuXHRcdFx0LmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG4gICAgfVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFNpZ25zIGludG8gdGhlIGFwcC5cclxuXHQgKi9cclxuXHRzaWduSW4odXNlcjogVXNlcikgOiBQcm9taXNlPGFueT4ge1xyXG5cdFx0bGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IFxyXG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG5cdFx0XHQnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0XHR9KTsgXHJcblx0XHRsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcblx0XHR0aGlzLmxvZ2dlZEluVXNlciA9IHt9O1xyXG5cdFx0dGhpcy5sb2dnZWRJblVzZXIudXNlcm5hbWUgPSB1c2VyLnVzZXJuYW1lO1xyXG5cdFx0cmV0dXJuIHRoaXMuaHR0cC5wb3N0KCd1c2VyL2F1dGgnLCB1c2VyLCBvcHRpb25zKVxyXG5cdFx0XHQudG9Qcm9taXNlKClcclxuXHRcdFx0LmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQgKiBDcmVhdGVzL3VwZGF0ZXMgdG9kbyBpbiBEQi5cclxuXHQgKi8gXHJcblx0c2F2ZVRvRG8odG9EbzogVG9EbykgOiBQcm9taXNlPFRvRG8+IHtcclxuXHRcdGxldCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHRcdHBhcmFtcy5zZXQoJ3Nlc3Npb25JZCcsIHRoaXMuc2Vzc2lvbklkKTtcclxuXHRcdFxyXG5cdFx0bGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7IFxyXG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG5cdFx0XHQnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0bGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzLCBzZWFyY2g6IHBhcmFtcyB9KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5odHRwLnB1dCgndG9kbycsIHRvRG8sIG9wdGlvbnMpXHJcblx0XHRcdC50b1Byb21pc2UoKVxyXG5cdFx0XHQudGhlbigocmVzOiBSZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdHZhciBuZXdUb0RvID0gcmVzLmpzb24oKS5kYXRhO1xyXG5cdFx0XHRcdGlmICghdG9Eby5hdXRob3IgfHwgIXRvRG8uYXV0aG9yLnVzZXJuYW1lKVxyXG5cdFx0XHRcdFx0bmV3VG9Eby5hdXRob3IgPSB0aGlzLmxvZ2dlZEluVXNlcjtcclxuXHRcdFx0XHRyZXR1cm4gbmV3VG9EbyBhcyBUb0RvO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIERlbGV0ZXMgdG9kbyBpbiBEQi5cclxuXHQgKi9cclxuXHRkZWxldGVUb0RvKHRvRG86IFRvRG8pIDogUHJvbWlzZTxUb0RvPiB7XHJcblx0XHRsZXQgcGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcblx0XHRwYXJhbXMuc2V0KCdzZXNzaW9uSWQnLCB0aGlzLnNlc3Npb25JZCk7XHJcblx0XHRcclxuXHRcdGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyBcclxuXHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuXHRcdFx0J0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycywgc2VhcmNoOiBwYXJhbXMsIGJvZHk6IHRvRG8gfSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoJ3RvZG8nLCBvcHRpb25zKVxyXG5cdFx0XHQudG9Qcm9taXNlKClcclxuXHRcdFx0LnRoZW4oKHJlczogUmVzcG9uc2UpID0+IHJlcy5qc29uKCkuZGF0YSBhcyBUb0RvKVxyXG5cdFx0XHQuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFNpZ25zIG91dCB1c2VyIGZyb20gdGhlIGFwcC5cclxuXHQgKi9cclxuXHRzaWduT3V0KCk6IFByb21pc2U8YW55PiB7XHJcblx0XHRsZXQgcGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcblx0XHRwYXJhbXMuc2V0KCdzZXNzaW9uSWQnLCB0aGlzLnNlc3Npb25JZCk7XHJcblx0XHRcclxuXHRcdHJldHVybiB0aGlzLmh0dHAuZ2V0KCd1c2VyL2xvZ291dCcsIHsgc2VhcmNoOiBwYXJhbXMgfSlcclxuXHRcdFx0LnRvUHJvbWlzZSgpXHJcblx0XHRcdC5jYXRjaCh0aGlzLmhhbmRsZUVycm9yKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBzZXJ2ZXIgZXJyb3IuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+e1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLmVycm9yIHx8IGVycm9yKTtcclxuXHR9XHJcblx0XHJcbn0iXX0=