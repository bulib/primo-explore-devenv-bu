// import helpers
import {module_dependencies, default_config} from './load-helpers';

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

const INCLUDE_GOOGLE_ANALYTICS = true;
if(INCLUDE_GOOGLE_ANALYTICS){
  ga('create', 'UA-5204430-3', 'auto');
  ga('send', 'pageview');
}

// import npm packages
import 'primo-explore-help-menu';
import 'primo-explore-outbound-links';
import 'primo-explore-unpaywall';

// import other custom modules
import './wrlc-announce.module';

// create the main primo-explore module and load in its local and npm-imported dependencies 
angular.module('viewCustom', module_dependencies)

  // google analytics 
  .run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
    $rootScope.$on('$locationChangeSuccess', function(event){
      if(INCLUDE_GOOGLE_ANALYTICS){
        $window.ga('send', 'pageview', {location: $location.url()});
      }
    });
  }])
  .service('gaEventLogger', function(){
    this.logAboutEvent = function(message, debug=false){
      if(debug){ console.log("gaEventLogger) " + message); }
    }
    this.logEvent = function(category="", action="", label="", debug=false){
      var eventMessage = "cat:'"+category + "' act:'"+action + "' label:'"+label+"'";
      if(window.ga){
        window.ga('send', 'event', category, action, label);
        this.logAboutEvent("new '" + category + "' event sent to Google Analytics", debug);
      }else{
        this.logAboutEvent("window.ga not found! cannot log message: '" + eventMessage + "'.", debug);
      }
    }
  })

  // configure helpMenuConfig || primoExploreHelpMenuStudioConfig
  .constant('helpMenuConfig', default_config)

  // configure outboundLinksConfig
  .constant('outboundLinksConfig', default_config)
  
  // configure unpaywallConfig || primoExploreUnpaywallStudioConfig
  .component('prmSearchResultAvailabilityLineAfter', {
    template: '<bulib-unpaywall></bulib-unpaywall>'
  })
  .constant('unpaywallConfig', {
    "email":"aidans@bu.edu",
    "logToConsole":true,
    "publishEvents":false
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
