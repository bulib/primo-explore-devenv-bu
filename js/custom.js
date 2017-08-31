(function(){
"use strict";
'use strict';

/*
* load custom view
*/
var app = angular.module('viewCustom', ['angularLoad']);

var lcjs = document.createElement('script');
lcjs.src = "https://v2.libanswers.com/load_chat.php?hash=0b9beff60316d9b71b1de06909bdf5c1";
document.head.appendChild(lcjs);

angular.element(document).ready(function () {
  if (window.location.href.indexOf('.ezproxy.bu.edu') > 0) {
    var n = window.location.href.replace('.ezproxy.bu.edu', '');
    window.location.assign(n);
  }
});

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-5204430-3', 'auto');
ga('send', 'pageview');

app.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
  $rootScope.$on('$locationChangeSuccess', function (event) {
    $window.ga('send', 'pageview', { location: $location.url() });
  });
}]);
})();