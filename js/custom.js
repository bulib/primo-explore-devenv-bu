(function(){
"use strict";
'use strict';

/*
* load custom view
*/
var app = angular.module('viewCustom', ['angularLoad']);

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-5204430-3', 'auto');
ga('send', 'pageview');

function addProxy() {
  app.controller('prmServiceLinksAfterController', [function () {
    var vm = this;
    var parentCtrl = vm.parentCtrl;
    var baseUrls = window.appConfig['mapping-tables']['Institution Base URLs'];

    vm.$onInit = function () {
      var pnxRecord = vm.parentCtrl.item.pnx;
      var proxy = '';

      // find the proxy URL - N.B. - assumes MT is already Institution-specific (i.e. only one proxy_prefix line)
      angular.forEach(baseUrls, function (value, key) {
        if (value.source2 == 'proxy_prefix') {
          proxy = value.target;
        }
      });

      if (parentCtrl.item.context == "PC" && (typeof pnxRecord.addata.oa == "undefined" || pnxRecord.addata.oa[0] != "free_for_read")) {
        // PC record AND (no addata/oa OR addata/oa does not contain "free_for_read") => proxy
        angular.forEach(parentCtrl.recordLinks, function (value, key) {
          value.linkURL = proxy + value.linkURL;
        });
      }
    };
  }]);

  app.component('prmServiceLinksAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: 'prmServiceLinksAfterController'
  });
}
addProxy();
app.component('prmFavoritesToolBarAfter', {
  bindings: {},
  templateUrl: 'signin.html'
});
})();