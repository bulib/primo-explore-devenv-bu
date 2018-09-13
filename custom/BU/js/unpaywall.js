// specify module name and its dependency
angular.module('bu-unpaywall', [])

  .component('prmBriefResultAfter', {
    bindings: { parentCtrl: '<'},
    template: `
      <oa-access>
        <table>
          <tr><td><strong>doi</strong></td><td>{{$ctrl.doi}}</td></tr>
          <tr><td><strong>fulltext</strong></td><td>{{$ctrl.fulltext}}</td>
          <tr><td><strong>linktorcsc</strong></td><td>{{$ctrl.linktorcsc}}</td></tr>
        </table>
      </oa-access>`,
    controller:
      function unpaywallController($scope, $element) {
        var item = this.parentCtrl.item;
        try{
          // set known conditional data
          this.fulltext = item.pnx.delivery.fulltext[0];
          this.linktorcsc = item.pnx.links.linktorcsc;

          //get at the doi
          var addata = item.pnx.addata;
          console.log(addata);
          this.doi = (addata.hasOwnProperty("doi"))? addata.doi[0] : null;
        }catch(e){
          this.item = null;
        }
        console.log(item);
      }
  });
