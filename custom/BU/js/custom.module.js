//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'oadoiResults', 'oadoi', 'wrlcAnnounce']);

// - unpaywall - //
app.constant('oadoiOptions', {
  "email":"aidans@bu.edu",
  "imagePath":"custom/BU/img/resRec_launch_blue_2x.png",
  "showOnResultsPage":true,
  "showVersionLabel":true,
  "debug":false
});

/*
import * as $ from "jquery";
$('oadoi-results ~ a').on('click', function() {
  console.log("oadoi-results click event");
  _gaq.push(['_trackEvent', 'Unpaywall Brief Result', 'Clicked']);
});

$('oadoi ~ a').on('click', function() {
  console.log("oadoi-full click event");
  _gaq.push(['_trackEvent', 'Unpaywall Full Result', 'Clicked']);
});
*/
