app.constant('helpMenuHelper', {
  debug: true,
  sendGAEvent: false,
  helpMenuWidth: 500,
  logMessage: function(message){
    if(this.debug){ console.log("helpMenu) " + message); }
  },
  logHelpEvent: function(gaEventLogger, action, label=window.location.pathname){
    let category = "help-menu";
    this.logMessage(`calling 'gaEventLogger' with category:'${category}', action: '${action}', label:'${label}'.`);

    if(this.sendGAEvent){
      gaEventLogger.logEvent(category, action, label, this.debug);
    }
  },
  openDialogBox: function(){
    const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
    dialog.listen('MDCDialog:opened', () => {
      list.layout();
    });
  }
});

angular.module('helpMenuContentDisplay', [])
  .component('prmExploreMainAfter', {
    template: `
      <help-menu-content-display>
        <div ng-if="showHelpMenu">
          <style>
            help-menu-content-display { font-size: 140%; margin-bottom: 5px;}
            #help-header { background-color: lightgrey; }
            #help-content { padding: 0px 25px; }
            #s-lch-widget-8959 { display: none; }
            prm-topbar { display: none; }
            prm-search-bar { display: none; }
            ui-view { display: none; }
          </style>
          <div id="help-header" class="md-toolbar-tools">
            <a ng-if="entry" class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="back()">
              <prm-icon aria-label="Close dialog" icon-type="svg" svg-icon-set="navigation" icon-definition="ic_arrow_back_24px"></prm-icon>
            </a>
            <h2><strong>Search Help</strong><span ng-hide="!entry"> - {{entry.title}}</span></h2>
          </div>
          <div id="help-content">
            <div ng-if="entry" id="search-help-dialog-content">
              <br />
              <p ng-if="!entry.template"><em>{{entry.description}}</em></p>
              <div ng-bind-html="entry.template"></div>
            </div>
            <ul ng-hide="entry" style="list-style: none; width: 100%; padding-left: 0px;">
              <hr />
              <li ng-repeat="item in helpContentList" class="big-text">
                <a ng-if="item.id" ng-click="openContentItem(item.id)">
                  <prm-icon svg-icon-set="{{item.icon.group}}" icon-definition="ic_{{item.icon.code}}_24px"
                            icon-type="svg" style="padding-right: 10px;"></prm-icon>
                  <span>{{item.title}}</span>
                </a>
                <hr ng-if="!item.id"/>
              </li>
              <hr />
            </ul>
          </div>
        </div>
      </help-menu-content-display>`,
    controller: function(helpMenuHelper, helpMenuContent, gaEventLogger, $scope, $timeout){     
      let hrefArgs = window.location.search; 
      $scope.showHelpMenu = hrefArgs.includes("page=help");
      
      // templates from helpMenuHelper
      $scope.helpContentList = helpMenuContent.list_of_elements;
      
      // modal navigation
      $scope.back = function() { $scope.entry = null; };
      $scope.openContentItem = function(id){
        $scope.entry = helpMenuContent.get_entry_by_id(id);
        helpMenuHelper.logHelpEvent(gaEventLogger, "select-item", id);
      };

      $scope.checkUrlForEntryId = function(){
        let helpOptionLocation = hrefArgs.indexOf("help-option");
        if(helpOptionLocation != -1){
          // get the end location from the next '&' or the end of the hrefArgs
          let helpOptionEndLocation = hrefArgs.indexOf("&", helpOptionLocation);
          if(helpOptionEndLocation == -1){ helpOptionEndLocation = hrefArgs.length; }

          // grab, log, and send 'helpOptionId' from the hrefArgs
          let helpOptionId = hrefArgs.substring(helpOptionLocation+"help-option=".length, helpOptionEndLocation);
          helpMenuHelper.logMessage(`helpOptionId: '${helpOptionId}' grabbed from hrefArgs: '${hrefArgs}'`);
          $scope.openContentItem(helpOptionId);
        }
      };

      $timeout(function(){ $scope.checkUrlForEntryId(); }, 10);
    },
  });

angular.module('helpMenuTopbar', ['ngMaterial'])
  .component('prmSearchBookmarkFilterAfter', {
    template: `
      <help-menu-topbar>
        <div class="layout-align-center layout-row">
          <a class="md-icon-button button-over-dark md-button md-primoExplore-theme md-ink-ripple"
                    aria-label="Open Search Help Menu" ng-click="$ctrl.openHelpMenu($event)" href="#">
            <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_help_24px"></prm-icon>
          </a>
        </div>
      </help-menu-topbar>`,
    controller: function(helpMenuHelper, gaEventLogger, $mdDialog){
      helpMenuHelper.logMessage("loaded.");

      this.openHelpMenu = function(ev){
        helpMenuHelper.logHelpEvent(gaEventLogger, "open-dialog", window.location.pathname);
        $mdDialog.show({
          controller: helpMenuDialogController,
          template: `
            <md-dialog id="search-help-dialog" aria-label="Search Help Menu Dialog"
                       style="width: ${helpMenuHelper.helpMenuWidth}px;">
              <form>
              <md-toolbar>
                <div class="md-toolbar-tools">
                  <a ng-if="entry" class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="back()">
                    <prm-icon aria-label="Close dialog" icon-type="svg" svg-icon-set="navigation" icon-definition="ic_arrow_back_24px"></prm-icon>
                  </a>
                  <h2><span ng-hide="entry">Search Help</span><span ng-hide="!entry">{{entry.title}}</span></h2>
                  <span flex></span>
                  <a class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="hide()">
                    <prm-icon aria-label="Close dialog" icon-type="svg" svg-icon-set="navigation" icon-definition="ic_close_24px"></prm-icon>
                  </a>
                </div>
              </md-toolbar>
              <md-dialog-content>
                <div class="md-dialog-content">
                  <div ng-if="entry" id="search-help-dialog-content">
                    <p ng-if="!entry.template"><em>{{entry.description}}</em></p>
                    <div ng-bind-html="entry.template"></div>
                  </div>
                  <ul ng-hide="entry" style="list-style: none; width: 100%; padding-left: 0px;">
                    <hr />
                    <li ng-repeat="item in helpContentList" class="row">
                      <a ng-if="item.id" ng-click="openItem(item.id)">
                        <prm-icon svg-icon-set="{{item.icon.group}}" icon-definition="ic_{{item.icon.code}}_24px"
                                  icon-type="svg" style="padding-right: 10px;"></prm-icon>
                        <span>{{item.title}}</span>
                      </a>
                      <hr ng-if="!item.id"/>
                    </li>
                    <hr />
                  </ul>
                </div>
              </md-dialog-content>
                <md-dialog-actions layout="row">
                  <md-button ng-click="openHelpInNewWindow(entry.id)">Open in New Window</md-button>
                </md-dialog-actions>
              </form>
            </md-dialog>`,
          targetEvent: ev,
          hasBackdrop: true,
          clickOutsideToClose:true,
          fullscreen: false,
          focusOnOpen: true
        });
      };

      function helpMenuDialogController(helpMenuContent, $scope, $mdDialog) {
        // data
        $scope.helpContentList = helpMenuContent.list_of_elements;
        
        // modal navigation
        $scope.hide = function() { 
          $mdDialog.hide(); 
        };
        $scope.back = function() {
          document.querySelector("#search-help-dialog-content").innerHTML = "";
          $scope.entry = null;
        };
        $scope.openItem = function(id){
          $scope.entry = helpMenuContent.get_entry_by_id(id);
          helpMenuHelper.logHelpEvent(gaEventLogger, "selected", id);
        };
        $scope.openHelpInNewWindow = function(item_id=""){
          let help_event_label = window.location.pathname;
          let params=`width=${helpMenuHelper.helpMenuWidth},height=800,resizable=0,location=0,menubar=0,scrollbars=yes`;
          let help_page_url = '/primo-explore/search?vid=BU&page=help'; // TODO: change from 'page=help' into help-url
          
          // if present, send and log the 'help-option' instead of the url
          if(item_id){ 
            help_page_url += "&help-option="+item_id; 
            help_event_label = item_id;
          }

          helpMenuHelper.logHelpEvent(gaEventLogger, "open-window", help_event_label);
          open(help_page_url, 'BULibraries Help Menu', params);
          $scope.hide();
        }
      }
    }
  });
