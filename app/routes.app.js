angular.module('inspinia').config(function( $stateProvider , $urlRouterProvider ){
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/engines/login/views/index.html',
            data: { pageTitle: 'Login', specialClass: 'gray-bg' },
            controller: 'LoginController',
            resolve : {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/login/controllers/LoginController.js'
                        ]
                    });
                }]
            }
        })
        .state('app', {
            abstract: true,
            url: "/app",
            templateUrl: "app/templates/content.html",
            data: { pageTitle: 'Dashboard' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'cgNotify',
                            files: ['css/plugins/angular-notify/angular-notify.min.css','js/plugins/angular-notify/angular-notify.min.js']
                        }
                    ]);
                }
            }
        })
        .state('app.dashboard', {
            url: "/dashboard",
            templateUrl: "app/engines/dashboard/views/index.html",
            controller: 'DashboardController',
            resolve: {
                locations: function(Restangular, $stateParams, $state){
                    return Restangular.one('/locations').get({dashboard: true});
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: [ 'js/plugins/flot/jquery.flot.js',
                                     'js/plugins/flot/jquery.flot.time.js',
                                     'js/plugins/flot/jquery.flot.tooltip.min.js',
                                     'js/plugins/flot/jquery.flot.spline.js',
                                     'js/plugins/flot/jquery.flot.resize.js',
                                     'js/plugins/flot/jquery.flot.pie.js',
                                     'js/plugins/flot/curvedLines.js',
                                     'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                        {
                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
                        }
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/dashboard/controllers/DashboardController.js'
                        ]
                    });
                }]
            }
        })
        .state('app.customers', {
            url: '/customers',
            templateUrl: 'app/engines/customers/views/index.html',
            data: { pageTitle: 'Customers'},
            controller: 'CustomersController',
            resolve : {
                customers: function(Restangular, $stateParams, $state){
                    return Restangular.one('/customers').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/customers/controllers/CustomersController.js'
                        ]
                    });
                }]
            }
        })
        .state('app.customer', {
            url: "/customers/:customer",
            templateUrl: "app/engines/customers/views/customer-detail.html",
            data: { pageTitle: 'Customer profile'},
            controller: 'CustomerDetailController',
            resolve: {
                customerId : function($stateParams){
                    return $stateParams.customer;
                },
                customer: function(Restangular, $stateParams, $state, $stateParams){
                    return Restangular.one('/customers/'+$stateParams.customer).get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
                        }
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/customers/controllers/CustomerDetailController.js'
                        ]
                    });
                }]
            }
        })
        .state('app.create-customer', {
            url: '/create-customer',
            templateUrl: 'app/engines/customers/views/add-customer.html',
            controller: 'AddCustomerController',
            data: { pageTitle: 'Create Customer' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/moment/moment.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/bootstrap-chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: ['css/plugins/steps/jquery.steps.css']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                },
                stations: function(Restangular, $stateParams, $state){
                    return Restangular.one('/stations').get({action: 'available'}).then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            '/app/engines/customers/controllers/AddCustomerController.js',
                        ]
                    });
                }]
            }
        })
        .state('app.create-customer.step_one', {
            url: '/step_one',
            templateUrl: 'app/engines/customers/views/step-one.html',
            data: { pageTitle: 'Wizard form' }
        })
        .state('app.create-customer.step_two', {
            url: '/step_two',
            templateUrl: 'app/engines/customers/views/step-two.html',
            data: { pageTitle: 'Wizard form' }
        })
        .state('app.create-customer.step_three', {
            url: '/step_three',
            templateUrl: 'app/engines/customers/views/step-three.html',
            data: { pageTitle: 'Wizard form' }
        })
        .state('app.edit-customer', {
            url: '/edit-customer/:customer',
            templateUrl: 'app/engines/customers/views/edit-customer.html',
            controller: 'EditCustomerController',
            data: { pageTitle: 'Edit Customer' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/moment/moment.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/bootstrap-chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: ['css/plugins/steps/jquery.steps.css']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                },
                stations: function(Restangular, $stateParams, $state){
                    return Restangular.one('/stations').get({action: 'available'}).then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                customerId : function($stateParams){
                    return $stateParams.customer;
                },
                customer: function(Restangular, $stateParams, $state, $stateParams){
                    return Restangular.one('/customers/'+$stateParams.customer+'/edit').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            '/app/engines/customers/controllers/EditCustomerController.js',
                        ]
                    });
                }]
            }
        })
        .state('app.stations', {
            url: "/stations",
            templateUrl: "app/engines/stations/views/index.html",
            data: { pageTitle: 'Stations' },
            controller: 'StationsController',
            resolve : {
                stations: function(Restangular, $stateParams, $state){
                    return Restangular.one('/stations').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        }
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/stations/controllers/StationsController.js'
                        ]
                    });
                }]
            }
        })
        .state('app.station-details', {
            url: "/stations/:station",
            templateUrl: "app/engines/stations/views/station-details.html",
            data: { pageTitle: 'Station details' },
            controller: 'StationDetailsController',
            resolve : {
                stationId : function($stateParams){
                    return $stateParams.station;
                },
                station: function(Restangular, $stateParams, $state, $stateParams){
                    return Restangular.one('/stations/'+$stateParams.station).get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/stations/controllers/StationDetailsController.js'
                        ]
                    });
                }]
            }
        })
        .state('app.games', {
            url: "/games",
            templateUrl: "app/engines/games/views/index.html",
            data: { pageTitle: 'Games' },
            controller: 'GamesController',
            resolve : {
                games: function(Restangular, $stateParams, $state){
                    return Restangular.one('/games').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        }
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/games/controllers/GamesController.js',
                        ]
                    });
                }]
            }
        })
        .state('app.games-grid', {
            url: "/games-grid",
            templateUrl: "app/engines/games/views/index-grid.html",
            data: { pageTitle: 'Games' },
            controller: 'GamesController',
            resolve : {
                games: function(Restangular, $stateParams, $state){
                    return Restangular.one('/games').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        }
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/games/controllers/GamesController.js',
                        ]
                    });
                }]
            }
        })
        .state('app.create-game', {
            url: "/create-game",
            templateUrl: "app/engines/games/views/create-game.html",
            data: { pageTitle: 'Create Game' },
            controller: 'AddGameController',
            resolve : {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        },
                        {
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: ['css/plugins/slick/slick.css','css/plugins/slick/slick-theme.css','js/plugins/slick/slick.min.js']
                        },
                        {
                            name: 'slick',
                            files: ['js/plugins/slick/angular-slick.min.js']
                        },
                        {
                            name: 'ui.switchery',
                            files: ['css/plugins/switchery/switchery.css','js/plugins/switchery/switchery.js','js/plugins/switchery/ng-switchery.js']
                        },
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/games/controllers/AddGameController.js',
                        ]
                    });
                }]
            }
        })
        .state('app.edit-game', {
            url: "/edit-game/:game",
            templateUrl: "app/engines/games/views/create-game.html",
            data: { pageTitle: 'Edit Game' },
            controller: 'EditGameController',
            resolve : {
                gameId : function($stateParams){
                    return $stateParams.game;
                },
                game: function(Restangular, $stateParams, $state, $stateParams){
                    return Restangular.one('/games/'+$stateParams.game+'/edit').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        },
                        {
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernote/summernote.css','css/plugins/summernote/summernote-bs3.css','js/plugins/summernote/summernote.min.js','js/plugins/summernote/angular-summernote.min.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: ['css/plugins/slick/slick.css','css/plugins/slick/slick-theme.css','js/plugins/slick/slick.min.js']
                        },
                        {
                            name: 'slick',
                            files: ['js/plugins/slick/angular-slick.min.js']
                        },
                        {
                            name: 'ui.switchery',
                            files: ['css/plugins/switchery/switchery.css','js/plugins/switchery/switchery.js','js/plugins/switchery/ng-switchery.js']
                        },
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/games/controllers/EditGameController.js',
                        ]
                    });
                }]
            }
        })
        .state('app.game', {
            url: '/game/:game',
            templateUrl: '/app/engines/games/views/game-detail.html',
            data: { pageTitle: 'Game Detail' },
            controller: 'GameDetailController',
            resolve : {
                gameId : function($stateParams){
                    return $stateParams.game;
                },
                game: function(Restangular, $stateParams, $state, $stateParams){
                    return Restangular.one('/games/'+$stateParams.game).get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/slick/slick.css','css/plugins/slick/slick-theme.css','js/plugins/slick/slick.min.js']
                        },
                        {
                            name: 'slick',
                            files: ['js/plugins/slick/angular-slick.min.js']
                        },
                        {
                            name: 'ui.switchery',
                            files: ['css/plugins/switchery/switchery.css','js/plugins/switchery/switchery.js','js/plugins/switchery/ng-switchery.js']
                        },
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/games/controllers/GameDetailController.js'
                        ]
                    });
                }]
            }
        })
        .state('app.locations', {
            url: "/locations",
            templateUrl: "app/engines/locations/views/index.html",
            data: { pageTitle: 'Locations' },
            controller: 'LocationsController',
            resolve : {
                locations: function(Restangular, $stateParams, $state){
                    return Restangular.one('/locations').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/dataTables/datatables.min.js','css/plugins/dataTables/datatables.min.css']
                        },
                        {
                            serie: true,
                            name: 'datatables',
                            files: ['js/plugins/dataTables/angular-datatables.min.js']
                        },
                        {
                            serie: true,
                            name: 'datatables.buttons',
                            files: ['js/plugins/dataTables/angular-datatables.buttons.min.js']
                        },
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        }
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/locations/controllers/LocationsController.js',
                        ]
                    });
                }]
            }
        })
        .state('app.sessions', {
            url: '/sessions',
            templateUrl: 'app/engines/sessions/views/index.html',
            data: { pageTitle: 'Sessions'},
            controller: 'SessionsController',
            resolve : {
                sessions: function(Restangular, $stateParams, $state){
                    return Restangular.one('/sessions').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        },
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/sessions/controllers/SessionsController.js'
                        ]
                    });
                }]
            }
        })
        .state('app.purchases', {
            url: "/purchases",
            templateUrl: "app/engines/purchases/views/index.html",
            data: { pageTitle: 'Purchases' },
            controller: 'PurchasesController',
            resolve : {
                credits: function(Restangular, $stateParams, $state, $stateParams){
                    return Restangular.one('/credits').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                customers: function(Restangular, $stateParams, $state){
                    return Restangular.one('/customers').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        },
                        {
                            files: ['js/plugins/moment/moment.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/bootstrap-chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: ['css/plugins/steps/jquery.steps.css']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/purchases/controllers/PurchasesController.js'
                        ]
                    });
                }]
            }
        })
        .state('app.users', {
            url: "/users",
            templateUrl: "app/engines/users/views/index.html",
            data: { pageTitle: 'Users' },
            controller: 'UsersController',
            resolve : {
                users: function(Restangular, $stateParams, $state, $stateParams){
                    return Restangular.one('/users').get().then(function(response) {
                        return response;
                    }, function(errorResponse) {
                        $state.go('app.dashboard');
                    });
                },
                locations: function(Restangular, $stateParams, $state){
                    return Restangular.one('/locations').get({dashboard: true});
                },
                companies: function(Restangular, $stateParams, $state){
                    return Restangular.one('/companies').get({dashboard: true});
                },
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        },
                        {
                            files: ['js/plugins/moment/moment.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/bootstrap-chosen.css','js/plugins/chosen/chosen.jquery.js','js/plugins/chosen/chosen.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            serie: true,
                            files: ['js/plugins/daterangepicker/daterangepicker.js', 'css/plugins/daterangepicker/daterangepicker-bs3.css']
                        },
                        {
                            name: 'daterangepicker',
                            files: ['js/plugins/daterangepicker/angular-daterangepicker.js']
                        },
                        {
                            files: ['css/plugins/steps/jquery.steps.css']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                },
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        name: 'inspinia',
                        files: [
                            'app/engines/users/controllers/UsersController.js'
                        ]
                    });
                }]
            }
        })

    $urlRouterProvider.otherwise("/app/dashboard");
});
