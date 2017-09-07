/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function run($rootScope, $state, Restangular) {
    $rootScope.$state = $state;

    Restangular.addResponseInterceptor(function (resp) {
        return resp;
    });

    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
        if (response.status == 400 || response.status == 401)
        {
            $state.go('login');
        }
    });
}

function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider, RestangularProvider) {
    
    RestangularProvider.setBaseUrl(baseUrl);
    RestangularProvider.setDefaultHeaders({Authorization: "Bearer " + localStorage.token,
                                           "X-Requested-With": "XMLHttpRequest"});

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });
}
angular
    .module('inspinia')
    .config(config)
    .run(run)
    .directive('fooRepeatDone', function() {
        return function($scope, element) {
            if ($scope.$last) { // all are rendered
                $('.table').trigger('footable_redraw');
            }
        }
    });
