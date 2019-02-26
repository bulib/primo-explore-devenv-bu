//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'outboundLinksLogger', 'unpaywall', 'wrlcAnnounce']);

// - unpaywall - //
app.constant('unpaywallConfig', {
  "email":"aidans@bu.edu",
  "showOnResultsPage":true,
  "showVersionLabel":true,
  "logToConsole":true,
  "showDebugTable":false,
  "publishGAEvents":true,
  "logEvent":function(category, action, label, logToConsole=true, sendToGA=false){
    if(logToConsole){ console.log("eventLogger) sending '" + category + "' event sent to Google Analytics [publish=" + sendToGA + "]."); }
    if(sendToGA){ window.ga('send', 'event', category, action, label); }
  }
});
