/**
 * Generated header by Cozen for sneg-license project
 * Generated file translateProvider.config on WebStorm
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
        .config(translateProviderConfig);

    translateProviderConfig.$inject = [
        '$translateProvider',
        'config'
    ];

    function translateProviderConfig($translateProvider, config) {
        $translateProvider
            .useSanitizeValueStrategy(config.useSanitizeValueStrategy)
            .useStaticFilesLoader({
                    prefix: config.useStaticFilesLoader.prefix,
                    suffix: config.useStaticFilesLoader.suffix
                }
            )
            .preferredLanguage(config.defaultLanguage);
    }

})(window.angular);