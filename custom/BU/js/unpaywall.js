// specify module name and its dependency
angular
  .module('bu-unpaywall', [])
  .component('prmBriefResultAfter', {
    bindings: { parentCtrl: '<'},
    template: `
      <oa-access>
        <table>
          <tr><td><strong>doi</strong></td><td>{{$ctrl.doi}}</td></tr>
          <tr><td><strong>fulltext</strong></td><td>{{$ctrl.fulltext}}</td>
          <tr><td><strong>linktorsrc</strong></td><td>{{$ctrl.linktorsrc}}</td></tr>
          <tr><td><strong>best_oa_location</strong></td><td>{{$ctrl.best_oa_location}}</td></tr>
        </table>
      </oa-access>`,
    controller:
      function unpaywallController($scope, $http) {
        var item = this.parentCtrl.item;
        try{
          //console.log(item.pnx);

          // set known conditional data
          this.fulltext = item.pnx.delivery.fulltext[0];

          // set linktorsrc
          if(item.pnx.links.linktorsrc){
            // get the link out of "$$Uhttps://doaj.org/article/bb99cd21e1144744a75b1502e4affaf1$$E..."
            var str = item.pnx.links.linktorsrc[0];
            this.linktorsrc = str.substring("$$U".length, str.lastIndexOf("$$E"));
          }

          //get at the doi
          var addata = item.pnx.addata;
          if(addata.hasOwnProperty("doi")){
            this.doi = addata.doi[0];
            var url="https://api.oadoi.org/v2/"+this.doi+"?email=aidans@bu.edu";

            //$http.defaults.headers.common = { 'X-From-ExL-API-Gateway': undefined }
            var best_oa_link = $http.get(url)
              .then(function(response){
                console.log(response.data.best_oa_location.url);
                return response.data.best_oa_location.url;
              }, function(error){
                console.log(error);
                return "_nope_";
              }).$$state;
            console.log(best_oa_link.value);
            this.best_oa_location = best_oa_link;
          }

        }catch(e){
          console.log("error caught in unpaywallController: " + e);
          this.item = null;
        }
      }
  });
