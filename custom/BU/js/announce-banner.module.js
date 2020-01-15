/** 
 * Add a conditional banner to all primo pages for time-sensitive messages 
 *   - information obtained from Google Sheets API 
 *   - frontend display consumes the <bulib-announce> web component from `bulib-wc`
 */
angular.module('announceBanner', ['ngAnimate'])
  .controller('announceController', ['$http', 
    function($http){
      var self = this;

      // prepare the google sheets api path (regular one is the same link, without the '/values?alt=json')
      var google_sheets_document_id = '1ElW0CUOV3LvcHuYxK2BZfFjo65a-XDrlNJtnrelA6tM';
      var google_sheets_api_path = 'https://spreadsheets.google.com/feeds/list/'+google_sheets_document_id+'/1/public/values?alt=json';
      var row_id = 0; // which row of the spreadsheet to read

      // interact with announceAPI helper to set values
      $http.get(google_sheets_api_path).then(function(response){
        var data = response.data.feed.entry[row_id];

        // check if we want to show the banner or not
        var showFlagEnabled = data.gsx$showbanner.$t == "TRUE";
        self.message = data.gsx$messagetext.$t; 
        var isEmptyMessage = message.length == 0;
        self.show = showFlagEnabled && !isEmptyMessage && !self.dismissed;
        if(!self.show){ return; }

        // get message info using configured functions
        self.link = data.gsx$messagelink.$t;
        self.severity = data.gsx$messageseverity.$t || 'info';
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
