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
    <md-dialog id="search-help-dialog" aria-label="Search Help Menu Dialog" ng-mouseleave=dragMouseUp()
               style="width: 450px;">
      <form>
        <md-toolbar id="search-help-dialog-header" style="cursor: move;" 
                    ng-mousedown=dragMouseDown(ev) ng-mousemove=elementDrag(ev)>
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
          hasBackdrop: false,
          clickOutsideToClose:false,
          fullscreen: false,
          focusOnOpen: true
        });
        
      };

      function helpMenuDialogController(helpMenuContent, $scope, $mdDialog) {

        // data
        $scope.helpContentList = helpMenuContent.list_of_elements;
        $scope.selected = false;
        $scope.pos1 = 0;
        $scope.pos2 = 0;
        $scope.pos3 = 0;
        $scope.pos4 = 0;
        
        // modal navigation
        $scope.hide = function() { $mdDialog.hide(); };
        $scope.back = function() {
          document.querySelector("#search-help-dialog-content").innerHTML = "";
          $scope.entry = null;
        };
        $scope.openItem = function(id){
          $scope.entry = helpMenuContent.get_entry_by_id(id);
          helpMenuHelper.logHelpEvent(gaEventLogger, "selected", id);
        };

        // dragging modal
        $scope.dragMouseDown = function(ev){
          ev = ev || window.event;
          helpMenuHelper.logMessage("dragMouseDown");
          $scope.selected = true; 
          $scope.pos3 = ev.clientX;
          $scope.pos4 = ev.clientY;
        }
        $scope.elementDrag = function(e){
          if(!$scope.selected){ return; }
          console.log("elementDrag");
          e = e || window.event;
          // e.preventDefault();
          // calculate the new cursor position:
          $scope.pos1 = $scope.pos3 - e.clientX;
          $scope.pos2 = $scope.pos4 - e.clientY;
          $scope.pos3 = e.clientX;
          $scope.pos4 = e.clientY;
          // set the element's new position:
          let elmntHeader = document.getElementById("search-help-dialog-header");
          let elmnt = document.getElementById("search-help-dialog");
          elmnt.style.top = (elmntHeader.offsetTop - $scope.pos2) + "px";
          elmnt.style.left = (elmntHeader.offsetLeft - $scope.pos1) + "px";
          elmnt.onmouseup = $scope.dragMouseUp;
        };
        $scope.dragMouseUp = function(ev){
          $scope.selected = false;
          helpMenuHelper.logMessage("dragMouseUp");
        }
      }
    }
  });
