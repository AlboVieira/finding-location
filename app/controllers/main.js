/**
 * MainController
 * Here are the core of the app, make calls to IpApi
 * and mount data to show
 *
 *
 */
(function () {

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'IpApi', 'ValidateHost', 'toastr'];

    function MainController($scope, IpApi, ValidateHost, toastr) {

        $scope.getMyLocation = getMyLocation;
        $scope.getHostLocation = getHostLocation;
        $scope.resetLocation = resetLocation;
        $scope.hasAnyLocation = hasAnyLocation;

        function getHostLocation() {

            if (!ValidateHost.check($scope.host)) {
                return toastr.error('Host invalid, try again');
            }

            IpApi.get($scope.host).then(function (response) {
                $scope.hostLocation = response.data;
                $scope.current = {lat: $scope.hostLocation.lat, lon: $scope.hostLocation.lon};
                $scope.defaultLocation = {};
            }).catch(function () {
                toastr.error('Failed to get data from api');
            });
        }

        function getMyLocation() {
            IpApi.get().then(function (response) {
                $scope.myLocation = response.data;
                $scope.current = {lat: $scope.myLocation.lat, lon: $scope.myLocation.lon};
                $scope.defaultLocation = {};
            }).catch(function () {
                toastr.error('Failed to get data from api');
            });
        }

        function hasAnyLocation() {
            return !!$scope.myLocation || !!$scope.hostLocation;
        }

        function resetLocation() {
            var bothActive = !!$scope.myLocation && !!$scope.hostLocation;
            if (bothActive) {
                return $scope.myLocation = null;
            }
            $scope.hostLocation = null;
            $scope.myLocation = null;
        }
    }
})();