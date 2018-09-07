(function(){
"use strict";
'use strict';

/*
* load custom view
*/
var app = angular.module('viewCustom', ['angularLoad']);

var lcjs = document.createElement('script');
lcjs.src = "https://v2.libanswers.com/load_chat.php?hash=d27ec78ed69c9d8969cd01f69fc196f1";
document.head.appendChild(lcjs);
})();