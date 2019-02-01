app.constant('helpSidebarHelper', {
  debug: true,
  sendGAEvent: false,
  logMessage: function(message){
    if(this.debug){
      console.log("helpSidebar) " + message);
    }
  },
  logHelpSidebarEvent: function(gaEventLogger, action){
    let category = "help-sidebar";
    let label = window.location.pathname;
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
            <h2>Search Help</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="hide()">
              <md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-dialog-content>
          <div class="md-dialog-content">
            <ul>
              <li>First item in the list of helpers</li>
              <li>Second item in that list</li>
              <li>Third item</li>
            </ul>
          </div>
        </md-dialog-content>

        <md-dialog-actions layout="row">
          <md-button md-autofocus>Default Action</md-button>
          <span flex></span>
          <md-button>Option 2</md-button>
          <md-button ng-click="hide()">Close</md-button>
        </md-dialog-actions>
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
    controller: function(helpSidebarHelper, gaEventLogger, $mdDialog, $scope){
      helpSidebarHelper.logMessage("loaded.");

      this.openHelpMenu = function(ev){
        helpSidebarHelper.logHelpSidebarEvent(gaEventLogger, "opened", window.location.pathname);
        $mdDialog.show({
          controller: DialogController,
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

      function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          helpSidebarHelper.logHelpSidebarEvent(gaEventLogger, "closed", window.location.pathname);
          $mdDialog.hide();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
    }
  });
