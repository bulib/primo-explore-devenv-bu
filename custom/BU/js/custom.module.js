//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'bu-unpaywall', 'oadoi', 'wrlcAnnounce']);

// unpaywall
app.constant('oadoiOptions', {
  "email":"aidans@bu.edu",
  "imagePath":"custom/BU/img/resRec_launch_blue_2x.png"
});
