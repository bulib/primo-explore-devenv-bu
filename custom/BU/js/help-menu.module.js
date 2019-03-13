import {sample_list_of_elements} from './help-menu-content';
import {helpMenuContentDisplayTemplate, helpMenuDialogTemplate} from './help-menu-templates';

const optionalConfigName = 'helpMenuConfig';
const logEventToGoogleAnalytics = function(category, action, label){ 
  window.ga('send','event',category, action, label);
}

let helpMenuHelper = {
  logToConsole: true,
  publishEvents: false,
  helpMenuWidth: 500,
  list_of_elements: sample_list_of_elements,
  logMessage: function(message){
    if(this.logToConsole){ console.log("helpMenu) " + message); }
  },
  logEventToAnalytics: function(category, action, label){
    logEventToGoogleAnalytics(category, action, label);
  },
  logHelpEvent: function(action, label=window.location.pathname){
    let category = "help-menu";
    this.logMessage(`logging '${category}' event with action: '${action}', label:'${label}'. [publish: ${this.publishEvents}]`);

    if(this.publishEvents){
      this.logEventToAnalytics(category, action, label);
    }
  },
  get_entry_by_id: function(id){
    for(let i=0; i<this.list_of_elements.length; i++){
      if(this.list_of_elements[i].id === id){ return this.list_of_elements[i]; }
    }
    return {}
  }
};

const mainHelpMenuController = function(helpMenuHelper, $scope, $timeout, $mdDialog){     
  let hrefArgs = window.location.search; 
  $scope.showHelpMenu = hrefArgs.includes("page=help");
  
  // templates from helpMenuHelper
  $scope.helpContentList = helpMenuHelper.list_of_elements;
  
  // modal navigation
  $scope.hide = function() { 
    $mdDialog.hide(); 
  };
  $scope.back = function() { $scope.entry = null; };
  $scope.openItem = function(id){
    $scope.entry = helpMenuHelper.get_entry_by_id(id);
    helpMenuHelper.logHelpEvent("select-item", id);
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
      $scope.openItem(helpOptionId);
    }
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

    helpMenuHelper.logHelpEvent("open-window", help_event_label);
    open(help_page_url, 'BULibraries Help Menu', params);
    $scope.hide();
  }

  $timeout(function(){ $scope.checkUrlForEntryId(); }, 10);
}

angular.module('helpMenuContentDisplay', [])
  .constant('helpMenuHelper', helpMenuHelper)
  .controller('helpMenuPopupController', ['helpMenuHelper', '$scope', '$timeout', '$mdDialog', mainHelpMenuController])
  .component('prmExploreMainAfter', {
    template: `
      <help-menu-content-display>
        <div ng-if="showHelpMenu">${helpMenuContentDisplayTemplate}</div>
      </help-menu-content-display>`,
    controller: 'helpMenuPopupController'
  });

angular.module('helpMenuTopbar', ['ngMaterial'])
  .constant('helpMenuHelper', helpMenuHelper)
  .controller('helpMenuDialogController', ['helpMenuHelper', '$scope', '$timeout', '$mdDialog', mainHelpMenuController])
  .controller('helpMenuTopbarController', ['helpMenuHelper', '$mdDialog',
    function(helpMenuHelper, $mdDialog){
      helpMenuHelper.logMessage("loaded.");

      this.openHelpMenu = function(ev){
        helpMenuHelper.logHelpEvent( "open-dialog", window.location.pathname);
        $mdDialog.show({
          controller: 'helpMenuDialogController',
          template: helpMenuDialogTemplate(helpMenuHelper.helpMenuWidth),
          targetEvent: ev,
          hasBackdrop: true,
          clickOutsideToClose:true,
          fullscreen: false,
          focusOnOpen: true
        });
      };
    }
  ])
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
    controller: 'helpMenuTopbarController'
  });
