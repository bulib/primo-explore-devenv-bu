(function(){
  "use strict";
  'use strict';
  
  var app = angular.module('viewCustom', ['angularLoad']);
  
  "use strict";
  'use strict';
  
  /****************************************************************************************************/
  
  /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/
  
  /*var app = angular.module('centralCustom', ['angularLoad']);*/
  
  /****************************************************************************************************/
  
  // Add SMS
  app.filter('encode', function () {
      return encodeURIComponent;
  });
  
  app.controller('prmSearchResultAvailabilityLineAfterController', [function () {
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
  }]);
  
  app.component('prmSearchResultAvailabilityLineAfter', {
      bindings: { parentCtrl: '<' },
      controller: 'prmSearchResultAvailabilityLineAfterController',
      template: '<div class="ic-access-link-area" ng-show="$ctrl.online"><prm-icon icon-definition="link" icon-type="svg" svg-icon-set="primo-ui"></prm-icon><a href="{{$ctrl.quickUrl}}" target="_blank">{{$ctrl.quickUrlText}}</a>&nbsp;<prm-icon icon-definition="open-in-new" icon-type="svg" svg-icon-set="primo-ui"></prm-icon><prm-icon icon-definition="chevron-right" icon-type="svg" svg-icon-set="primo-ui"></prm-icon></div><div class="ic-links-area" ng-show="$ctrl.showNotOnShelfLink"><a ng-href="https://www.library.tufts.edu/primo/sms/sms-from-primo.php?title={{$ctrl.title | encode}}&cn={{$ctrl.callNumber | encode}}&lib={{$ctrl.library | encode}}&loc={{$ctrl.location | encode}}&subloc={{$ctrl.subLocation | encode}}" class="ic-sms-link">Text to phone</a></div>'
  });
  // end SMS
  
  
  // Begin BrowZine - Primo Integration...
    window.browzine = {
      api: "https://public-api.thirdiron.com/public/v1/libraries/426",
      apiKey: "cdeb966a-69cf-4f36-bb37-3d017dd6ee00",
   
      journalCoverImagesEnabled: true,
   
      journalBrowZineWebLinkTextEnabled: true,
      journalBrowZineWebLinkText: "Browse current issues",
   
      articleBrowZineWebLinkTextEnabled: true,
      articleBrowZineWebLinkText: "View issue contents",
   
      articlePDFDownloadLinkEnabled: true,
      articlePDFDownloadLinkText: "Download PDF",
   
      printRecordsIntegrationEnabled: true,
    };
   
    browzine.script = document.createElement("script");
    browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
    document.head.appendChild(browzine.script);
   
    app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
      window.browzine.primo.searchResult($scope);
    });
   
    app.component('prmSearchResultAvailabilityLineAfter', {
      bindings: { parentCtrl: '<' },
      controller: 'prmSearchResultAvailabilityLineAfterController'
    });
  // ... End BrowZine - Primo Integration
  
  })();