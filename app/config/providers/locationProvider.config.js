/**
 * Generated header by Cozen for sneg-license project
 * Generated file locationProvider.config on WebStorm
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
        .config(locationProviderConfig);

    locationProviderConfig.$inject = [
        '$locationProvider',
        'config'
    ];

    function locationProviderConfig($locationProvider, config) {
        $locationProvider
            .html5Mode({
                enabled    : config.html5Mode.enabled,
                requireBase: config.html5Mode.requireBase
            })
            .hashPrefix(config.hashPrefix);
    }

})(window.angular);