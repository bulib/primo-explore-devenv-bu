let getting_started = {
  "title": "Getting Started",
  "htmlTemplate":`
    <p>BU Libraries Search contains articles, books, journals, databases, films, music, dissertations, and other scholarly materials for your research</p>
    <h2>Search Tips</h2>
    <p><code><brief info about title or subject keyword searches></code></p>
    <h2>Filtering</h2>
    <p>Use the filters to limit to one or more material types (books, articles)</p>
    <p>Use Peer-Reviewed Articles to quickly limit to only these results...</p>
  `
};

let list_element = {
  "title":"A Sample List Element",
  "htmlTemplate":`<ol><li>1</li><li><strong>2</strong></li><li><em>three</em></li></ol>`
};

app.constant('helpSidebarContent', {
  list_of_elements:[getting_started, list_element]
});
