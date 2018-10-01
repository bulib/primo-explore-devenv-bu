// - helper code for announcement banner for [`primo-explore-wrlc-announce` package](https://www.npmjs.com/package/primo-explore-wrlc-announce) - //
app.constant('announceConfig', {

  // view/edit the values in this spreadsheet by using the same 'id' (/feeds/list/<ID>/1/public) in the following: (docs.google.com/spreadsheets/d/<SHEET_ID>)
  announceAPI: 'https://spreadsheets.google.com/feeds/list/1ElW0CUOV3LvcHuYxK2BZfFjo65a-XDrlNJtnrelA6tM/1/public/values?alt=json',

  // specify which of the N 'entries' (zero-based row id [not including headers]) you want the info for [defaulted to 0]
  apiEntryNumber: 0,

  // get the main data object associated with your desired view
  getData: function(response) {
    return response.data.feed.entry[this.apiEntryNumber];
  },

  // obtain the specifically relevant parts of that data object
  getShow: function(entryData) {
    return entryData.gsx$showbanner.$t;
  },
  getMessage: function(entryData) {
    return entryData.gsx$messagetext.$t;
  },
  getLink: function(entryData) {
    return entryData.gsx$messagelink.$t;
  },
  getSeverity: function(entryData) {
    return entryData.gsx$messageseverity.$t;
  }
});
