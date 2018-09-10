//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom',['angularLoad', 'wrlcAnnounce']);

// - helper code for announcment banner ['wrlcAnnounce'] - //
app.constant('announceConfig', {

  // view/edit the values in the regular view by using the same 'id' (/feeds/list<ID>/1/public below) in the following: (docs.google.com/spreadsheets/d/<SHEET_ID>)
  announceAPI: 'https://spreadsheets.google.com/feeds/list/1dhGFCdOYlEG-DxkNs5F94WnHEmEIyTllQKhhWWtmmIE/1/public/values?alt=json',

  // update the entry number depending on the relevant view (BU:0, BULAW:)
  getShow: function(response) {
    return response.data.feed.entry[0].gsx$bannershow.$t;
  },
  getMessage: function(response) {
      return response.data.feed.entry[0].gsx$bannermessage.$t;
  },
  getLink: function(response) {
      return response.data.feed.entry[0].gsx$bannerlink.$t;
  }
});
