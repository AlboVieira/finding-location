(function () {
    /**
     * Definition of the main app module and its dependencies
     */
    angular
        .module('app', [
            'ngRoute',
            'ngMap',
            'toastr',
            'ui.bootstrap',
            'angular-loading-bar'
        ])
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

    /**
     * App routing
     *
     */
    function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {

        $locationProvider.html5Mode(false);

        // routes
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });

    }

    /**
     * Run block
     */
    angular
        .module('app')
        .run(run);

    run.$inject = ['$rootScope', '$location'];
    function run($rootScope, $location) {
    }


})();