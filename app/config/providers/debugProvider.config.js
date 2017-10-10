/**
 * Generated header by Cozen for sneg-license project
 * Generated file debugProvider.config on WebStorm
 *
 * Created by: Geoffrey "C0ZEN" Testelin
 * Date: 03/10/2017
 * Time: 09:48
 * Version: 1.0.0
 */
(function (angular) {
    'use strict';

    angular
        .module('snegLicense')
        .config(debugProviderConfig);

    debugProviderConfig.$inject = [
        'altranDebugProvider',
        'config'
    ];

    function debugProviderConfig(altranDebugProvider, config) {
        altranDebugProvider
            .compile(config.compile)
            .logsEnabled(config.logs.enabled)
            .logsExceptionsEnabled(config.logs.exceptions.enabled)
            .logsHttpEnabled(config.logs.http.enabled)
            .logsLanguageEnabled(config.logs.language.enabled)
            .logsTestEnabled(config.logs.test.enabled)
            .logsThemeEnabled(config.logs.theme.enabled);
    }

})(window.angular);