'use strict';

SI.factory('ErrorLogService', function($window, $http, ApiService) {
    var api = {};
    var isLocal = ApiService.isLocalEnv();

    api.GetSelectFilterService = function (param) {

        var url = '/mhis-siapp/open/avalon/errorlog.do';

        switch (true) {
            case isLocal: console.log('send errorlog req'); break;
            default: return ApiService.requestNoHud('get', url, param);
        }
    }

    return api;
});
