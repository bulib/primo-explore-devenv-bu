app.constant('helpSidebarHelper', {
  debug: true,
  sendGAEvent: false,
  logMessage: function(message){
    if(this.debug){
      console.log("helpSidebar) " + message);
    }
  },
  logHelpSidebarEvent: function(gaEventLogger, action, label=window.location.pathname){
    let category = "help-sidebar";
    this.logMessage(`calling 'gaEventLogger' with category:'${category}', action: '${action}', label:'${label}'.`);

    if(this.sendGAEvent){
      gaEventLogger.logEvent(category, action, label, this.debug);
    }
  },
  dialogTemplate: `
    <md-dialog aria-label="Search Help Menu Dialog">
      <form ng-cloak>
        <md-toolbar>
          <div class="md-toolbar-tools">
            <a ng-if="itemOpened" class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="back()">
              <prm-icon aria-label="Close dialog" icon-type="svg" svg-icon-set="navigation" icon-definition="ic_arrow_back_24px"></prm-icon>
            </a>
            <h2>Search Help</h2>
            <span flex></span>
            <a class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="hide()">
              <prm-icon aria-label="Close dialog" icon-type="svg" svg-icon-set="navigation" icon-definition="ic_close_24px"></prm-icon>
            </a>
          </div>
        </md-toolbar>
        <md-dialog-content>
          <div class="md-dialog-content">
            <div id="search-help-dialog-content"></div>
            <ul ng-if="!itemOpened">
              <li ng-repeat="entry in helpContentList">
                <a ng-click="openItem(entry.id, entry.htmlTemplate)">{{entry.title}}</a>
              </li>
            </ul>
          </div>
        </md-dialog-content>
      </form>
    </md-dialog>
  `,
  openDialogBox: function(){
    const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
    dialog.listen('MDCDialog:opened', () => {
      list.layout();
    });
  }
});


angular.module('helpSidebar', ['ngMaterial'])
  .component('prmSearchBookmarkFilterAfter', {
    template: `
      <help-sidebar>
        <div class="layout-align-center-center layout-row">
          <a class="md-icon-button button-over-dark md-button md-primoExplore-theme md-ink-ripple"
                    aria-label="Open Search Help Menu" ng-click="$ctrl.openHelpMenu($event)" href="#">
            <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_help_24px"></prm-icon>
          </a>
        </div>
      </help-sidebar>`,
    controller: function(helpSidebarHelper, helpSidebarContent, gaEventLogger, $mdDialog, $scope){
      helpSidebarHelper.logMessage("loaded.");

      this.openHelpMenu = function(ev){
        helpSidebarHelper.logHelpSidebarEvent(gaEventLogger, "opened", window.location.pathname);
        $mdDialog.show({
          controller: helpSidebarDialogController,
          template: helpSidebarHelper.dialogTemplate,
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };

      function helpSidebarDialogController(helpSidebarContent, $scope, $mdDialog) {
        $scope.helpContentList = helpSidebarContent.list_of_elements;
        $scope.hide = function() {
          helpSidebarHelper.logHelpSidebarEvent(gaEventLogger, "closed", window.location.pathname);
          $mdDialog.hide();
        };

        $scope.back = function() {
          document.querySelector("#search-help-dialog-content").innerHTML = "";
          $scope.itemOpened = false;
        };
        $scope.openItem = function(id, htmlContent){
          document.querySelector("#search-help-dialog-content").innerHTML = htmlContent;
          helpSidebarHelper.logHelpSidebarEvent(gaEventLogger, "selected", id);
          $scope.itemOpened = true;
        };
      }
    }
  });