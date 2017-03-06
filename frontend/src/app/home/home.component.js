"use strict";
var core_1 = require('@angular/core');
var app_service_1 = require('../app.service');
var title_1 = require('./title');
var HomeComponent = (function () {
    // TypeScript public modifiers
    function HomeComponent(appState, title) {
        this.appState = appState;
        this.title = title;
        // Set our default values
        this.localState = {value: ''};
    }

    HomeComponent.prototype.ngOnInit = function () {
        console.log('hello `Home` component');
        // this.title.getData().subscribe(data => this.data = data);
    };
    HomeComponent.prototype.submitState = function (value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    };
    HomeComponent = __decorate([
        core_1.Component({
            // The selector is what angular internally uses
            // for `document.querySelectorAll(selector)` in our index.html
            // where, in this case, selector is the string 'home'
            selector: 'home',
            // We need to tell Angular's Dependency Injection which providers are in our app.
            providers: [
                title_1.Title
            ],
            // Our list of styles in our component. We may add more to compose many styles together
            styleUrls: ['./home.component.css'],
            // Every Angular template is first compiled by the browser before Angular runs it's compiler
            templateUrl: './home.component.html'
        }),
        __metadata('design:paramtypes', [app_service_1.AppState, title_1.Title])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map