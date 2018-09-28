//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'unpaywall', 'wrlcAnnounce'/*, 'angular-google-analytics'*/]);

// - unpaywall - //
app.constant('oadoiOptions', {
  "email":"aidans@bu.edu",
  "showOnResultsPage":true,
  "showVersionLabel":true,
  "debug":false
});
