app.constant('helpSidebarHelper', {
  debug: true,
  sendGAEvent: false,
  logMessage: function(message){
    if(this.debug){
      console.log("helpSidebar) " + message);
    }
  },
  logHelpOpenedEvent: function(gaEventLogger, category, action, urlClicked){
    this.logMessage(`calling 'gaEventLogger' with category:'${category}', action: '${action}', label:'${urlClicked}'.`);

    if(this.sendGAEvent){
      gaEventLogger.logEvent(category, action, urlClicked, this.debug);
    }
  }
});


angular.module('helpSidebar', [])
  .component('prmSearchBookmarkFilterAfter', {
    template: `
      <help-sidebar>
        <div class="layout-align-center-center layout-row">
        <a class="md-icon-button button-over-dark md-button md-primoExplore-theme md-ink-ripple"
                  aria-label="Open Search Help Menu" ng-click="$ctrl.openHelpMenu()" href="#">
          <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_help_24px"></prm-icon>
        </a>
        </div>
       </help-sidebar>`,
     controller: function(helpSidebarHelper, gaEventLogger){
       helpSidebarHelper.logMessage("loaded.");

       this.openHelpMenu = function(){
         helpSidebarHelper.logHelpOpenedEvent(gaEventLogger, "help-sidebar", "opened", window.location.pathname)
       }
     }
   });
