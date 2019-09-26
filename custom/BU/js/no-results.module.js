const quick_actions = `
  <md-card>
    <md-card-title>
      <md-card-title-text><span translate="" class="md-headline ng-scope">Quick Actions</span></md-card-title-text>
    </md-card-title>
    <md-card-content>
      <p>Here are some quick things we can to do for you pretty easily:</p>
      <ul class="no-bullet">
        <li id="action-quotes" ng-if="$ctrl.showQuotes">
          <bulib-card small title="Search without Quotes" icon="format_quote" debug description="Run the same query without the quotes"
            action="console.log('searchWithoutQuotes()')"></bulib-card>
        </li>
        <li id="action-scope" ng-if="$ctrl.showScopes">
          <bulib-card small title="Expand Search" icon="zoom_out_map" description="Try searching over a larger set of results"
            action="console.log('searchWithoutQuotes()')"></bulib-card> 
        </li>
        <li id="action-filter" ng-if="$ctrl.showFilter">
          <bulib-card small title="Remove Filters" icon="label_off" description="Remove active filters "
            action="console.log('searchWithoutFilters()')"></bulib-card> 
        </li>
        <li id="action-chat">
          <bulib-card small title="Ask for Help" icon="people" description="Get assistance with your search from a real librarian!"
            action="console.log('openChat()')"><bulib-card>
        </li>
      </ul>
    </md-card-content>
  </md-card>`;

const troubleshooting_checklist = `
  <md-card>
    <md-card-title>
      <md-card-title-text><span translate="" class="md-headline ng-scope">Troubleshooting the Problem</span></md-card-title-text>
    </md-card-title>
    <md-card-content> 
      <p>Still having trouble getting the results you want? Try out the following: </p>
      <ul class="no-bullet">
        <li id="check-quotes">
          <label>
            <input ng-hide="!$ctrl.showQuotes" type="checkbox" disabled>
            <input ng-hide="$ctrl.showQuotes"  type="checkbox" disabled checked>
            Check for searches in <strong>quotation marks</strong>
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
            Check for <strong>misspelled words or typos</strong>.
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
            about searching strategies.
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
    console.log(this.getSearchTerm() + "<-- search term")
    this.showQuotes = this.getSearchTerm().includes('"') || this.getSearchTerm().includes('”'); 
    this.showFilter = window.location.search.includes("mfacet=");
    this.showScopes = !window.location.search.includes("search_scope=pci_all");

    // action helpers
    function searchWithoutQuotes(){
      let newLink = this.getCurrentPathWithArgs().replace('/"/g','');
      console.log("'" + this.getCurrentPathWithArgs() + "' -> '" + newLink + "'")
      return newLink;
    }
    function searchWithoutFilters(){
      let newLink = this.getCurrentPathWithArgs.replace('/')
    }
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