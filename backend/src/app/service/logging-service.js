"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggingService = (function () {
    function LoggingService() {
    }
    LoggingService.log = function (event, context, callback) {
        console.log('Event: ' + JSON.stringify(event));
        console.log('Context: ' + JSON.stringify(context));
        console.log('Callback: ' + JSON.stringify(callback));
    };
    return LoggingService;
}());
exports.LoggingService = LoggingService;
