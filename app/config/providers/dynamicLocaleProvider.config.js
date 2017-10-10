/**
 * Generated header by Cozen for sneg-license project
 * Generated file dynamicLocalProvider.config on WebStorm
 *
 * Created by: Geoffrey "C0ZEN" Testelin
 * Date: 09/10/2017
 * Time: 15:25
 * Version: 1.0.0
 */
(function (angular) {
    'use strict';

    angular
        .module('snegLicense')
        .config(dynamicLocalConfig);

    dynamicLocalConfig.$inject = [
        'tmhDynamicLocaleProvider',
        'config'
    ];

    function dynamicLocalConfig(tmhDynamicLocaleProvider, config) {
        tmhDynamicLocaleProvider
            .localeLocationPattern(config.localeLocationPattern);
    }

})(window.angular);