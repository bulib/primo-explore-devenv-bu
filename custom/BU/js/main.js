
// import our npm packages
import 'primo-explore-report-problem';
import 'primo-explore-unpaywall';

// import other
// import './outbound-link-logger.module';
// import './wrlc-announce-config.module';
// import './wrlc-announce.module';
// import './ga';
import './ezproxy';
import './LibChatBU';

//load app 'viewCustom' as a module with [] dependencies
let app = angular.module('viewCustom', 
    ['angularLoad', 'bulibUnpaywall', 'reportProblem']
);

// - reportProblem - //
app.component('prmActionListAfter', {template: '<oca-report-problem />'});

// - unpaywall - //
app.constant('unpaywallConfig', { 
    "email":"aidans@bu.edu",
    "logToConsole":true
});
