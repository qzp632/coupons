/**
* 深圳模块
* data 2017.2.20
*/
'usr strict';
SI.controller('walletIndexController',
            ['$rootScope',
            '$scope',
            '$state',
            '$stateParams',
            '$ionicPopup',
            '$ionicScrollDelegate',
            '$filter',
            'ApiService',
            'NativeService',
        function(
            $rootScope,
            $scope,
            $state,
            $stateParams,
            $ionicPopup,
            $ionicScrollDelegate,
            filter,
            ApiService,
            ns
            ) {

            $scope.jumpToCoupon = function() {
                $state.go('app.coupon');
            };
}]);
