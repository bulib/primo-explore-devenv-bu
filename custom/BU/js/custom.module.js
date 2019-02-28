// import our npm packages
import 'primo-explore-unpaywall';

//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', 
    ['angularLoad', 'outboundLinksLogger', 'reportProblem',  'wrlcAnnounce', 'bulibUnpaywall']
  ).constant('unpaywallConfig', {
    "email":"aidans@bu.edu"
  });

// - reportProblem - //
app.component('prmActionListAfter', {template: '<oca-report-problem />'})