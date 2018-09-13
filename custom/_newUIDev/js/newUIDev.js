(function(){
"use strict";
'use strict';

/*
* load custom view
*/
var app = angular.module('viewCustom', ['angularLoad']);

angular.element(document).ready(function () {
    if (window.location.href.indexOf('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu') > 0) {
        var n = window.location.href.replace('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu', 'buprimo.hosted.exlibrisgroup.com');
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
})();