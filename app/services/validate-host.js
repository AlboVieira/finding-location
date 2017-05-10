(function () {

    /**
     * It checks if a host is valid
     *
     */
    angular
        .module('app')
        .factory('ValidateHost', ValidateHost);

    function ValidateHost() {

        return {
            check: check
        };

        function check(host) {
            if (!host || !domainHasAtLeastTwo(host)) {
                return false;
            }
            var pattern = /^\s*((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*\.?)\s*$/;
            return pattern.test(host);
        }

        function domainHasAtLeastTwo(host) {
            return host.split('.').length > 2;
        }
    }


})();
