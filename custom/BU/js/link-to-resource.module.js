debug = true;

app.service('linkToResourceHelper', function(gaEventLogger){
  this.logLinkToResource = function(fullViewOrMore, urlClicked){
    if(debug){
      console.log(`link-to-resource: calling gaEventLogger with category:'link-to-resource', action:'${fullViewOrMore}', label:'${urlClicked}'`);
    }else{
      gaEventLogger.logEvent("link-to-resource", fullViewOrMore, urlClicked);
    }
  }
});

angular.module('l2rMoreLinks', [])
  .component('prmServiceLinksAfter', {
    bindings: { parentCtrl: '<'},
    controller: function l2rMoreLinks(linkToResourceHelper){
      let links = this.parentCtrl.getLinks();
      if(debug){ console.log(links); }

      let i, link, url, linkText;
      for(i=0; i<links.length; i++){
        link = links[i];
        url = link.linkURL;
        linkText = link.displayLabel.replace("$$E","");

        if(debug){
          console.log("l2rMoreLinks: logging link: '" + linkText + "' to url: '" + url + "'");
        }else{
          linkToResourceHelper.logLinkToResource("more-links",url);
        }
      }
    }
  });

  angular.module('l2rResultsList', [])
    .component('prmServiceHeaderAfter', {
      bindings: { parentCtrl: '<'},
      controller: function l2rFindONline(linkToResourceHelper){
        let links = this.parentCtrl.displayedAvailability();
        if(debug){ console.log(links); }

        let i, link, url, linkText;
        for(i=0; i<links.length; i++){
          link = links[i];
          url = link.linkURL;
          linkText = link.displayLabel.replace("$$E","");

          if(debug){
            console.log("l2rResultsList: logging link: '" + linkText + "' to url: '" + url + "'");
          }else{
            linkToResourceHelper.logLinkToResource("more-links",url);
          }
        }
      }
    });

  angular.module('l2rFindOnline', [])
    .component('prmServiceHeaderAfter', {
      bindings: { parentCtrl: '<'},
      controller: function l2rFindONline(linkToResourceHelper){
        let links = this.parentCtrl.getLinks();
        if(debug){ console.log(links); }

        let i, link, url, linkText;
        for(i=0; i<links.length; i++){
          link = links[i];
          url = link.linkURL;
          linkText = link.displayLabel.replace("$$E","");

          if(debug){
            console.log("l2rFindOnline: logging link: '" + linkText + "' to url: '" + url + "'");
          }else{
            linkToResourceHelper.logLinkToResource("more-links",url);
          }
        }
      }
    });
