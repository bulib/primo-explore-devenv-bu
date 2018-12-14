//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'secondaryBanner', 'unpaywall', 'wrlcAnnounce']);

// - unpaywall - //
app.constant('oadoiOptions', {
  "email":"aidans@bu.edu",
  "showOnResultsPage":true,
  "showVersionLabel":true,
  "debug":false
});

// - secondary-banner - //
app.constant('secondaryBannerOptions', {
  "titleFragment":"Industry Survey Locator",
  "htmlToInsert":"<h1>Industry Survey Locator</h1>"
});
