/**
 * Generated header by Cozen for sneg-license project
 * Generated file titleProvider.config on WebStorm
 *
 * Created by: Geoffrey "C0ZEN" Testelin
 * Date: 10/10/2017
 * Time: 10:05
 * Version: 1.0.0
 */
(function (angular) {
    'use strict';

    angular
        .module('snegLicense')
        .config(titleProviderConfig);

    titleProviderConfig.$inject = [
        'altranTitleProvider',
        'config'
    ];

    function titleProviderConfig(altranTitleProvider, config) {
        altranTitleProvider
            .defaultTitle(config.defaultTitle);
    }

})(window.angular);