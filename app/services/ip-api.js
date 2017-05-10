(function () {

    /**
     * Wrapper to get data from IpApi
     *
     */
    angular
        .module('app')
        .factory('IpApi', IpApi);

    IpApi.$inject = ['$http', 'CONSTANTS'];

    function IpApi($http, CONSTANTS) {

        return {
            get: get
        };

        function get(host) {

            var endpoint = CONSTANTS.IP_API_URL;
            if (host) {
                endpoint += "/" + host;
            }

            return $http({
                method: 'GET',
                url: endpoint
            }).then(function (response) {
                return response;
            })
                .catch(function (error) {
                    return error;
                });
        }
    }


})();
