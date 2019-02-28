// import npm packages
import 'primo-explore-report-problem';
import 'primo-explore-unpaywall';

// import other custom modules
import './outbound-link-logger.module';
import './wrlc-announce.module';


// create the main primo-explore module and load in its local and npm-imported dependencies 
angular.module('viewCustom', 
    ['angularLoad', 'bulibUnpaywall', 'outboundLinksLogger', 'reportProblem', 'wrlcAnnounce']
  )

  // configure bulibUnpaywall
  .constant('unpaywallConfig', {
    "email":"aidans@bu.edu",
    "logToConsole":true
  })

  // configure wrlc announce
  .constant('announceConfig', {

    // view/edit the values in this spreadsheet by using the same 'id' (/feeds/list/<ID>/1/public) in the following: (docs.google.com/spreadsheets/d/<SHEET_ID>)
    announceAPI: 'https://spreadsheets.google.com/feeds/list/1ElW0CUOV3LvcHuYxK2BZfFjo65a-XDrlNJtnrelA6tM/1/public/values?alt=json',
    // specify which of the N 'entries' (zero-based row id [not including headers]) you want the info for [defaulted to 0]
    apiEntryNumber: 0,
  
    // get the main data object associated with your desired view
    getData: function(response) { return response.data.feed.entry[this.apiEntryNumber]; },
  
    // obtain the specifically relevant parts of that data object
    getShow:    function(data){ return data.gsx$showbanner.$t;  },
    getMessage: function(data){ return data.gsx$messagetext.$t; },
    getLink:    function(data){ return data.gsx$messagelink.$t; },
    getSeverity:function(data){ return data.gsx$messageseverity.$t; }
  })  

  // load reportProblem component
  .component('prmActionListAfter', {template: '<oca-report-problem />'})
;
