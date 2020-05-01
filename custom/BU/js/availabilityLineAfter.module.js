app.module('availabilityCustomizations', [])
  .controller('availabilityCustomizationsController', [ '$scope', 
    function($scope){
      
      // provide BrowZine script with the scope object 
      window.browzine.primo.searchResult($scope);
      
      // prepare and log SMS-Link related functions
      console.log(this);

      // what is it?
      try {
          this.category = this.parentCtrl.result.delivery.GetIt1[0].category;
      } catch (e) {
          this.category = "";
      }

      // translate category type to display text
      if (this.category === "Alma-P") {
          this.online = false;
      }

      // title
      try {
          this.title = this.parentCtrl.result.pnx.addata.btitle[0];
      } catch (e) {
          this.title = "";
      }

      // author
      try {
          this.author = this.parentCtrl.result.pnx.addata.au[0];
      } catch (e) {
          this.author = "";
      }

      // isbn
      try {
          this.isbn = this.parentCtrl.result.pnx.addata.identifier[0];
      } catch (e) {
          this.isbn = "";
      }

      // publication date
      try {
          this.date = this.parentCtrl.result.pnx.addata.date[0];
      } catch (e) {
          this.date = "";
      }

      // publisher
      try {
          this.date = this.parentCtrl.result.pnx.addata.pub[0];
      } catch (e) {
          this.pub = "";
      }

      // call number
      try {
          var theCallNumber = this.parentCtrl.result.delivery.bestlocation.callNumber;
          theCallNumber = theCallNumber.replace(/^[(\s]+/, "");
          theCallNumber = theCallNumber.replace(/[)\s]+$/, "");
          this.callNumber = theCallNumber;
      } catch (e) {
          this.callNumber = "";
      }

      // location
      try {
          this.location = this.parentCtrl.result.delivery.bestlocation.mainLocation;
      } catch (e) {
          this.location = "";
      }

      // sublocation
      try {
          this.subLocation = this.parentCtrl.result.delivery.bestlocation.subLocation;
      } catch (e) {
          this.subLocation = "";
      }

      // bibId
      try {
          var theBibId = this.parentCtrl.result.pnx.control.recordid[0];
          this.bibId = theBibId.replace(/^TRIAL_1_INST_ALMA/, "");
      } catch (e) {
          this.bibId = "";
      }

      // this will vary depending on your local requirements... 
      // this.showNotOnShelfLink = this.parentCtrl.result.pnx.control.sourcesystem[0] === "Voyager" && this.title && this.callNumber;

      this.showNotOnShelfLink = Boolean(this.parentCtrl.result.pnx.control.sourcesystem[0] === "Alma" && this.title && this.callNumber);

      //this.showNotifyLink = Boolean(this.location.match(/^MAIN/) && this.callNumber === "");
    }
  ])
    .component('availabilityCustomizations', {
        require: { prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine' },
        template: ' \
            <div class="ic-access-link-area" ng-show="$ctrl.online"> \
                <prm-icon icon-definition="link" icon-type="svg" svg-icon-set="primo-ui"></prm-icon> \
                <a href="{{$ctrl.quickUrl}}" target="_blank">{{$ctrl.quickUrlText}}</a>&nbsp; \
                <prm-icon icon-definition="open-in-new" icon-type="svg" svg-icon-set="primo-ui"></prm-icon> \
                <prm-icon icon-definition="chevron-right" icon-type="svg" svg-icon-set="primo-ui"></prm-icon> \
                </div> \
                <div class="ic-links-area" ng-show="$ctrl.showNotOnShelfLink"> \
                <a ng-href="https://www.library.tufts.edu/primo/sms/sms-from-primo.php?title={{$ctrl.title | encode}}&cn={{$ctrl.callNumber | encode}}&lib={{$ctrl.library | encode}}&loc={{$ctrl.location | encode}}&subloc={{$ctrl.subLocation | encode}}" class="ic-sms-link">Text to phone</a> \
            </div>',
        controller: 'availabilityCustomizationsController'
    });