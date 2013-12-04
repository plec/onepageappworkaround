/*global require */
require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        json2: '../bower_components/json2/json2',
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',
        bootstrap: 'vendor/bootstrap',
        rivets: '../bower_components/rivets/dist/rivets',
		goog: 'vendor/goog',
		async: 'vendor/async',
		propertyParser: 'vendor/propertyParser',
        leafletUtils: 'vendor/leafletUtils'
    },
    shim: {
    	json2       : { exports : "JSON" },
    	leafletUtils: {exports : "leafletUtils"},
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        underscore: {
            deps: [],
            exports: '_'
        },
        // "default" backbone.js files are not AMD-compatible
        // => We must not consider it as proper backbone dependency, this is why we add here
        // shim config which provide window.Backbone as module dependency
        backbone: {
            deps: ["underscore", "jquery"],
            // Note : This is strange that exports:"Backbone" is not enough
            // for strange reasons, we have to confirm it with init function
            // because otherwise, window.Backbone won't be provided as module dependency
            exports: "Backbone"
        },
        rivets: {
            deps: [],
            exports: 'rivets'
        }
    },
    deps: ['hbs' ],
    // hbs particular configuration properties
    hbs: {
        disableI18n: true // Support for i18n is useless for the moment...
    }
});


//require(['app','hbs!templates/hello'], function (app, helloTemplate) {
//    'use strict';
//    // use app here
//    console.log(app);
//    console.log(helloTemplate({ who: "Pierrot"}));
//});

require(['app', 'hbs!templates/hello'], function (app, helloTemplate) {
    'use strict';
    // use app here
    console.log(app);
    console.log(helloTemplate({ who: "devoxxFr" }));
});
