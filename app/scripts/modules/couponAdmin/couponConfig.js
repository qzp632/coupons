/**
* 深圳模块
* data 2017.2.14
* yangyun799
*/

'use strict';
SI.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app.myWalletIndex',{ //我的钱包首页
            url:'/myWalletIndex',
            cache:false,
            views: {
                viewContent: {
                    templateUrl:'templates/views/couponAdmin/myWalletIndex.html',
                    controller: 'walletIndexController'
                }
            }
        })
        .state('app.coupon',{ //我的优惠券
            url:'/coupon',
            cache: false,
            views: {
                viewContent: {
                    templateUrl: 'templates/views/couponAdmin/coupon.html',
                    controller : 'couponController'
                }
            }
        });
});
