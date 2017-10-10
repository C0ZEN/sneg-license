/**
 * Generated header by Cozen for sneg-license project
 * Generated file httpProvider.config on WebStorm
 *
 * Created by: Geoffrey "C0ZEN" Testelin
 * Date: 26/09/2017
 * Time: 16:54
 * Version: 1.0.0
 */
(function (angular) {
    'use strict';

    angular
        .module('snegLicense')
        .config(httpProviderConfig);

    httpProviderConfig.$inject = [
        '$httpProvider'
    ];

    function httpProviderConfig($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common['Accept']       = 'application/json';
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    }

})(window.angular);