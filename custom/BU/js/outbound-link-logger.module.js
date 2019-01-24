app.constant('outboundLinksHelper', {
  debug: true,
  sendGAEvent: true,
  logOutboundLinkMessage: function(message){
    if(this.debug){
      console.log("outboundLinksLogger) " + message);
    }
  },
  logOutboundLinkEvent: function(gaEventLogger, category, action, urlClicked){
    this.logOutboundLinkMessage(`calling gaEventLogger with category:'${category}', action: '${action}', label:'${urlClicked}'.`);

    if(this.sendGAEvent){
      gaEventLogger.logEvent(category, action, urlClicked);
      console.log("new '" + category + "' event sent to Google Analytics");
    }
  },
  getHrefArgFromSearch: function(hrefArgs, key="docid=", fallback="[unknown]"){
    let source = fallback;
    if(hrefArgs.includes(key)){
      let start_index = hrefArgs.indexOf(key) + key.length;
      let end_index = hrefArgs.indexOf("&", start_index);
      if(end_index == "-1"){ end_index = hrefArgs.length; }
      source = hrefArgs.substring(start_index, end_index);
    }
    return source;
  }
});

angular.module('outboundLinksLogger', [])
  .component('prmServiceLinksAfter', {
    controller: function outboundLinksController(outboundLinksHelper, gaEventLogger, $timeout){
      $timeout(function(){
        // find the associated 'More Links' using the querySelectorAll
        outboundLinksHelper.logOutboundLinkMessage("using the querySelectorAll to grab outbound links in 'More Links'...");
        let outboundLinks = document.querySelectorAll("prm-service-links > div > div > a.arrow-link");
        outboundLinksHelper.logOutboundLinkMessage("adding eventListeners to " + outboundLinks.length + " 'outbound-links' anchor tags...");

        // add the logging event to each of these anchor links
        for(let i=0; i<outboundLinks.length; i++){
          let anchorLinkElem = outboundLinks[i];
          let url = anchorLinkElem.getAttribute("href");
          let linkText = anchorLinkElem.querySelector("span").innerHTML;
          anchorLinkElem.addEventListener("click", function(event){
            event.preventDefault();
            outboundLinksHelper.logOutboundLinkEvent(gaEventLogger, "outbound-link", linkText, url);
            window.open(url, '_blank');
          });
        }
      }, 1500);  // code above executes 1.5 seconds after the component first loads

      $timeout(function(){
        // find the 'Find Online' and 'View Online' sections
        outboundLinksHelper.logOutboundLinkMessage("using the querySelectorAll to grab outbound links from 'Find Online' and 'View Online'...");
        let linksToResource = document.querySelectorAll("prm-view-online > div > a");
        outboundLinksHelper.logOutboundLinkMessage("adding eventListeners to " + linksToResource.length + " 'link-to-resource' anchor tags...");
        for(let i=0; i<linksToResource.length; i++){
          let anchorLinkElem = linksToResource[i];

          // determine the source information (e.g. libguides, openBU) from the primo 'docid' value
          let source = outboundLinksHelper.getHrefArgFromSearch(window.location.search, "docid=");
          // outboundLinksHelper.logOutboundLinkMessage("source: " + source);

          // get the url (and use the referring if it's an easyproxy link)
          let url = anchorLinkElem.getAttribute("href");
          url = outboundLinksHelper.getHrefArgFromSearch(url, "url=", url);
          // outboundLinksHelper.logOutboundLinkMessage("url: " + url);

          anchorLinkElem.addEventListener("click", function(event){
            event.preventDefault();
            outboundLinksHelper.logOutboundLinkEvent(gaEventLogger, "link-to-resource",source, url);
            window.open(url, '_blank');
          });
        }
      }, 2500); // code above executes 2.5 seconds after the component first loads
    }
  });
