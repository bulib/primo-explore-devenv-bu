(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

"use strict";
'use strict';

/*
* load custom view
*/

angular.element(document).ready(function () {
  if (window.location.href.indexOf('.ezproxy.bu.edu') > 0) {
    var n = window.location.href.replace('.ezproxy.bu.edu', '');
    window.location.assign(n);
  }
});

var lcjs = document.createElement('script');
lcjs.src = "https://v2.libanswers.com/load_chat.php?hash=7a4eb50897c2745e69d7fc4057f2b288";
document.head.appendChild(lcjs);

/* Load JQuery */

var js = document.createElement('script');
js.src = "//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js";
document.head.appendChild(js);

//Auto generated code by primo app store DO NOT DELETE!!! -START-
/*
    hookName is a place holder with should hold the hook name not including "prm" at the beginning and in upper camel case
    e.g: for hook prmSearchBarAfter (in html prm-search-bar-after) it should be given "SearchBarAfter"
 */
app.controller('SearchBarAfterController', [function () {
  var vm = this;
}]);

app.component('prmSearchBarAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'SearchBarAfterController',
  template: '\n    <search-bar-sub-menu-studio parent-ctrl="$ctrl.parentCtrl"></search-bar-sub-menu-studio>\n'

});

//Auto generated code by primo app store DO NOT DELETE!!! -END-

//Auto generated code by primo app store DO NOT DELETE!!! -START-
app.constant('searchBarSubMenuStudioStudioConfig', [{ "name": "See here for more information about accessing Course Reserves", "description": "Information about accessing course reserves", "action": "http://www.bu.edu/library/services/reserves/", "cssClasses": "bulsSubMenuNav" }]);
//Auto generated code by primo app store DO NOT DELETE!!! -END-
//Auto generated code by primo app store DO NOT DELETE!!! -START-
angular.module('searchBarSubMenu', []).controller('searchBarSubMenuStudioController', ['searchBarSubMenuStudioStudioConfig', '$scope', '$filter', function (items, $scope, $filter) {
  this.$onInit = function () {
    $scope.items = items;
  };
  $scope.translate = function (original) {
    return original.replace(/\{(.+)\}/g, function (match, p1) {
      return $filter('translate')(p1);
    });
  };
  $scope.goToUrl = function (url) {
    window.open(url, '_blank');
  };
}]).component('searchBarSubMenuStudio', {
  controller: 'searchBarSubMenuStudioController',
  template: '<div class="layout-align-end-center layout-row flex search-bar-sub-menu">\n  <ul>\n    <li ng-repeat="item in items">\n    <button data-href="{{ translate(item.action) }}" aria-label="{{ translate(item.description) }}" ng-click="goToUrl(translate(item.action))" class="button-with-icon zero-margin md-button md-small {{item.cssClasses}}" type="button">\n      <md-tooltip md-direction="bottom" md-delay="500">{{ translate(item.description) }}</md-tooltip><prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{item.iconSet}}" icon-definition="{{item.iconName}}"></prm-icon>\n      <span class="search-bar-sub-menu-item" ng-class="(item.show_xs) ? \'\' : \'hide-xs\'">{{ translate(item.name) }}</span>\n    </button>\n    </li>\n  </ul>\n</div>'
});

app.requires.push('searchBarSubMenu');
//Auto generated code by primo app store DO NOT DELETE!!! -END-
})();
