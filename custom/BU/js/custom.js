(function(){
"use strict";
'use strict';

//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'wrlcAnnounce']);

// - helper code for announcment banner ['wrlcAnnounce'] - //
app.constant('announceConfig', {

    // view/edit the values in the regular view by using the same 'id' (/feeds/list<ID>/1/public below) in the following: (docs.google.com/spreadsheets/d/<SHEET_ID>)
    announceAPI: 'https://spreadsheets.google.com/feeds/list/1dhGFCdOYlEG-DxkNs5F94WnHEmEIyTllQKhhWWtmmIE/1/public/values?alt=json',

    // update the entry number depending on the relevant view (BU:0, BULAW:)
    getShow: function getShow(response) {
        return response.data.feed.entry[0].gsx$bannershow.$t;
    },
    getMessage: function getMessage(response) {
        return response.data.feed.entry[0].gsx$bannermessage.$t;
    },
    getLink: function getLink(response) {
        return response.data.feed.entry[0].gsx$bannerlink.$t;
    }
});

var lcjs = document.createElement('script');
lcjs.src = "https://v2.libanswers.com/load_chat.php?hash=0b9beff60316d9b71b1de06909bdf5c1";
document.head.appendChild(lcjs);

angular.element(document).ready(function () {
    if (window.location.href.indexOf('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu') > 0) {
        var n = window.location.href.replace('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu', 'buprimo.hosted.exlibrisgroup.com');
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

angular
// Define the module name
.module('wrlcAnnounce', ['ngAnimate']).component('prmSearchBarAfter', {
    template: '\n            <wrlc-announce ng-show="!$ctrl.dismissed" ng-if="$ctrl.show">\n                <div id="wrlc-announce-banner" class="layout-align-center-center layout-row flex">\n                    <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_announcement_24px" id="wrlc-announce-icon"></prm-icon>\n                    <span ng-if="$ctrl.link" id="message"><a href="{{$ctrl.link}}">{{ $ctrl.message }}</a></span>\n                    <span ng-if="!$ctrl.link" id="message">{{ $ctrl.message }}</span>\n\t        <button id="dismiss-announcement" area-label="dismiss announcement" class="dismiss-alert-button zero-margin md-button md-primoExplore-theme md-ink-ripple button-with-icon" type="button" ng-click="$ctrl.wrDismiss()">\n\t        \t<prm-icon icon-type="svg" svg-icon-set="navigation" icon-definition="ic_close_24px" class="material-icons gray"></prm-icon>\n\t\t</button>\n                </div>\n            </wrlc-announce>\n            ',
    controller: function announceController(announceConfig, $http) {

        var self = this;
        var config = announceConfig;

        // get show announcement
        $http.get(config.announceAPI).then(function (response) {
            // Test if we want to show the banner or not
            if (config.getShow(response) == "TRUE") {
                self.show = true;
            } else {
                self.show = false;
            }
            // get message and link using configured functions
            self.message = config.getMessage(response);
            self.link = config.getLink(response);
        });
        self.wrDismiss = function () {
            self.dismissed = true;
        };
    }

});
})();