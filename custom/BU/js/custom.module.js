//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'helpMenuTopbar', 'outboundLinksLogger', 'unpaywall', 'wrlcAnnounce']);

// - unpaywall - //
app.constant('oadoiOptions', {
  "email":"aidans@bu.edu",
  "showOnResultsPage":true,
  "showVersionLabel":true,
  "debug":false
});
