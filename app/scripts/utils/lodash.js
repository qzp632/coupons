'use strict';

/**
 * @ngdoc function
 * @name RstFrontH5.util:lodash
 * @description
 * # Lo-Dash
 * Expose Lo-Dash through injectable factory, so we don't pollute / rely on global namespace
 * just inject lodash as _
 */
SI.factory('_', function($window) {
    return $window._;
});
