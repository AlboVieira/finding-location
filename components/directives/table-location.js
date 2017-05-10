;(function () {


    'use strict';

    /**
     *
     */
    angular.module('app')
        .directive('tableLocation', tableLocation);

    tableLocation.$inject = ['$filter'];
    function tableLocation($filter) {

        return {
            restrict: 'EA',
            templateUrl: 'components/directives/templates/table-location.html',
            scope: {
                data: '=info'
            },
            link: function (scope, elem, attrs, ctrl) {

                scope.getInfoMessage = getInfoMessage;

                function getInfoMessage(field, info) {
                    var now = $filter('date')(new Date(), "dd/MM/yyyy");
                    return "This is your " + field + " from ISP " + info + " at " + now
                }
            }
        };
    }


})();