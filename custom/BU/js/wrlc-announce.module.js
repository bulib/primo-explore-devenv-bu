/*
* NOTE: this is based entirely off of [`primo-explore-wrlc-announce](https://github.com/wrlc-primo-dev) and their
*  associated [npm package](https://www.npmjs.com/package/primo-explore-wrlc-announce).
*
* All credit goes to them, and this file is only here until BU-Lib specific functionality can be added to the
*   existing repo (e.g. until [our PR](https://github.com/wrlc-primo-dev/primo-explore-wrlc-announce/pull/8)
*   is merged and the npm package is versioned to where we can use that instead).
*/

angular.module('wrlcAnnounce', ['ngAnimate'])
  .controller('announceController', ['announceConfig', '$http', 
    function(announceConfig, $http){
      var self = this;
      var config = announceConfig;

      // interact with announceAPI helper to set values
      $http.get(config.announceAPI).then(function(response){
        var data = (config.getData)? config.getData(response) : response;

        // check if we want to show the banner or not
        var showFlagEnabled = config.getShow(data) == "TRUE";
        var isEmptyMessage = config.getMessage.length == 0;
        self.show = showFlagEnabled && !isEmptyMessage && !self.dismissed;
        if(!self.show){ return; }

        // get message info using configured functions
        self.message = config.getMessage(data);
        self.link = config.getLink(data);
        self.severity = (config.getSeverity)? config.getSeverity(data) : 'info';
      });

      //respond to user exing out of the banner
      self.wrDismiss = function() {
        self.dismissed = true;
      }
    }
  ])
  .component('prmSearchBarAfter', {
    template: `
      <wrlc-announce ng-hide="$ctrl.dismissed" ng-if="$ctrl.show">
        <style ng-if="$ctrl.show && !$ctrl.dismissed">
          /* add padding under the search bar to make room for banner */ 
          .__sm prm-search-bar { padding-bottom: 50px; }
          prm-search-bar { padding-bottom: 58.5px; }
          .__xs prm-search-bar { padding-bottom: 50px; }
        </style>
        <div id="wrlc-announce-banner" class="layout-align-center-center layout-row flex {{$ctrl.severity}}">
          <prm-icon ng-if="$ctrl.severity=='info'" icon-type="svg" svg-icon-set="action" icon-definition="ic_info_24px"></prm-icon>
          <prm-icon ng-if="$ctrl.severity=='alert'" icon-type="svg" svg-icon-set="action" icon-definition="ic_announcement_24px"></prm-icon>
          <prm-icon ng-if="$ctrl.severity=='warn'" icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>
          <prm-icon ng-if="$ctrl.severity=='success'" icon-type="svg" svg-icon-set="action" icon-definition="ic_check_circle_24px"></prm-icon>
          <span ng-if="$ctrl.link" id="message"><a target="_blank" href="{{$ctrl.link}}" tabindex="0">{{ $ctrl.message }}</a></span>
          <span ng-if="!$ctrl.link" ng-bind-html=$ctrl.message id="message"></span>
    
          <prm-icon id="dismiss" ng-click="$ctrl.wrDismiss()" tabindex="0"
            icon-type="svg" svg-icon-set="navigation" icon-definition="ic_close_24px"></prm-icon>
        </div>
      </wrlc-announce>
    `,
    controller: 'announceController'
  });
