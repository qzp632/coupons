/*
 * 空数据提示指令
 * rst-empty-a
 */
SI.directive('rstEmptyA', function(){
	return {
		restrict: 'E',
		template: '<div class="text-center text-middle height100 empty-a">\
    			<div class="width100">\
    				<img src="images/Doctor-grey.png">\
    				<div class="large-text" style="color : #333;" ng-bind="emptyMsg"></div>\
    			</div>\
    		</div>',
    		replace: true,
    		transclude: false
	};
});
/*
 * 空数据提示指令
 * rst-empty-b
 */
SI.directive('rstEmptyB', function(){
	return {
		restrict: 'E',
		template: '<div class="text-center text-middle height100 empty-b">\
    			<div class="width100">\
    				<img src="images/Doctor.png">\
    				<div class="nolmal-text" ng-bind="emptyMsg"></div>\
    			</div>\
    		</div>',
    		replace: true,
    		transclude: false
	};
});
/*
 * 无网络提示指令
 * rst-errnet-a
 */
SI.directive('rstErrnetA', function(){
    return {
        restrict: 'E',
        template: '<div class="text-center text-middle height100 empty-a">\
                <div class="width100">\
                    <img src="images/errNetwork.png">\
                    <div class="normal-text" ng-bind="errMesInfo"></div>\
                </div>\
            </div>',
            replace: true,
            transclude: false
    };
});
