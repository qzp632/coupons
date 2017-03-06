'use strict';

/**
 * @ngdoc constant
 * @name RstFrontH5.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */
SI.constant('siConfig', {
    statu: 'dev-fake', //dev, dev-fake, dev-http,stg, prd
    version: '2.5.0',
    serverName_dev: 'https://test-mhis-siapp.pingan.com.cn:57443',
    serverName_stg: 'https://test-mhis-siapp.pingan.com.cn:57443',
    serverName_prd: 'https://ehs.pingan.com.cn'
});

// $scope.zoneCode = "469003";
// moduleID : "51300",
