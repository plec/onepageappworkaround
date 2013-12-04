/*global define */
define(['jquery', 'bootstrap','routers/MainRouter','handlebars', 'rivets-config'], function ($, bootstrap, MainRouter, Handlebars, rivets) {
    'use strict';
    console.log('Running JQuery version %s', $().jquery);
    new MainRouter();
    return '\'Allo \'Allo!';
});