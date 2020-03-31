import {addLibchatWidgetWithHash, addScriptToHead} from '../../CENTRAL_PACKAGE/js/header-imports.js';

// add JQuery
addScriptToHead("//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js")

// LibChat widget
addLibchatWidgetWithHash("7a4eb50897c2745e69d7fc4057f2b288");

// ez-proxy
angular.element(document).ready(function () {
  if (window.location.href.indexOf('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu') > 0) {
      var n = window.location.href.replace('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu', 'buprimo.hosted.exlibrisgroup.com');
      window.location.assign(n);
  }
});

/* load custom view */
angular.module('viewCustom',['angularLoad'])

// add 'bulib-announce' banner for 'primo-test', 'primo', 'all'
.component('prmSearchBarAfter', {
  template: `
    <div id="bulib-announcements">
      <bulib-announce dismissed code="primo-test"></bulib-announce>
      <bulib-announce dismissed code="primo"></bulib-announce>
    </div>
  `
});
