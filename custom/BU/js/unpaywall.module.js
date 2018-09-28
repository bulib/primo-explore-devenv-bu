angular
  .module('unpaywall', [])
  .component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<'},
    template: `
      <unpaywall ng-if="$ctrl.show">
        <div layout="flex" ng-if="$ctrl.best_oa_link" class="layout-row" style="margin-top: 5px;">
          <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_lock_open_24px"></prm-icon>
          <a class="arrow-link-button md-primoExplore-theme md-ink-ripple" style="margin-left: 3px; margin-top: 3px;"
             ng-click="$ctrl.trackLinkClick($ctrl.doi)" target="_blank" href="{{$ctrl.best_oa_link}}">
             <strong>Open Access</strong> available via unpaywall
             <span ng-if="$ctrl.showVersionLabel && $ctrl.best_oa_version">&nbsp({{$ctrl.best_oa_version}} version)</span>
          </a>
          <prm-icon link-arrow icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"></prm-icon>
        </div>
        <div ng-if="$ctrl.debug" class="layout-row">
          <table>
            <tr><td><strong>doi</strong></td><td>{{$ctrl.doi}}</td></tr>
            <tr><td><strong>is_OA</strong></td><td>{{$ctrl.is_oa}}</td>
            <tr><td><strong>best_oa_link</strong></td><td>{{$ctrl.best_oa_link}}</td></tr>
            <tr><td><strong>best_oa_version</strong></td><td>{{$ctrl.best_oa_version}}</td></tr>
          </table>
        </div>
      </unpaywall>`,
    controller:
      function unpaywallController(oadoiOptions, gaEventLogger, $scope, $element, $http) {
        var self = this;
        var item = this.parentCtrl.result;
        var onFullView = this.parentCtrl.isFullView || this.parentCtrl.isOverlayFullView;
        self.listOrFullViewLabel = onFullView? 'full' : 'list';
        self.debug = oadoiOptions.debug;
        self.show = onFullView || oadoiOptions.showOnResultsPage;
        self.showVersionLabel = oadoiOptions.showVersionLabel;
        self.trackLinkClick = function(doi){
          console.log("tracking link click via gaEventLogger for doi:"+doi);
          gaEventLogger.logEvent("unpaywall", "usage", self.listOrFullViewLabel);
        };
        try{

          // obtain doi and open access information from the item PNX (metadata)
          var addata = item.pnx.addata;
          if(addata){
            this.doi = addata.hasOwnProperty("doi")? addata.doi[0] : null; //default to first doi (list)
            this.is_oa = addata.hasOwnProperty("oa"); //true if property is present at all (regardless of value)
          }

          // if there's a doi and it's not already open access, ask the oadoi.org for an OA link
          if(this.doi && !this.is_oa){
            gaEventLogger.logEvent('unpaywall', 'api-call', self.listOrFullViewLabel);

            $http.get("https://api.oadoi.org/v2/"+self.doi+"?email="+oadoiOptions.email)
              .then(function(response){
                // if there is a "best open access location", save it so it can be used in the template above
                var best_oa_location = response.data.best_oa_location;
                if(!best_oa_location){ return; /* can't get what we want from unpaywall. returning with nothing*/ }

                // get the "best" content link
                self.best_oa_link = best_oa_location.url || "";
                gaEventLogger.logEvent('unpaywall', 'api-success', self.listOrFullViewLabel);

                // optionally display whether the link to to a published, submitted, or accepted version
                var best_oa_version = best_oa_location.version.toLowerCase() || "";
                if(best_oa_version.includes("publish")){
                  self.best_oa_version = "";
                }else{
                  self.best_oa_version = (best_oa_version.includes("submit"))? "Submitted" : "Accepted";
                }
              }, function(error){
                if(self.debug){
                  console.log(error);
                }
              });
          }
        }catch(e){
          if(self.debug){
            console.log("error caught in unpaywallController: " + e);
          }
        }
      }
  });
