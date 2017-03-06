'use strict';
SI.factory('couService',
function($window, $filter, ApiService,couponService){
	var getcoupon = function(){
		var self = this;
		var param = {};
		couponService.getcoupon(param,true).success(function(rsp){
			console.log(rsp)
			self.dataList = rsp.body;
			self.dataTab[0].tabName = "未使用"+"("+self.dataList.length+")"
		}).error(function(rsp){

		});
	}

	return {
		getcoupon : getcoupon
	}
});
    