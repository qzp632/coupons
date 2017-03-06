'use strict';
SI.factory('couponService',
function($window, $filter, ApiService,couponMokeService){

	var isLocal = ApiService.isLocalEnv(),
	hhs = {};
	hhs.getcoupon = function(isNoHud){
		var url = '/mhis-siapp/security/v2/medicalRecord/filters.do';
		if(isLocal){
			return ApiService.requestFake(couponMokeService.getcoupon());
		}else if(isNoHud){
			return ApiService.requestNoHud('get', url, {});
		}else {
			return ApiService.request('get', url, {}, true);
		}
	}
	return hhs;

});
    