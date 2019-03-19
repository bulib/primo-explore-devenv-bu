var logEventToAnalytics = function(category, action, label){
  if(window.ga){ window.ga('send', 'event', category, action, label); }
}

var outboundLinksHelper = {
  logToConsole: false,
  publishEvents: true,
  logOutboundLinkMessage: function(message){
    if(this.logToConsole){ console.log("outboundLinksLogger) " + message); }
  },
  logOutboundLinkEvent: function(category, action, urlClicked){
    this.logOutboundLinkMessage(
      "logging '"+category+"' event with action: '"+action+"', label:'"+ urlClicked+ "' [publish="+ this.publishEvents+"]."
    );

    if(this.publishEvents){
      this.logEvent(category, action, urlClicked, this.debug);
    }
  },
  getHrefArgFromSearch: function(hrefArgs, key="docid=", fallback="[unknown]"){
    var source = fallback;
    if(hrefArgs && key && hrefArgs.includes(key)){
      var start_index = hrefArgs.indexOf(key) + key.length;
      var end_index = hrefArgs.indexOf("&", start_index);
      if(end_index == "-1"){ end_index = hrefArgs.length; }
      source = hrefArgs.substring(start_index, end_index);
    }
    return source;
  }
};

angular.module('outboundLinksLogger', [])
  .constant('outboundLinksHelper', outboundLinksHelper)
  .controller('outboundLinksController', ['outboundLinksHelper', '$timeout', '$injector',
    function(outboundLinksHelper, $timeout, $injector){
      
      var config = {};
      if($injector.has('outboundLinksConfig')){
        config = $injector.get('outboundLinksConfig');
      }
      if($injector.has('primoExploreOutboundLinksConfig')){
        config = $injector.get('primoExploreOutboundLinksConfig');
      }
      outboundLinksHelper.logToConsole = Object.keys(config).includes('logToConsole')? config.logToConsole : true; 
      outboundLinksHelper.publishEvents = Object.keys(config).includes('publishEvents')? config.publishEvents : true;
      outboundLinksHelper.logEvent = config.logEvent || logEventToAnalytics;

      $timeout(function(){
        // find the associated 'More Links' using the querySelectorAll
        outboundLinksHelper.logOutboundLinkMessage("using the querySelectorAll to grab outbound links in 'More Links'...");
        var outboundLinks = document.querySelectorAll("prm-service-links > div > div > a.arrow-link");

        // if links are found, add eventListeners to them
        if(outboundLinks && outboundLinks.length > 0){
          outboundLinksHelper.logOutboundLinkMessage("adding eventListeners to " + outboundLinks.length + " 'outbound-links' anchor tag/s...");

          // add the logging event to each of these anchor links
          for(var i=0; i<outboundLinks.length; i++){
            var anchorLinkElem = outboundLinks[i];
            var url = anchorLinkElem.getAttribute("href");
            var linkText = anchorLinkElem.querySelector("span").innerHTML;
            anchorLinkElem.addEventListener("click", function(event){
              event.preventDefault();
              outboundLinksHelper.logOutboundLinkEvent("outbound-link", linkText, url);
              window.open(url, '_blank');
            });
          }

        // if no links are found..
        }else{
          outboundLinksHelper.logOutboundLinkMessage("no 'outbound-links' found in 'More Links'.")
        }
      }, 1500);  // code above executes 1.5 seconds after the component first loads

      $timeout(function(){
        // find the 'Find Online' and 'View Online' sections
        outboundLinksHelper.logOutboundLinkMessage("using the querySelectorAll to grab outbound links from 'Find/View Online'...");
        var linksToResource = document.querySelectorAll("prm-view-online > div > a");

        if(linksToResource && linksToResource.length > 0){
          outboundLinksHelper.logOutboundLinkMessage("adding eventListeners to " + linksToResource.length + " 'link-to-resource' anchor tag/s...");

          for(var i=0; i<linksToResource.length; i++){
            var anchorLinkElem = linksToResource[i];

            // determine the source information (e.g. libguides, openBU) from the primo 'docid' value
            var source = outboundLinksHelper.getHrefArgFromSearch(window.location.search, "docid=");

            // get the url (and use the referring if it's an easyproxy link)
            var url = anchorLinkElem.getAttribute("href");
            url = outboundLinksHelper.getHrefArgFromSearch(url, "url=", url);

            // add the eventListener to the anchor tag
            anchorLinkElem.addEventListener("click", function(event){
              event.preventDefault();
              outboundLinksHelper.logOutboundLinkEvent(gaEventLogger, "link-to-resource",source, url);
              window.open(url, '_blank');
            });
          }

        // if no links are found..
        }else{
          outboundLinksHelper.logOutboundLinkMessage("no 'link-to-resource' found in 'Find/View Online'.")
        }
      }, 2500); // code above executes 2.5 seconds after the component first loads
    }
  ])
  .component('prmFullViewAfter', { controller: 'outboundLinksController' })
;
