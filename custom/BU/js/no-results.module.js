/* - add quick actions and links to assist users whose searches yeild no results - */

// - quick actions - //
const DEBUG = false;
const logNoResultsMessage = (message) => { if(DEBUG){ console.log("no-results) " + message); }}
const getCurrentPathWithArgs = function(){ return window.location.pathname + window.location.search; }

// helper
const prepareDispatchEventAction = (eventName, eventData) => {
  let event = !!eventData? `new CustomEvent('${eventName}', {detail:'${eventData}'})` : `new CustomEvent('${eventName}')`
  return `window.dispatchEvent(${event})`;
}
const getValueFromHrefArgKey = function(key, href){ 
  let relLink = href? href : window.location.pathname+ window.location.search;
  let i_key_start   = relLink.indexOf(key);
  let i_value_start = i_key_start+key.length+1;
  let i_value_end   = relLink.indexOf("&",i_value_start) || relLink.length-1; 
  if(i_value_end < 0){ i_value_end = relLink.length; }

  let oldValue = relLink.substring(i_value_start, i_value_end);
  logNoResultsMessage(`key:'${key}' value:'${oldValue}'`);
  return oldValue;
}

// remove quotations from 'query' 
const searchWithoutQuotes = function(){
  let existingSearchValue = getValueFromHrefArgKey("query");
  let newSearchValue = existingSearchValue.replace(/"/g,'').replace(/%22/g,"");
  let newLink = getCurrentPathWithArgs().replace(existingSearchValue, newSearchValue)
  console.log(`'${getCurrentPathWithArgs()}' -> '${newLink}'`)
  window.location = newLink;
}

// search over a broader amount of content by replacing 'tab' and removing the 'search_scope'
const searchBiggerScope = function(){
  // determine new tab value
  let existingTab = getValueFromHrefArgKey("tab");
  let replaceWithTab = "default_tab";
  if(existingTab === replaceWithTab){ replaceWithTab = "beyond_bu"; }
  logNoResultsMessage(`tab changed from '${existingTab}' -> '${replaceWithTab}.`);

  // remove search scope
  let newLink = getCurrentPathWithArgs().replace(existingTab, replaceWithTab);
  let existingScope = getValueFromHrefArgKey("search_scope", newLink);
  newLink = newLink.replace("search_scope="+existingScope, "").replace("&&", "&");

  // open advanced search when editing the scope
  if(!newLink.includes("mode=advanced")){ newLink += "&mode=advanced"; }
  logNoResultsMessage("conducting new search over adjusted scope, tab, mode with link: '" + newLink + "'");
  window.location = newLink;
}

// rerun the search without any filters
const searchWithoutFilters = function(){
  let existingFilters = ""; 
  let newLink = getCurrentPathWithArgs();
  while(newLink.includes("mfacet=")){
    existingFilters = getValueFromHrefArgKey("mfacet", newLink); 
    newLink = newLink.replace("mfacet="+existingFilters, "");
    newLink = newLink.replace("&&","&");
    logNoResultsMessage("filters ('"+existingFilters+"') removed.");
    logNoResultsMessage(newLink);
  }
  window.location = newLink;
}

// - templates - //
const quick_actions = `
  <md-card>
    <md-card-title>
      <md-card-title-text><span translate="" class="md-headline ng-scope">Quick Actions</span></md-card-title-text>
    </md-card-title>
    <md-card-content>
      <p>Here are some things we can do to help you find search results</p>
      <ul class="no-bullet">
        <li id="action-quotes" ng-if="$ctrl.checkQuotes">
          <bulib-card small title="Search without Quotes" icon="format_quote" debug description="Run the same query without the quotes"
            action="${prepareDispatchEventAction('searchWithoutQuotesEvent')}".></bulib-card>
        </li>
        <li id="action-scope" ng-if="$ctrl.checkScopes">
          <bulib-card small title="Expand Search" icon="zoom_out_map" description="Try searching over a wider breadth of content"
            action="${prepareDispatchEventAction('searchBiggerScopeEvent')}"></bulib-card> 
        </li>
        <li id="action-filter" ng-if="$ctrl.checkFilter">
          <bulib-card small title="Remove Filters" icon="label_off" description="Reset active filters and rerun the query"
            action="${prepareDispatchEventAction('searchWithoutFiltersEvent')}"></bulib-card> 
        </li>
        <li id="action-chat">
          <bulib-card small title="Ask for Help" icon="people" description="Open the chat window to get real time assistance"
            action="${prepareDispatchEventAction('openChatEvent')}"><bulib-card>
        </li>
      </ul>
    </md-card-content>
  </md-card>`;

const troubleshooting_checklist = `
  <md-card>
    <md-card-title>
      <md-card-title-text><span translate="" class="md-headline ng-scope">Troubleshooting</span></md-card-title-text>
    </md-card-title>
    <md-card-content> 
      <p>Still having trouble getting the results you want? Try the following: </p>
      <ul class="no-bullet">
        <li id="check-quotes">
          <label>
            <input ng-hide="!$ctrl.checkQuotes" type="checkbox">
            <input ng-hide="$ctrl.checkQuotes"  type="checkbox" disabled checked>
            Check for misplaced <strong>quotation marks</strong> or remove them entirely
          </label>
        </li>
        <li id="check-filters">
          <label>
            <input ng-hide="!$ctrl.checkFilter" type="checkbox">
            <input ng-hide="$ctrl.checkFilter"  type="checkbox" disabled checked>
            Remove any extraneous <strong>filters</strong>
          </label>
        </li>
        <li id="check-scope">
          <label>
            <input ng-hide="!$ctrl.checkScopes" type="checkbox">
            <input ng-hide="$ctrl.checkScopes"  type="checkbox" disabled checked>
            <strong>Try another <a onclick="${prepareDispatchEventAction('openHelpMenuEvent','whats-in-search')}">search scope</a></strong> 
            that's broader or better-suited to your query
          </label>
        </li>
        <li id="check-spelling">
          <label>
            <input type="checkbox" name="check" value="spelling">
            Check for <strong>misspelled words or typos</strong>
          </label>
        </li>
        <li id="check-query">
          <label>
            <input type="checkbox" value="adjust-query">
            <strong>Adjust your query</strong> to contain fewer or more general/common keywords
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="learn-more">
            <strong><a onclick="${prepareDispatchEventAction('openHelpMenuEvent','didnt-find')}">Learn more</a></strong> 
            about searching strategies
          </label>
        </li>
      </ul>
    </md-card-content>
  </md-card>`;

angular.module('noResults', [])

  // Enhance No Results tile
  .controller('prmNoSearchResultAfterController', [function () {
    var vm = this;
    vm.getSearchTerm = getSearchTerm;
    vm.pciSetting = vm.parentCtrl.searchStateService.searchObject.pcAvailability || '';
    function getSearchTerm() { return vm.parentCtrl.term; }

    // check various conditions to determine which quick actions to show
    this.checkQuotes = this.getSearchTerm().includes('"') || this.getSearchTerm().includes('”'); 
    this.checkFilter = window.location.search.includes("mfacet=");
    this.checkScopes = getValueFromHrefArgKey("tab") !== "beyond_bu";

    // add eventListeners for the quick actions
    window.addEventListener('searchWithoutQuotesEvent', searchWithoutQuotes);
    window.addEventListener('searchBiggerScopeEvent',   searchBiggerScope);
    window.addEventListener('searchWithoutFiltersEvent',searchWithoutFilters);
    window.addEventListener('openChatEvent', function(){ document.querySelector('button.s-lch-widget-float-btn').click(); });
  }])

  // Update links in template line below to direct to your Primo server and WorldCat, etc.
  .component('prmNoSearchResultAfter',{
    bindings: {parentCtrl: '<'},
    controller: 'prmNoSearchResultAfterController',
    template: `
      <style type="text/css">
        /* hide the first boilerplate */
        prm-no-search-result > md-card { display: none; }
        prm-no-search-result-after p, prm-no-search-result-after label, prm-no-search-result-after input { font-size: large; }
        prm-no-search-result-after label:hover { cursor: pointer; }
        bulib-card a { text-decoration: none !important; }
      </style>
      <md-card>
        <md-card-title>
          <md-card-title-text><span translate="" class="md-headline ng-scope">No results found</span></md-card-title-text>
        </md-card-title>
        <md-card-content>
          <p>There are no results matching your search:&nbsp;&nbsp;<em>{{$ctrl.getSearchTerm()}}</em>.</p>
        </md-card-content>
      </md-card>`+quick_actions+troubleshooting_checklist
  });