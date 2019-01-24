app.constant('l2rHelper', {
  debug: true,
  sendGAEvent: false,
  logL2rMessage: function(message){
    if(this.debug){
      console.log("link2resource) " + message);
    }
  },
  logLinkToResource: function(fullViewOrMore, urlClicked){
    this.logL2rMessage(`calling gaEventLogger with category:'link-to-resource', action:'${fullViewOrMore}', label:'${urlClicked}'`);

    if(this.sendGAEvent){
      gaEventLogger.logEvent("link-to-resource", fullViewOrMore, urlClicked);
      console.log("'link-to-resource' event sent to GA");
    }
  }
});

angular.module('l2rMoreLinks', [])
  .component('prmServiceLinksAfter', {
    bindings: { parentCtrl: '<'},
    controller: function l2rMoreLinks(l2rHelper, $timeout){
      $timeout(function(){ // wait for the links to be loaded into the page

        // find the associated 'More Links' using the querySelectorAll
        l2rHelper.logL2rMessage("using the querySelectorAll to grab l2rMoreLinks...");
        let l2rMoreLinks = document.querySelectorAll("prm-service-links > div > div > a.arrow-link");
        l2rHelper.logL2rMessage("obtained " + l2rMoreLinks.length + " anchor tags in 'More Links'.");

        // add the logging event to each of these anchor links
        for(let i=0; i<l2rMoreLinks.length; i++){
          let anchorLinkElem = l2rMoreLinks[i];
          let url = anchorLinkElem.getAttribute("href");
          anchorLinkElem.addEventListener("click", function(event){
            event.preventDefault();
            l2rHelper.logLinkToResource("more-links", url);
            window.open(url, '_blank');
          });
        }
      }, 2500)  // code above executes 2.5 seconds after the component first loads
    }
  });
