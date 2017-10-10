/**
 * Generated header by Cozen for sneg-license project
 * Generated file languageProvider.config on WebStorm
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
        .config(languageProviderConfig);

    languageProviderConfig.$inject = [
        'altranLanguageProvider',
        'config'
    ];

    function languageProviderConfig(altranLanguageProvider, config) {
        altranLanguageProvider
            .setCurrent(config.defaultLanguage);
    }

})(window.angular);