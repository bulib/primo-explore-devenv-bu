const quick_actions = `
  <md-card>
    <md-card-title>
    </md-card-title>
    <md-card-content>
      <h3>Quick Actions</h3>
      <div class="deck">
        <bulib-card class="full-width" title="Search without Quotes" icon="format_quote"
          description="Run the same query without the quotes"></bulib-card>
        <bulib-card class="full-width" title="Expand Search" icon="zoom_out_map"
          description="Try searching over a larger set of results"></bulib-card>
        <bulib-card class="full-width" title="Ask for Help" icon="people"
          description="Get assistance with your search from a real librarian!"><bulib-card>
      </div>
      <ul class="no-bullet">
        <li>
          <md-button>Search without Quotes</md-button>
          <span>Rerun the same query, but <strong>remove the quotes</strong></span>
        </li>
        <li>
          <md-button>Expand Search</md-button>
          Try searching over a <strong>larger set</strong> of results
        </li>
        <li>
          <md-button>Ask for Help</md-button>
          Get assistance with your search from a <strong>real librarian</strong>!
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
      <ul class="no-bullet">
        <li>
          <label>
            <input type="checkbox" name="check" value="spelling">
            Check for <strong>misspelled words or typos</strong>.
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" name="check" value="quotations" checked>
            Check for searches in <strong>quotation marks</strong>
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="adjust-query">
            <strong>Adjust your query</strong> to contain fewer or more general/common keywords
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" value="search-scope">
            <strong>Try another <a href="/primo-explore/search?vid=BU">search scope</a></strong> 
            that's better-suited to your query
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
    function getSearchTerm() {
      return vm.parentCtrl.term;
    }
    function checkTypos(searchTerm){ return true; }
    function checkQuotes(searchTerm){ return true; }
  }])

  // Update links in template line below to direct to your Primo server and WorldCat, etc.
  .component('prmNoSearchResultAfter',{
    bindings: {parentCtrl: '<'},
    controller: 'prmNoSearchResultAfterController',
    template: `
      <style type="text/css">
        /* hide the first boilerplate */
        prm-no-search-result > md-card { display: none; }
      </style>
      <md-card>
        <md-card-title>
          <md-card-title-text><span translate="" class="md-headline ng-scope">No results found</span></md-card-title-text>
        </md-card-title>
        <md-card-content>
          <p>There are no results matching your search:<em>{{$ctrl.getSearchTerm()}}</em>.</p>
        </md-card-content>
      </md-card>`+quick_actions+troubleshooting_checklist
  });