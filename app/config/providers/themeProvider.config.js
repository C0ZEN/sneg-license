/**
 * Generated header by Cozen for sneg-license project
 * Generated file themeProvider.config on WebStorm
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
        .config(themeProviderConfig);

    themeProviderConfig.$inject = [
        'altranThemeProvider',
        'config'
    ];

    function themeProviderConfig(altranThemeProvider, config) {
        altranThemeProvider
            .setCurrent(config.theme);
    }

})(window.angular);