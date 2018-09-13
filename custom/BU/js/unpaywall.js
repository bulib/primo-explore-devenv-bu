// specify module name and its dependency
angular.module('bu-unpaywall', [])

  .component('prmBriefResultAfter', {
    bindings: { parentCtrl: '<'},
    template: `
      <oa-access>
        <table>
          <tr><td><strong>doi</strong></td><td>{{$ctrl.doi}}</td></tr>
          <tr><td><strong>fulltext</strong></td><td>{{$ctrl.fulltext}}</td>
          <tr><td><strong>linktorsrc</strong></td><td>{{$ctrl.linktorsrc}}</td></tr>
          <tr><td><strong>best_oa_location</strong></td><td></td></tr>
        </table>
      </oa-access>`,
    controller:
      function unpaywallController(oadoiHelper, $scope, $element) {
        var item = this.parentCtrl.item;
        try{
          console.log(item.pnx);

          // set known conditional data
          this.fulltext = item.pnx.delivery.fulltext[0];

          // set linktorsrc
          if(item.pnx.links.linktorsrc){
            // e.g. get the link out of "$$Uhttps://doaj.org/article/bb99cd21e1144744a75b1502e4affaf1$$E..."
            var str = item.pnx.links.linktorsrc[0];
            this.linktorsrc = str.substring("$$U".length, str.lastIndexOf("$$E"));
          }

          //get at the doi
          var addata = item.pnx.addata;
          this.doi = (addata.hasOwnProperty("doi"))? addata.doi[0] : null;


          }
        }catch(e){
          console.log("error caught in unpaywallController: " + e);
          this.item = null;
        }
      }
  });
