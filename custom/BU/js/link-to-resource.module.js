let debug = true;

app.service('linkToResourceLogger', function(gaEventLogger){
  this.logLinkToResource = function(fullViewOrMore, urlClicked){
    if(debug){
      console.log(`link-to-resource: calling gaEvent logger with category:'link-to-resource', action:'${fullViewOrMore}', label:'${urlClicked}'`);
    }else{
      gaEventLogger.logEvent("link-to-resource", fullViewOrMore, urlClicked);
    }
  }
});

angular.module('l2rMoreLinks', [])
  .component('prmServiceLinksAfter', {
    controller: function l2rMoreLinks(linkToResourceLogger){
      linkToResourceLogger.logLinkToResource("more-links","https://bu.edu/library");
    }
  });
