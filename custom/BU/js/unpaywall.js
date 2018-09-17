// specify module name and its dependency
angular
  .module('buUnpaywall', [])
  .component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<'},
    template: `
      <bu-unpaywall>
        <div layout="flex" ng-if="$ctrl.best_oa_link" class="layout-row" style="margin-top: 5px;">
          <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_lock_open_24px"></prm-icon>
          <a class="arrow-link-button md-primoExplore-theme md-ink-ripple" style="margin-left: 3px; margin-top: 3px;"
             target="_blank" href="{{$ctrl.best_oa_link}}"><strong>Open Access</strong> available via unpaywall</a>
          <prm-icon link-arrow icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"></prm-icon>
        </div>
        <div class="layout-row">
          <table ng-if="$ctrl.debug">
            <tr><td><strong>doi</strong></td><td>{{$ctrl.doi}}</td></tr>
            <tr><td><strong>is_OA</strong></td><td>{{$ctrl.is_oa}}</td>
            <tr><td><strong>best_oa_link</strong></td><td>{{$ctrl.best_oa_link}}</td></tr>
          </table>
        </div>
      </bu-unpaywall>`,
    controller:
      function unpaywallController(oadoiOptions, $scope, $element, $http) {
        var self = this;
        var item = this.parentCtrl.result;
        self.debug = oadoiOptions.debug;
        try{
          //get at the doi
          var addata = item.pnx.addata;
          if(addata){
            this.doi = addata.hasOwnProperty("doi")? addata.doi[0] : null;
            this.is_oa = addata.hasOwnProperty("oa");
          }
          if(this.doi && !this.is_oa){
            $http.get("https://api.oadoi.org/v2/"+this.doi+"?email="+oadoiOptions.email)
              .then(function(response){
                self.best_oa_link = (response.data.best_oa_location)? response.data.best_oa_location.url : "";
              }, function(error){
                console.log(error);
              });
          }

        }catch(e){
          console.log("error caught in unpaywallController: " + e);
          this.item = null;
        }
      }
  });
