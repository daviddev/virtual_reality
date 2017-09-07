angular.module('inspinia').controller('AddCustomerController',
    function($rootScope, $scope , Restangular , $state, stations, notify){

    $scope.stations = stations.stations;

    $state.go('app.create-customer.step_one');

    $scope.state = $state.current.name;
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options) {
        $scope.state = toState.name;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        if (toState.name == 'app.create-customer.step_one' || 
            toState.name == 'app.create-customer.step_two' || 
            toState.name == 'app.create-customer.step_three') {
            $scope.errors = 0;
            angular.forEach(angular.element(".required"), function(value, key){
                var elem = angular.element(value);
                if (elem.val() == '') {
                    elem.attr('style', 'border:1px solid red;');
                    $scope.errors++;
                } else if (elem.attr('name') == 'email') {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if ( !re.test(elem.val()) ) {
                        elem.attr('style', 'border:1px solid red;');
                        $scope.errors++;
                    }
                }
            });
            if ($scope.errors != 0)
            {
                event.preventDefault();
            }
        }
    });

    $scope.$watch('credit.duration', function (newVal, oldVal) {
        if (newVal == 'other')
        {
            angular.element('#otherDuration').addClass('required');
        }
        else
        {
            angular.element('#otherDuration').removeClass('required');
        }
    })

    $scope.stepOne = function () {
        $state.go('app.create-customer.step_one');
    }

    $scope.stepTwo = function () {
        $state.go('app.create-customer.step_two');
    }

    $scope.stepThree = function () {
        $state.go('app.create-customer.step_three');
    }

    $scope.selectedCredit = 1;

    var credits = {
        '1': {
            source: 'Walk Ins',
            duration: '15 minutes',
            purchase_price : 9.99
        },
        '2': {
            source: 'Walk Ins',
            duration: '30 minutes',
            purchase_price : 14.99
        },
        '3': {
            source: 'Walk Ins',
            duration: '60 minutes',
            purchase_price : 19.99
        },
        '4': {
            source: 'VR Party',
            duration: '15 minutes',
            purchase_price : 9.99
        },
        '5': {
            source: 'VR Party',
            duration: '30 minutes',
            purchase_price : 14.99
        },
        '6': {
            source: 'VR Party',
            duration: '60 minutes',
            purchase_price : 19.99
        },
        '7': {
            source: 'Split Party',
            duration: '15 minutes',
            purchase_price : 9.99
        },
        '8': {
            source: 'Split Party',
            duration: '30 minutes',
            purchase_price : 14.99
        },
        '9': {
            source: 'Split Party',
            duration: '60 minutes',
            purchase_price : 19.99
        }
    };

    $scope.$watch('selectedCredit', function (newVal, oldVal) {
        $scope.credit = {
            purchase_datetime: new Date(),
            source: credits[newVal].source,
            duration: credits[newVal].duration,
            purchase_price: credits[newVal].purchase_price
        };
    });

    $scope.selectCredit = function (credit) {
        $scope.selectedCredit = credit;
    }

    $scope.customer = {};
    $scope.address = {};
    // $scope.credit = {};
    $scope.station = {};

    $scope.saveCustomer = function () {
        $scope.errors = 0;
        angular.forEach(angular.element(".required"), function(value, key){
            var elem = angular.element(value);
            if (elem.val() == '')
            {
                elem.attr('style', 'border:1px solid red;');
                $scope.errors++;
            }
        });
        if ($scope.errors == 0)
        {
            $scope.customer.location_id = $rootScope.selectedLocation;
            $scope.credit.location_id = $rootScope.selectedLocation;
            var data = {
                customer: $scope.customer,
                address: $scope.address,
                credit: $scope.credit,
                station: $scope.station
            };
            Restangular.all('/customers').post(data).then(function(response) {
                notify({ 
                    message: 'Success - Customer has been successfully created!',
                    classes: 'alert-info',
                    templateUrl: $rootScope.inspiniaTemplate
                });
                $state.go('app.customers');
            }, function (errorResponse) {
                notify({ 
                    message: 'Whoops! - Something went wrong!',
                    classes: 'alert-danger',
                    templateUrl: $rootScope.inspiniaTemplate
                });
                $state.go('app.customers');
            });
        }
    };

    $scope.otherDuration = function () {
        $scope.credit.duration = $scope.credit.duration_other + ' minutes'
    }
});
