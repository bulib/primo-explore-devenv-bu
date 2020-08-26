// import helpers
import {module_dependencies, default_config, ENV_PRODUCTION} from './load-helpers';

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
import 'primo-explore-hathitrust-availability';
// import 'primo-explore-help-menu';
import 'primo-explore-outbound-links';
import 'primo-explore-unpaywall';

// import other custom modules
import './no-results.module';
import './help-menu.module';

// import additional content
import {ls_help_menu_items, ls_help_menu_updates} from "../../../helpMenuContents/helpMenuContents";
import {ill_requests_template} from "./account-ill";

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
      var eventMessage = "cat:'"+category+"' act:'"+action+"' label:'"+label+"'";
      if(window.ga){
        window.ga('send', 'event', category, action, label);
        this.logAboutEvent("new '" + category + "' event sent to Google Analytics", debug);
      }else{
        this.logAboutEvent("window.ga not found! cannot log message: '" + eventMessage + "'.", debug);
      }
    }
  })

  // add 'bulib-announce' banner for 'primo-BU', 'primo', 'all'
  .component('prmSearchBarAfter', {
    template: `
      <div id="bulib-announcements">
        <bulib-announce dismissed code="primo-BU"></bulib-announce>
        <bulib-announce dismissed code="primo"></bulib-announce>
      </div>
    `
  })

  // add footer to main content pages (fulldisplay, openurl, permalink)
  .component('prmFullViewContAfter', {template: '<bulib-footer></bulib-footer>'})

  // add sign-in prompt ('.announce-banner') to /favorites page (if not signed in)
  .controller('accountsController', [function(){
    this.showBanner = function(){
      let showBanner = false;
      
      // look for 'Sign In' in the top banner (medium and above)
      let signInElem = document.querySelector("prm-user-area-expandable button");
      showBanner = !!signInElem && (signInElem.innerText.toLowerCase().includes("sign in"));
      
      // on small screens, assume that if there aren't any favorites, you're not signed in
      if(window.innerWidth <= 600){
        signInElem = document.querySelector("prm-search-result-list span.results-count");
        showBanner = !!signInElem && (signInElem.innerText == "0 items");
      }
      return showBanner;
    }
  }])
  .component('prmFavoritesToolBarAfter', {
    controller: 'accountsController',
    template: `
      <div class="announce-banner warn" ng-if="$ctrl.showBanner()">
        Sign in to view My Favorites: <prm-authentication></prm-authentication>
      </div>
    `
  })

  // configure helpMenuConfig || primoExploreHelpMenuStudioConfig
  .constant('helpMenuConfig', {
    "logToConsole":false,
    "publishEvents":true,
    "enableNotificationIndicator":true,
    "notificationIndicatorExpiration": 1000*60*60*24*7, // 1 week
    "list_of_updates":ls_help_menu_updates,
    "list_of_elements":ls_help_menu_items,
    "helpMenuTitle":"Search Menu",
    "helpMenuWidth":550
  })

  // configure outboundLinksConfig
  .constant('outboundLinksConfig', default_config)
  
  // add bulib-unpaywall and hathi-trust-availability to result list/full display 
  .component('prmSearchResultAvailabilityLineAfter', {
    template: `
      <bulib-unpaywall></bulib-unpaywall>
      <hathi-trust-availability ignore-copyright="true" hide-if-journal="true"></hathi-trust-availability>
    `
  })

  // configure unpaywallConfig || primoExploreUnpaywallStudioConfig
  .constant('unpaywallConfig', {
    "email":"aidans@bu.edu",
    "logToConsole":!ENV_PRODUCTION,
    "publishEvents":ENV_PRODUCTION,
    "overrideOACheck":false
  })

  // load reportProblem component
  .component('prmActionListAfter', {template: '<oca-report-problem />'})

  // add 'Inter-Library Loans' tile to /account 
  .component('prmRequestsAfter', {template: ill_requests_template})
  .component('prmRequestsOverviewAfter', {template: ill_requests_template})
;
