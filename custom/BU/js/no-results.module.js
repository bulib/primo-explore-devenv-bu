// - quick actions - //
const DEBUG = true;
const logNoResultsMessage = (message) => { if(DEBUG){ console.log("no-results) "+message); }}
const getCurrentPathWithArgs = function(){ return window.location.pathname + window.location.search; }

// helper
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

// replace 'tab' and 'search_scope'
const searchBiggerScope = function(){
  let existingTab = getValueFromHrefArgKey("tab");
  let replaceWithTab = "default_tab";
  if(existingTab === replaceWithTab){ replaceWithTab = "beyond_bu"; }
  
  let newLink = getCurrentPathWithArgs().replace(existingTab, replaceWithTab);
  logNoResultsMessage(`tab changed from '${existingTab}' -> '${replaceWithTab}.`);
  logNoResultsMessage(newLink);
  window.location = newLink;
}

// rerun the search without any filters
const searchWithoutFilters = function(){
  let existingFilters = ""; let newLink = getCurrentPathWithArgs();
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
        <li id="action-quotes" ng-if="$ctrl.showQuotes">
          <bulib-card small title="Search without Quotes" icon="format_quote" debug description="Run the same query without the quotes"
            action="window.dispatchEvent(new Event('searchWithoutQuotesEvent'))".></bulib-card>
        </li>
        <li id="action-scope" ng-if="$ctrl.showScopes">
          <bulib-card small title="Expand Search" icon="zoom_out_map" description="Trying searching beyond your current scope setting"
            action="window.dispatchEvent(new Event('searchBiggerScopeEvent'))"></bulib-card> 
        </li>
        <li id="action-filter" ng-if="$ctrl.showFilter">
          <bulib-card small title="Remove Filters" icon="label_off" description="Remove active filters"
            action="window.dispatchEvent(new Event('searchWithoutFiltersEvent'))"></bulib-card> 
        </li>
        <li id="action-chat">
          <bulib-card small title="Ask for Help" icon="people" description="Contact us and a librarian will help you with your research"
            action="window.dispatchEvent(new Event('openChatEvent'))"><bulib-card>
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
            <input ng-hide="!$ctrl.showQuotes" type="checkbox" disabled>
            <input ng-hide="$ctrl.showQuotes"  type="checkbox" disabled checked>
            Check that you are using <strong>quotation marks</strong> correctly
          </label>
        </li>
        <li id="check-filters">
          <label>
            <input ng-hide="!$ctrl.showFilter" type="checkbox" disabled>
            <input ng-hide="$ctrl.showFilter"  type="checkbox" disabled checked>
            Remove any extraneous <strong>filters</strong>
          </label>
        </li>
        <li id="check-scope">
          <label>
            <input ng-hide="!$ctrl.showScopes" type="checkbox" disabled>
            <input ng-hide="$ctrl.showScopes"  type="checkbox" disabled checked>
            <strong>Try another <a href="/primo-explore/search?vid=BU">search scope</a></strong> 
            that's better-suited to your query
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
            <strong><a href="https://www.bu.edu/library/help/bu-libraries-search/power-searching/">Learn more</a></strong> 
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
    this.checkFilter = this.showFilter = window.location.search.includes("mfacet=");
    this.showScopes = getValueFromHrefArgKey("tab") !== "beyond_bu";

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