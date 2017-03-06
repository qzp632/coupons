/**
 * 定义与Native相关的事件监听
 */
(function () {

    $$.EventListener = {
        back: function () {
            var scope = angular &&  typeof angular.element === 'function' && angular.element(document.getElementById('viewContent')).scope();
            scope.back();
        },
        jumpToUrl: function(stateName, param){
            var scope = angular.element(document.getElementById('viewContent')).scope();
            scope.jumpToState(stateName, param);
        },
        jumpPreviousPage:function(page){
        	history.go(-1);
        }
    };
})();
