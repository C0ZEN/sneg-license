/**
 * Generated header by Cozen for sneg-license project
 * Generated file apiProvider.config on WebStorm
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
        .config(apiProviderConfig);

    apiProviderConfig.$inject = [
        'altranApiProvider',
        'config'
    ];

    function apiProviderConfig(altranApiProvider, config) {
        altranApiProvider
            .baseUrl(config.baseUrl);
    }

})(window.angular);