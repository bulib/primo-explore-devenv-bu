const helpMenuMainContent = `
  <div ng-if="entry" id="search-help-dialog-content">
    <br />
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
  </ul>`;

export const helpMenuContentDisplayTemplate = `
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
  <div id="help-content">${helpMenuMainContent}</div>`;

export const helpMenuDialogTemplate = (width) => `
  <md-dialog id="search-help-dialog" aria-label="Search Help Menu Dialog"
             style="width: ${width}px;">
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
        <div class="md-dialog-content">${helpMenuMainContent}</div>
      </md-dialog-content>
      <md-dialog-actions layout="row">
        <md-button ng-click="openHelpInNewWindow(entry.id)">Open in New Window</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>`;