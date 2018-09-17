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
          <tr><td><strong>best_oa_link</strong></td><td>{{$ctrl.best_oa_link}}</td></tr>
        </table>
      </oa-access>`,
    controller:
      function unpaywallController($scope, $http) {
        var self = this;
        var item = this.parentCtrl.item;
        try{
          // set known conditional data
          this.fulltext = item.pnx.delivery.fulltext[0];
          if(item.pnx.links.linktorsrc){
            // get the link out of "$$Uhttps://doaj.org/article/bb99cd21e1144744a75b1502e4affaf1$$E..."
            var str = item.pnx.links.linktorsrc[0];
            this.linktorsrc = str.substring("$$U".length, str.lastIndexOf("$$E"));
          }

          //get at the doi
          var addata = item.pnx.addata;
          if(addata.hasOwnProperty("doi")){
            this.doi = addata.doi[0];
            $http.get("https://api.oadoi.org/v2/"+this.doi+"?email=aidans@bu.edu")
              .then(function(response){
                self.best_oa_link = response.data.best_oa_location.url;
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
