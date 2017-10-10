(function (angular) {
    'use strict';

    angular
        .module('snegLicense')
        .factory('homeService', homeService);

    homeService.$inject = [];

    function homeService() {
        return {};
    }

})(window.angular);