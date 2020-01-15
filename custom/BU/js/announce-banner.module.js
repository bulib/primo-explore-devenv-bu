/** 
 * Add a conditional banner to all primo pages for time-sensitive messages 
 *   - information obtained from Google Sheets API 
 *   - frontend display consumes the <bulib-announce> web component from `bulib-wc`
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
      <bulib-announce code="primo-explore" debug
        message="{{$ctrl.message}}" severity="{{$ctrl.severity}}" 
        cta_text="{{$ctrl.cta_text}}" cta_url="{{$ctrl.link}}">
      </bulib-announce>
    `,
    controller: 'announceController'
  });
