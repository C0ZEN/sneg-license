/**
 * Generated header by Cozen for sneg-license project
 * Generated file appProvider.config on WebStorm
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
        .config(appProviderConfig);

    appProviderConfig.$inject = [
        'altranAppProvider',
        'config'
    ];

    function appProviderConfig(altranAppProvider, config) {
        altranAppProvider
            .target(config.target);
    }

})(window.angular);