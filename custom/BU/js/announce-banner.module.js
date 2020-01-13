/* - Add conditional banner to all primo pages for time-sensitive messages - 
 *
 * NOTE: this is based entirely off of [`primo-explore-wrlc-announce](https://github.com/wrlc-primo-dev) and their
 *  associated [npm package](https://www.npmjs.com/package/primo-explore-wrlc-announce).
 *
 * All credit goes to them, and this file is only here until BU-Lib specific functionality can be added to the
 *   existing repo (e.g. until [our PR](https://github.com/wrlc-primo-dev/primo-explore-wrlc-announce/pull/8)
 *   is merged and the npm package is versioned to where we can use that instead).
 */

angular.module('announceBanner', ['ngAnimate'])
  .controller('announceController', ['announceConfig', '$http', 
    function(announceConfig, $http){
      var self = this;
      var config = announceConfig;

      // interact with announceAPI helper to set values
      $http.get(config.announceAPI).then(function(response){
        var data = (config.getData)? config.getData(response) : response;

        // check if we want to show the banner or not
        var showFlagEnabled = config.getShow(data) == "TRUE";
        var isEmptyMessage = config.getMessage.length == 0;
        self.show = showFlagEnabled && !isEmptyMessage && !self.dismissed;
        if(!self.show){ return; }

        // get message info using configured functions
        self.message = config.getMessage(data);
        self.link = config.getLink(data);
        self.severity = (config.getSeverity)? config.getSeverity(data) : 'info';
        self.cta_text = data.gsx$ctatext.$t;
      });
    }
  ])
  .component('prmSearchBarAfter', {
    template: `
      <bulib-announce code="primo-explore"
        message="{{$ctrl.message}}" severity="{{$ctrl.severity}}" 
        cta_text="{{$ctrl.cta_text}}" cta_url="{{$ctrl.link}}">
      </bulib-announce>
    `,
    controller: 'announceController'
  });
