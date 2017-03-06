/**
 * @ngdoc overview
 * @name RstFrontH5
 * @description
 * # Initializes main application and routing
 * Main module of the application.
 */
var SI = angular.module('SIAPP', [
    'ionic',
    'ngCordova',
    'ngResource',
    'LocalStorageModule'
])
.run(function($ionicPlatform) {

	'use strict';
    $ionicPlatform.ready(function () {
        // save to use plugins here
    });
    // add possible global event handlers here

})
.config(function (
    $httpProvider,
    $stateProvider,
    $urlRouterProvider,
    $ionicConfigProvider,
    localStorageServiceProvider
) {

    'use strict';
    // $ionicConfigProvider.platform.android.views.maxCache(5);
    // $ionicConfigProvider.views.maxCache(0); // close global view-cache

    //console.log('IonicConfigProvider', $ionicConfigProvider);
    // localStorageServiceProvider.setPrefix('SIAPP');

	// Application routing
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/main.html',
        controller: 'MainController'
    })
    .state('app.empty', {
        url: '/empty',
        cache: true,
        views: {
            'viewContent': {
                templateUrl: 'templates/views/empty.html',
                controller: 'MainController'
            }
        }
    })
    .state('app.loading', {
        url: '/loading',
        cache: true,
        views: {
            'viewContent': {
                templateUrl: 'templates/views/loading.html',
                controller: 'MainController'
            }
        }
    });

    $urlRouterProvider
      .when('/:app', '/app/loading')
      .otherwise('/app/myWalletIndex');

});
