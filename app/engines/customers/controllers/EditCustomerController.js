angular.module('inspinia').controller('EditCustomerController',
    function($rootScope, $scope , Restangular , $state, customerId, customer, stations, notify){

    $scope.stations = stations.stations;

    $scope.customer = {
        id: customer.customer.id,
        first_name: customer.customer.first_name,
        last_name: customer.customer.last_name,
        email: customer.customer.email,
        sex: customer.customer.sex,
        date_of_birth: new Date(customer.customer.date_of_birth)
    };

    if (customer.customer.address) {
        $scope.address = {
            id: customer.customer.address.id,
            address1: customer.customer.address.address1,
            address2: customer.customer.address.address2,
            city: customer.customer.address.city,
            province: customer.customer.address.province,
            country: customer.customer.address.country,
            zip: customer.customer.address.zip,
            phone: customer.customer.address.phone
        };
    } else {
        $scope.address = {};
    }

    $scope.saveCustomer = function () {
        $scope.errors = 0;
        angular.forEach(angular.element(".required"), function(value, key){
            var elem = angular.element(value);
            if (elem.val() == '')
            {
                elem.attr('style', 'border:1px solid red');
                $scope.errors++;
            }
        });
        if ($scope.errors == 0)
        {
            var data = {
                customer: $scope.customer,
                address: $scope.address
            };
            Restangular.all('/customers/'+customerId).customPUT(data).then(function(response) {
                notify({ 
                    message: 'Success - Customer has been successfully updated!',
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
});
