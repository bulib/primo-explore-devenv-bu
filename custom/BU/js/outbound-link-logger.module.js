app.constant('outboundLinksHelper', {
  debug: true,
  sendGAEvent: false,
  logOutboundLinkMessage: function(message){
    if(this.debug){
      console.log("outboundLinksLogger) " + message);
    }
  },
  logOutboundLinkEvent: function(category, action, urlClicked){
    this.logOutboundLinkMessage(`calling gaEventLogger with category:'${category}', action: '${action}', label:'${urlClicked}'.`);

    if(this.sendGAEvent){
      gaEventLogger.logEvent(category, action, urlClicked);
      console.log("new '" + category + "' event sent to Google Analytics");
    }
  }
});

angular.module('outboundLinksLogger', [])
  .component('prmServiceLinksAfter', {
    controller: function outboundLinksController(outboundLinksHelper, $timeout){
      $timeout(function(){ // wait for the links to be loaded into the page

        // find the associated 'More Links' using the querySelectorAll
        outboundLinksHelper.logOutboundLinkMessage("using the querySelectorAll to grab outbound links...");
        let outboundLinks = document.querySelectorAll("prm-service-links > div > div > a.arrow-link");
        outboundLinksHelper.logOutboundLinkMessage("adding eventListeners to " + outboundLinks.length + " anchor tags in 'More Links'...");

        // add the logging event to each of these anchor links
        for(let i=0; i<outboundLinks.length; i++){
          let anchorLinkElem = outboundLinks[i];
          let url = anchorLinkElem.getAttribute("href");
          let linkText = anchorLinkElem.querySelector("span").innerHTML;
          anchorLinkElem.addEventListener("click", function(event){
            event.preventDefault();
            outboundLinksHelper.logOutboundLinkEvent("outbound-links", linkText, url);
            window.open(url, '_blank');
          });
        }
      }, 2500)  // code above executes 2.5 seconds after the component first loads
    }
  });
