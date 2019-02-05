app.constant('helpMenuHelper', {
  debug: true,
  sendGAEvent: false,
  logMessage: function(message){
    if(this.debug){
      console.log("helpMenu) " + message);
    }
  },
  logHelpEvent: function(gaEventLogger, action, label=window.location.pathname){
    let category = "help-menu";
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
            <ul ng-hide="itemOpened" style="list-style: none; width: 100%; padding-left: 0px;">
              <hr />
              <li ng-repeat="entry in helpContentList" class="row">
                <a ng-if="entry.id" ng-click="openItem(entry.id)">
                  <prm-icon svg-icon-set="{{entry.icon.group}}" icon-definition="ic_{{entry.icon.code}}_24px"
                            icon-type="svg" style="padding-right: 10px;"></prm-icon>
                  <span>{{entry.title}}</span>
                </a>
                <hr ng-if="!entry.id"/>
              </li>
              <hr />
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


angular.module('helpMenuTopbar', ['ngMaterial'])
  .component('prmSearchBookmarkFilterAfter', {
    template: `
      <help-menu-topbar>
        <div class="layout-align-center-center layout-row">
          <a class="md-icon-button button-over-dark md-button md-primoExplore-theme md-ink-ripple"
                    aria-label="Open Search Help Menu" ng-click="$ctrl.openHelpMenu($event)" href="#">
            <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_help_24px"></prm-icon>
          </a>
        </div>
      </help-menu-topbar>`,
    controller: function(helpMenuHelper, gaEventLogger, $mdDialog, $scope){
      helpMenuHelper.logMessage("loaded.");

      this.openHelpMenu = function(ev){
        helpMenuHelper.logHelpEvent(gaEventLogger, "opened", window.location.pathname);
        $mdDialog.show({
          controller: helpMenuDialogController,
          template: helpMenuHelper.dialogTemplate,
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen
        });
      };

      function helpMenuDialogController(helpMenuContent, $scope, $mdDialog) {
        $scope.helpContentList = helpMenuContent.list_of_elements;
        $scope.hide = function() { $mdDialog.hide(); };

        $scope.back = function() {
          document.querySelector("#search-help-dialog-content").innerHTML = "";
          $scope.itemOpened = false;
        };
        $scope.openItem = function(id){
          let entry = helpMenuContent.get_entry_by_id(id);
          let htmlContent = "";
          if(entry){ htmlContent = (entry.template)? entry.template : `<em>${entry.description}</em>`; }
          document.querySelector("#search-help-dialog-content").innerHTML = htmlContent;
          helpMenuHelper.logHelpEvent(gaEventLogger, "selected", id);
          $scope.itemOpened = true;
        };
      }
    }
  });
