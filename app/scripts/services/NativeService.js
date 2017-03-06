SI.factory('NativeService', function ($window, $http, $q, 
    $timeout, $ionicLoading, $state, siConfig) {

    'use strict';
    /** NativeService 重构start */
    var Service = {};
    var defaultCallback = function () {};
    var isNative = window.$$ && $$.Native;
    var isNativeEvent = window.$$ && $$.EventListener;

    /**
     * [interectWithNative native事件分发函数，native事件唯一入口]
     * @param functionName 告诉native需要调用哪一个方法的方法名
     *        paramsArr 此方法名所需要的参数数组
     *        callback 默认回调
     * @description:
     *     平安付    "payByPingAnFu"   [tranCode(暂时无用),orderTraceNo(流水单号)]
     *     添加锚点   "TDOnEvent"  [ancho(锚点字符串)]  
     *     nativeAlert  "alert"  [url,text,btnText]
     *     获取本地数据   "getLocalData"  [name(获取什么值)]
     *     返回Native首页   "backToRootModule"  [moduleId(默认为空)]
     *     锚点   "talkIngDataForH5"  ［三个参数］
     */
    Service.interectWithNative = function(functionName,paramsArr,callback){
        if(!!!functionName){return;}
        var options = {};
        options.functionName = functionName;
        options.params = JSON.stringify(paramsArr);
        options.callback = callback || defaultCallback;
        isNative && typeof $$.Native.interectWithNative === 'function' && $$.Native.interectWithNative(options);
    };
    
    /** NativeService 重构end */

    /* Native 通用方法 */
    Service.Common = (function() {

        var backToHome = function () {
            isNative && typeof $$.Native.backToRootModule === 'function' && $$.Native.backToRootModule();
        };

        var getCurrCityName = function () {
            isNative && typeof $$.Native.getCityName === 'function' && $$.Native.getCityName(function (cityCode) {
                window.localStorage.setItem('CURR_CITY_MSG', cityCode);
            });
        }

        var showFooterMenu = function () {
            isNative && typeof $$.Native.changeMenu === 'function' && $$.Native.changeMenu('1');
        };

        var hideFooterMenu = function () {
            isNative && typeof $$.Native.changeMenu === 'function' && $$.Native.changeMenu('0');
        };

        var showHud = function () {
            isNative && typeof $$.Native.changeMenu === 'function' && $$.Native.hudState('1');
    	}

    	var hideHud = function () {
            isNative && typeof $$.Native.changeMenu === 'function' && $$.Native.hudState('0');
    	}

        var injectBackHandlerForAndroid = function(scope, handler) {

                scope = scope || {};

                if (!handler) return;
                // reset handler
                if (isNativeEvent && typeof $$.EventListener.back === 'function') {
                    $$.EventListener.back = scope[handler];
                };

            };

        return {
            showHud               : showHud,
            hideHud               : hideHud,
            showFooterMenu        : showFooterMenu,
            hideFooterMenu        : hideFooterMenu,
            setAndroidBack        : injectBackHandlerForAndroid
        };
})();

     /**
     * View业务应用
     */
    Service.View = (function () {

        var getCurrCityName = function () {
            isNative && typeof $$.Native.getCityName === 'function' && $$.Native.getCityName(function (cityCode) {
                window.localStorage.setItem('CURR_CITY_MSG', cityCode);
            });
        };

        //  埋点
    	var listenH5Event = function(ancho){
    		if (isNative && ancho && !ApiService.isLocalEnv()) {
    			typeof $$.Native.listenH5Event === 'function' && $$.Native.listenH5Event(ancho);
    		}
    	};

        /**
    	 * 选择日期
    	 * @param {Object} options
    	 */
    	var selectDate = function (options) {
            isNative && typeof $$.Native.selectDate === 'function' && $$.Native.selectDate(options);
    	};
    	/**
    	 * 选择日期
    	 * @param {Object} options
    	 */
    	var selectDateStyle = function (options) {
            isNative && typeof $$.Native.selectDateStyle === 'function' && $$.Native.selectDateStyle(options);
    	};
    	/**
    	 * 设置年龄
    	 * @param {Object} options
    	 */
    	var setAgeAndSex = function (options) {
            isNative && typeof $$.Native.setAgeAndSex === 'function' && $$.Native.setAgeAndSex(options);
    	};
    	/**
    	 * 获取年龄和性别
    	 * @param {Object} options
    	 */
    	var getAgeAndSex = function (options) {
            isNative && typeof $$.Native.getAgeAndSex === 'function' && $$.Native.getAgeAndSex(options);
    	};
    	/**
    	 * 调转好医生界面
    	 */
    	var jumpGoodDoctorWithCallBack = function () {
            isNative && typeof $$.Native.jumpGoodDoctorWithCallBack === 'function' && $$.Native.jumpGoodDoctorWithCallBack();
    	};
    	/**
    	 * 保持当前页面
    	 * @param {Object} options
    	 */
    	var saveCurrentPageMessage = function (options) {
            isNative && typeof $$.Native.saveCurrentPageMessage === 'function' && $$.Native.saveCurrentPageMessage(options);
    	};
    	/**
    	 * 上传照片
    	 * @param {Object} options
    	 */
    	var selectPhotoWithCallBack = function(options) {
            isNative && typeof $$.Native.selectPhotoWithCallBack === 'function' && $$.Native.selectPhotoWithCallBack(options);
    	};
    	/**
    	 * 上传照片
    	 * @param {Object} options
    	 */
    	var selectPhotoWithCallBackCount = function(options) {
            isNative && typeof $$.Native.selectPhotoCounts === 'function' && $$.Native.selectPhotoCounts(options);
    	};
    	/**
    	 * 获取用户信息
    	 * @param {Object} options
    	 */
    	var getNativeUser = function(options) {
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
    	var deleteNativeSymptomWithName = function(imgName) {
            isNative && typeof $$.Native.deleteSymptomWithName === 'function' && $$.Native.deleteSymptomWithName(imgName);
    	};
    	/** 删除图片缓存
    	 *
    	 */
    	var clearNativeSymptomWithCallback = function() {
            isNative && typeof $$.Native.clearSymptomWithCallback === 'function' && $$.Native.clearSymptomWithCallback();
    	};

        var shareImageURL = function(options) {
            isNative && typeof $$.Native.shareImageURL === "function" && $$.Native.shareImageURL(options);
        };

        var getArticle = function(callback) {
            isNative && typeof $$.Native.getArticle === "function" && $$.Native.getArticle(callback);
        };

        return {
            getArticle: getArticle
        };

    })();

    return Service;
});
