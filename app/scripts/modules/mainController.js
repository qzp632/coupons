/**
 * @ngdoc function
 * @name RstFrontH5.controller:MainController
 * @description
 * # MainController
 */
SI.controller('MainController', [
    '$scope',
    '$state',
    '$ionicSlideBoxDelegate',
    '$ionicHistory',
    '$ionicPopup',
    '$rootScope',
    '$ionicConfig',
    '$ionicScrollDelegate',
    'siConfig',
    'ExampleService',
    'ApiService',
    'ErrorLogService',
function (
    $scope,
    $state,
    $ionicSlideBoxDelegate,
    $ionicHistory,
    $ionicPopup,
    $rootScope,
    $ionicConfig,
    $ionicScrollDelegate,
    siConfig,
    ExampleService,
    ApiService,
    ErrorLogService
) {
    'use strict';
    var isNative = window.$$ && $$.Native;

    /**
    * Initial App
    */
    (function (w, $scope, ApiService) {

        try {
            ApiService.getCurrCityName();
        } catch (e) {
            var promise = ErrorLogService.GetSelectFilterService({

            }) || {};
            typeof promise.success === 'function' && promise.success(function () {
                console.log('error log success');
            }).error(function () {
                console.log('error log error');
            });
        }


    } (window, $scope, ApiService));

    $scope.emptyMsg = '抱歉，没有相关记录';
    $scope.errorMsg = '网络连接不可用，请稍后再试';
    $scope.errMesInfo = '啊哦，网络飞走了，点击刷新试试';
    $scope.reqParam = { start:0, limit:10 };
    $scope.rspState = { success: 10000, error: 20000 };

	if ($scope.isMobile && !$scope.zoneCode) {
		typeof $$.Native.getLocalData === 'function' && $$.Native.getLocalData('zoneCode', function(zoneCode){
			$scope.zoneCode = zoneCode;
		})
	};

    $scope.showHud = function () {
    	ApiService.showHud();
    };

    $scope.hideHud = function () {
    	ApiService.hideHud();
    };

    $scope.goBack = function (backNum) {
		if (backNum) {
			$ionicHistory.goBack(backNum);
		} else {
			$ionicHistory.goBack();
		}
	};

	/**
	 * backView equals history.back ??
	 */
	$scope.back = function () {
		history.back();
	}


    $scope.jumpToState = function(stateName, catagory){

		$ionicConfig.views.transition('none');// 关闭翻页动画
	    if (catagory) {
			if (typeof(catagory) === 'string') {
				catagory = JSON.parse(catagory);
			}
			$state.go(stateName, catagory, {reload:true});
		} else {
			$state.go(stateName, {}, {reload:true});
		}

		setTimeout(function(){
			$ionicConfig.views.transition('ios');// 打开翻页动画
		}, 1000);

    };

	$scope.home = $scope.backToHome = function(){
        var options = {
        paramArr:['pageRecord', 'leave', '办事指南_社保政策_医保政策_政策问答']
        };
        new ApiService.talkIngDataFn(options);
        console.log('ddd');
		ApiService.backToHome();
	};

    var skip = true;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
//		if (ApiService.skipNextPageTransition()) {
//			$ionicConfig.views.transition('none');
//			ApiService.skipNextPageTransition(false);
//		} else {
//			$ionicConfig.views.transition('platform');
//		}
    });

    //  锚点
	$scope.listenH5Event = function(ancho){
		if (isNative && ancho && !ApiService.isLocalEnv()) {
			typeof $$.Native.listenH5Event === 'function' && $$.Native.listenH5Event(ancho);
		}
	};

	$scope.nativeAlert = function(options){
		options = options || {};
		options.text = options.text || '请填写提示信息';
		options.btnText = options.btnText || '确定';
		options.btnCallback = options.btnCallback || function(){};
		if (isNative) {
			typeof $$.Native.alert === 'function' && $$.Native.alert(options);
		}else {
			$ionicPopup.alert({title: '提示',template: options.text});
		}
	};

	$scope.nativeConfirm = function(options){
		options = options || {};
		options.text = options.text || '请填写提示信息';
		options.leftBtnText = options.leftBtnText || '取消';
		options.rightBtnText = options.rightBtnText || '确定';
		options.leftBtnCallback = options.leftBtnCallback || function(){};
		options.rightBtnCallback = options.rightBtnCallback || function(){};
		if (isNative){
			typeof $$.Native.confirm === 'function' && $$.Native.confirm(options);
		} else {
			var confirmPopup = $ionicPopup.confirm({
				title: '提示',
				template: options.text
			});
			confirmPopup.then(function(res) {
				if (res) {
					options.rightBtnCallback();
				} else {
					options.leftBtnCallback();
				}
			});
		}
	};

	$scope.nativeTip = function (text) {
		if (isNative) {
			typeof $$.Native.tip === 'function' && $$.Native.tip(text);
		} else {
			$ionicPopup.alert({title: '提示',template: text});
		}
	};

	/**
	 * 选择日期
	 * @param {Object} options
	 */
	$scope.nativeDate = function (options) {
        isNative && typeof $$.Native.selectDate === 'function' && $$.Native.selectDate(options);
	};
	/**
	 * 选择日期
	 * @param {Object} options
	 */
	$scope.nativeDateStyle = function (options) {
        isNative && typeof $$.Native.selectDateStyle === 'function' && $$.Native.selectDateStyle(options);
	};
	/**
	 * 设置年龄
	 * @param {Object} options
	 */
	$scope.setNativeAgeAndSex = function (options) {
        isNative && typeof $$.Native.setAgeAndSex === 'function' && $$.Native.setAgeAndSex(options);
	};
	/**
	 * 获取年龄和性别
	 * @param {Object} options
	 */
	$scope.getNativeAgeAndSex = function (options) {
        isNative && typeof $$.Native.getAgeAndSex === 'function' && $$.Native.getAgeAndSex(options);
	};
	/**
	 * 调转好医生界面
	 */
	$scope.jumpGoodDoctorWithCallBack = function () {
        isNative && typeof $$.Native.jumpGoodDoctorWithCallBack === 'function' && $$.Native.jumpGoodDoctorWithCallBack();
	};
	/**
	 * 保持当前页面
	 * @param {Object} options
	 */
	$scope.saveCurrentPageMessage = function (options) {
        isNative && typeof $$.Native.saveCurrentPageMessage === 'function' && $$.Native.saveCurrentPageMessage(options);
	};
	/**
	 * 上传照片
	 * @param {Object} options
	 */
	$scope.nativeSelectPhotoWithCallBack = function (options) {
        isNative && typeof $$.Native.selectPhotoWithCallBack === 'function' && $$.Native.selectPhotoWithCallBack(options);
	};
	/**
	 * 上传照片
	 * @param {Object} options
	 */
	$scope.nativeSelectPhotoWithCallBackCount = function (options) {
        isNative && typeof $$.Native.selectPhotoCounts === 'function' && $$.Native.selectPhotoCounts(options);
	};
	/**
	 * 获取用户信息
	 * @param {Object} options
	 */
	$scope.getNativeUser = function(options){
		var isLocalEnv = ApiService.isLocalEnv();
		if (isLocalEnv) {
			$scope.localUserSex = '男';
			$scope.localUserName = '张无忌';
		} else {
            isNative && typeof $$.Native.getNativeUser === 'function' && $$.Native.getNativeUser(options);
		}
	};
	/** 删除图片缓存
	 *
	 * @param {Object} imgName
	 */
	$scope.deleteNativeSymptomWithName = function (imgName) {
        isNative && typeof $$.Native.deleteSymptomWithName === 'function' && $$.Native.deleteSymptomWithName(imgName);
	};
	/** 删除图片缓存
	 *
	 */
	$scope.clearNativeSymptomWithCallback = function () {
        isNative && typeof $$.Native.clearSymptomWithCallback === 'function' && $$.Native.clearSymptomWithCallback();
	};
//	日期运算
	$scope.getTargetDate = function(startDate,days) {
		var startTime = new Date(startDate).getTime();
		var diff = days*86400*1000;
		var endTime = startTime + diff;
		var endDate = new Date(endTime);
		return endDate;
	};

    /**
    * 获取当前城市
    */
    $scope.getCurrCityCodeByNative = function () {
        // '0575' 绍兴
        return window.localStorage.getItem('CURR_CITY_MSG');
    };
    /**  解决页面滚动自动上滑问题
	 *
	 **/
	 $scope.autoScrollIssue = function(delHandle,yCountNum){
	 	if (!yCountNum) {
	  		yCountNum = 0;
	 	}
		$ionicScrollDelegate.$getByHandle(delHandle).scrollTo(0,yCountNum);
	}

	 /**
	 * 伪跳转 index=0表示页面forward，1表示返回 back
	 * @param {Object} handle
	 * @param {Object} index
	 */
	$scope.slideJump = function(handle,index,time){
		time = time || 300;
		$ionicSlideBoxDelegate.$getByHandle(handle).slide(index,time);
	};

	/**
	 * 禁止滑动
	 */
	$scope.setSlideStop = function(handle){
		$ionicSlideBoxDelegate.$getByHandle(handle).enableSlide(false);
	};

    /**
    * 社交分享
    * @param options
    */
    $scope.shareImageURL = function (options) {
        isNative && typeof $$.Native.shareImageURL === "function" && $$.Native.shareImageURL(options);
    };

}]);
