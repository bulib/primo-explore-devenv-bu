// import our npm packages
import 'primo-explore-unpaywall';

//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', 
  ['angularLoad', 'bulibUnpaywall', 'outboundLinksLogger', 'reportProblem',  'wrlcAnnounce']
);

// - reportProblem - //
app.component('prmActionListAfter', {template: '<oca-report-problem />'})

// - unpaywall - //
app.constant('unpaywallConfig', {
  "email":"aidans@bu.edu",
  "showOnResultsPage":true,
  "showVersionLabel":true,
  "logToConsole":true,
  "showDebugTable":false,
  "publishEvents":true
});
