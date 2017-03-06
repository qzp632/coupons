/**
* 深圳模块
* data 2017.2.14
* yangyun799
*/

'use strict';
SI.controller('couponController',
            ['$rootScope',
            '$scope',
            '$state',
            '$stateParams',
            '$ionicPopup',
            '$ionicScrollDelegate',
            '$filter',
            'ApiService',
            'NativeService',
            'couService',
   function($rootScope,
            $scope,
            $state,
            $stateParams,
            $ionicPopup,
            $ionicScrollDelegate,
            filter,
            ApiService,
            ns,
            couService
        ) {

   			$scope.dataTab = [
   				{
   					tabName:"未使用",
   					isColor:true,
                  code:1
   				},
   				{
   					tabName:"已过期",
   					isColor:false,
                  code:2
   				},
   				{
   					tabName:"已使用",
   					isColor:false,
                  code:3
   				}
   			];

   			$scope.con1 = true;

            $scope.couponInit = function(){
               couService.getcoupon.apply($scope);
            }

   			$scope.jumpTab = function(item,key) {
   				angular.forEach($scope.dataTab,function(items){
   					if(item.tabName == items.tabName){
   						items.isColor = true;
   					}else{
   						items.isColor = false;
   					}
   				});

   				if(key == 0){
   					$scope.con1 = true;
   					$scope.con2 = false;
   					$scope.con3 = false;
   				}
   				if(key == 1){
   					$scope.con1 = false;
   					$scope.con2 = true;
   					$scope.con3 = false;
   				}
   				if(key == 2){
   					$scope.con1 = false;
   					$scope.con2 = false;
   					$scope.con3 = true;
   				}
   			}

   			$scope.jumpIon = function(item){
               item.isIon = !item.isIon
   			}
        }
]);
