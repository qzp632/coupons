/**
 * @ngdoc service
 * @name RstFrontH5.ApiService
 * @description
 */
SI.factory('ApiService', function ($window, $http, $q, $timeout,
    $ionicLoading, $state, siConfig,NativeService) {
    'use strict';
    /** 绍兴市本级 330699 三亚 460200**/
    /**  ApiService重构start **/


    var http_token = '367a22290f524272a06e9f4a45c773ba',http_zoneCode = '510900';

    var isNative = window.$$ && $$.Native;
    var isNativeEvent = window.$$ && $$.EventListener;

    var banEvenPoint = {//按钮连点事件触发
        time:[],//记录可点击时间
        banEvenPoint:function(loopTime,success,error){//禁止连点
            var time = this.time;
            var loopTime = loopTime || 0;//禁止点击时限毫秒
            var currentTime = (new Date()).getTime();
            if(time.length == 0){
                time[0] = currentTime;
                success();
            }else{
                if((currentTime - time[0])>loopTime){
                    time[0] = currentTime;
                    success();
                }else{
                    error();
                }
            }
        }
    };

    function backCommon(type,backFunction){//构造函数－返回
        this.type = type;
        this.backFunction = backFunction;
        this.back();
        this.androidBack();
    };

    backCommon.prototype.back = function() {
        if(this.backFunction){
            this.backFunction();
        }else{
            if(this.type == 1){
                history.back();
            }else{
                NativeService.interectWithNative("backToRootModule",[""]);
            }
        }
    };

    backCommon.prototype.androidBack = function(){
        if (isNativeEvent && typeof $$.EventListener.back === 'function') {
            $$.EventListener.back = this.back;
        };
    };

    function talkIngDataFn(options){//构造函数－埋点
        this.functionName = "talkIngDataForH5";
        this.params = options.paramArr;
        this.callback = options.callback || function(){};
        this.talkIng();
    };

    talkIngDataFn.prototype.talkIng = function(){
        if(!!!this.params){return};
        NativeService.interectWithNative(this.functionName,this.params,this.callback);
    };
    /**  ApiService重构end **/

    var apiMode = siConfig.statu; // dev || dev-http || dev-fake
    var isLocalEnv = function () {
        return apiMode === 'dev-fake';
    };

    var isProEnv = !isLocalEnv() && isNative;
    var endPoint = '';
    //
    var setApiMode = function (mode) {
        apiMode = mode;
    };

    var getApiMode = function () {
        return apiMode;
    };

    var showLoading = function () {
        if (isLocalEnv()) {// Native端提供加载动画
            $ionicLoading.show({
                template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
                delay: 500,
                noBackdrop: true,
                hideOnStateChange: true
            });
        }
    };

    var hideLoading = function () {
        $ionicLoading.hide();
    };

    switch (apiMode) {
        case 'stg'     : endPoint = siConfig.serverName_stg; break;
        case 'prd'     : endPoint = siConfig.serverName_prd; break;
        case 'dev'     : endPoint = siConfig.serverName_dev; break;
        case 'dev-http': endPoint = siConfig.serverName_dev; break;
        default:
    }

    var bSkipNextPageTransition = false;

    var skipNextPageTransition = function(bSkip){
        if (bSkip === undefined) return bSkipNextPageTransition;
        bSkipNextPageTransition = bSkip;
    };

    var getEndPoint = function () {
        return endPoint;
    };

    var setEndPoint = function (ep) {
        endPoint = ep;
    };

    var backToHome = function () {
        isNative && $$.Native.backToRootModule();
    };

	var showFooterMenu = function () {
        isNative && typeof $$.Native.changeMenu === 'function' && $$.Native.changeMenu('1');
    };

    var hideFooterMenu = function () {
        isNative && typeof $$.Native.changeMenu === 'function' && $$.Native.changeMenu('0');
    };

    //解析param参数
    var resolveParams = function (params) {
        if (!params  || params === '') {
          return;
        }
        var addUrl = '';
        for (var obj in params) {
            addUrl += obj+'='+params[obj]+'&';
        }
        return addUrl.substr(0, addUrl.length-1);
    };

    var extendPromise = function (promise) {

        promise.success = function(fn) {
            promise.then(function(response) {
                // fn(response.data, response.status, response.headers, config);
                fn(response);
            });
            return promise;
        };

        promise.error = function(fn) {
            promise.then(null, function(response) {
                fn(response);
            });
            return promise;
        };
    };

    var requestFake = function (returnData, bShowLoading, forceFailed, delayTime) {

        var deferred = $q.defer();
        extendPromise(deferred.promise);

        if (bShowLoading) {
            showLoading();
        }

        var successPromiseFuncWrapper = function (response) {
            if (bShowLoading) {
                hideLoading();
            }

            deferred.resolve(response);

        };

        var errorPromiseFuncWrapper = function (response) {

            if (bShowLoading) {
                hideLoading();
            }

            deferred.reject(response);
        };

        if (!delayTime) {
            delayTime = 1;
        }

        var timer = $timeout(function() {
            if (forceFailed) {
                errorPromiseFuncWrapper(returnData);
            } else {
                successPromiseFuncWrapper(returnData);
            }
        }, delayTime);

        return deferred.promise;
    };

    var request = function (type, url, data, bShowLoading) {

        if (undefined === bShowLoading) {
            bShowLoading = true;
        }

        var deferred = $q.defer();

        extendPromise(deferred.promise);

        var successPromiseFuncWrapper = function (response) {
            deferred.resolve(response);
            if (bShowLoading) {
                hideLoading();
            }
        };

        var errorPromiseFuncWrapper = function (response) {
            deferred.reject(response);
            if (bShowLoading) {
                hideLoading();
            }
        };

        if (bShowLoading) {
            showLoading();
        }

        var requestBody = {
            'url': url,
            'type': type,
            'data': data,
            'success': successPromiseFuncWrapper,
            'error': errorPromiseFuncWrapper
        };

        if (!url && data === 'test') {

            var timer = $timeout(function() {
                successPromiseFuncWrapper(data);
            }, 2000);

        } else {

            //如果使用了get请求方式，将进行url拼接字符模式
            if (type === 'GET' || type === 'get' || type === 'Get') {
                if (data) {
                    url = url +'?'+resolveParams(data);
                } else {
                    url = url;
                }
            }

            var config;
            //本次请求将通过$http请求方式发送请求
            if (apiMode === 'dev-http') {

                var url = getEndPoint() + url;

                if (type === 'GET' || type === 'get' || type === 'Get') {
                    config = {
                        method : type,
                        cache  : false,
                        url    : url,
                        headers: {
                            Token   : http_token,
                            zoneCode: http_zoneCode
                        }
                    };

                } else {
                    config = {
                        method : type,
                        cache  : false,
                        url    : url,
                        data   : data,
                        headers: {
                            Token   : http_token,
                            zoneCode: http_zoneCode
                        }
                    };
                }

                $http(config).success(function (response) {
                    successPromiseFuncWrapper(response);
                })
                .error(function (response) {
                    errorPromiseFuncWrapper(response);
                });

            } else {

                var timer = $timeout(function () {
                    hideLoading()
                }, 7000);
                isNative && typeof $$.Native.request === 'function' && $$.Native.request(requestBody);

            }
        }

        return deferred.promise;
    };

    var requestThird = function (type, url, data, bShowLoading) {//霓蝶第三方

        if (undefined === bShowLoading) {
            bShowLoading = true;
        }

        var deferred = $q.defer();

        extendPromise(deferred.promise);

        var successPromiseFuncWrapper = function (response) {
            deferred.resolve(response);
            if (bShowLoading) {
                hideLoading();
            }
        };

        var errorPromiseFuncWrapper = function (response) {
            deferred.reject(response);
            if (bShowLoading) {
                hideLoading();
            }
        };

        if (bShowLoading) {
            showLoading();
        }

        var requestBody = {
            'url': url,
            'type': type,
            'data': data,
            'success': successPromiseFuncWrapper,
            'error': errorPromiseFuncWrapper
        };

        if (!url && data === 'test') {

            var timer = $timeout(function() {
                successPromiseFuncWrapper(data);
            }, 2000);

        } else {

            //如果使用了get请求方式，将进行url拼接字符模式
            if (type === 'GET' || type === 'get' || type === 'Get') {
                if (data) {
                    url = url +'?'+resolveParams(data);
                } else {
                    url = url;
                }
            }

            var config;
            //本次请求将通过$http请求方式发送请求
            if (apiMode === 'dev-http') {

                var url = getEndPoint() + url;

                if (type === 'GET' || type === 'get' || type === 'Get') {
                    config = {
                        method : type,
                        cache  : false,
                        url    : url,
                        headers: {
                            Token   : http_token,
                            zoneCode: http_zoneCode
                        }
                    };

                } else {
                    config = {
                        method : type,
                        cache  : false,
                        url    : url,
                        data   : data,
                        headers: {
                            Token   : http_token,
                            zoneCode: http_zoneCode
                        }
                    };
                }

                $http(config).success(function (response) {
                    successPromiseFuncWrapper(response);
                })
                .error(function (response) {
                    errorPromiseFuncWrapper(response);
                });

            } else {

                var timer = $timeout(function () {
                    hideLoading()
                }, 7000);
                $$.Native.requestThird(requestBody);

            }
        }

        return deferred.promise;
    };

    var requestNoHud = function (type, url, data) {
        var deferred = $q.defer();


        extendPromise(deferred.promise);

        var successPromiseFuncWrapper = function (response) {
            deferred.resolve(response);
        };
        var errorPromiseFuncWrapper = function (response) {
          console.log('error', response);
            deferred.reject(response);
        };
        var requestBody = {
            'url': url,
            'type': type,
            'data': data,
            'success': successPromiseFuncWrapper,
            'error': errorPromiseFuncWrapper
        };

        if (!url && data === 'test') {
            var timer = $timeout(function () {
                successPromiseFuncWrapper(data);
            }, 2000);
        } else {
            //如果使用了get请求方式，将进行url拼接字符模式
            if (type === 'GET' || type === 'get' || type === 'Get') {
                if (data) {
                    url = url +'?'+resolveParams(data);
                } else {
                    url = url;
                }
            }
            var config;
            //本次请求将通过$http请求方式发送请求
            if (apiMode === 'dev-http') {

                var url = getEndPoint() + url;
                if (type === 'GET' || type === 'get' || type === 'Get') {
                    config = {
                        method : type,
                        cache : false,
                        url : url,
                        headers : {
                            Token : http_token,
                            zoneCode: http_zoneCode
                        }
                    };

                } else {

                    config = {
                        method : type,
                        cache : false,
                        url : url,
                        data : data,
                        headers : {
                            Token : http_token,
                            zoneCode: http_zoneCode
                        }
                    };
                }
                $http(config).success(function (response) {
                    successPromiseFuncWrapper(response);
                }).error(function (response) {
                    errorPromiseFuncWrapper(response);
                });

            } else {
                var timer = $timeout(function () {
                    hideLoading()
                }, 7000);
                isNative && typeof $$.Native.requestNoHud === 'function' && $$.Native.requestNoHud(requestBody);
            }
        }
        return deferred.promise;
    };

	var showHud = function () {
        isNative && typeof $$.Native.changeMenu === 'function' && $$.Native.hudState('1');
	}

	var hideHud = function () {
        isNative && typeof $$.Native.changeMenu === 'function' && $$.Native.hudState('0');
	}

    var uploadNoHud = function(type,sign,url,data){
      var deferred = $q.defer();
      extendPromise(deferred.promise);
      var successPromiseFuncWrapper = function(response){

        alert("OK");
          deferred.resolve(response);
      };
      var errorPromiseFuncWrapper = function(response){
        alert("NO");
        deferred.reject(response);
      };
      var requestBody = {
        'url': url,
        'sign':sign,
        'type': type,
        'data': data,
        'success': successPromiseFuncWrapper,
        'error': errorPromiseFuncWrapper
      };
      var timer = $timeout(
          function() {
            hideLoading()
          }, 7000);
      isNative && typeof $$.Native.getCityName === 'function' && $$.Native.uploadNoHud(requestBody);
      return deferred.promise;
    };

    var getCurrCityName = function () {
        isNative && typeof $$.Native.getCityName === 'function' && $$.Native.getCityName(function (cityCode) {

            window.localStorage.setItem('CURR_CITY_MSG', cityCode);
        });
    };

    var uploadPhoto = function(path, callback) {
        var options = {
            path    : path,
            callback: callback
        };
        isNative && typeof $$.Native.uploadPhoto === 'function' && $$.Native.uploadPhoto(options);
    };

    /** 市民卡照片上传 **/
    var uploadCityCardPhoto = function(options) {
        isNative && typeof $$.Native.uploadCityCardPhoto === 'function' && $$.Native.uploadCityCardPhoto(options);
    };

    /** 市民卡获取 姓名 身份证号 社保卡号 **/
    var getPersonalInfo = function (options) {
        isNative && typeof $$.Native.getPersonalInfo === 'function' && $$.Native.getPersonalInfo(options);
    };


    // public api
    return {
        getEndPoint           : getEndPoint,
        setEndPoint           : setEndPoint,
        isLocalEnv            : isLocalEnv,
        backToHome            : backToHome,
        request               : request,
        requestThird          : requestThird,
        requestNoHud          : requestNoHud,
        showHud               : showHud,
        hideHud               : hideHud,
        getApiMode            : getApiMode,
        setApiMode            : setApiMode,
        requestFake           : requestFake,
        showLoading           : showLoading,
        hideLoading           : hideLoading,
        showFooterMenu        : showFooterMenu,
        hideFooterMenu        : hideFooterMenu,
        uploadNoHud           : uploadNoHud,
        getCurrCityName       : getCurrCityName,
        skipNextPageTransition: skipNextPageTransition,
        uploadPhoto           : uploadPhoto,
        uploadCityCardPhoto   : uploadCityCardPhoto,
        getPersonalInfo       : getPersonalInfo,

        ///
        banEvenPoint                : banEvenPoint,
        backCommon : backCommon,
        talkIngDataFn : talkIngDataFn
    };
});
