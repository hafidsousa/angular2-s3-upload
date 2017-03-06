"use strict";
var router_1 = require('@angular/router');
var testing_1 = require('@angular/core/testing');
// Load the implementations that should be tested
var about_component_1 = require('./about.component');
describe('About', function () {
    // provide our implementations or mocks to the dependency injector
    beforeEach(function () {
        return testing_1.TestBed.configureTestingModule({
            providers: [
                // provide a better mock
                {
                    provide: router_1.ActivatedRoute,
                    useValue: {
                        data: {
                            subscribe: function (fn) {
                                return fn({
                                    yourData: 'yolo'
                                });
                            }
                        }
                    }
                },
                about_component_1.AboutComponent
            ]
        });
    });
    it('should log ngOnInit', testing_1.inject([about_component_1.AboutComponent], function (about) {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        about.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=about.component.spec.js.map