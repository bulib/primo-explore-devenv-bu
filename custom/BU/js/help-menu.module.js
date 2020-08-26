!function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){e.exports=i(1)},function(e,t,i){"use strict";i.r(t);var n='\n  <md-button ng-hide="!entry" class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="back()">\n    <prm-icon icon-type="svg" svg-icon-set="navigation" icon-definition="ic_arrow_back_24px"\n              aria-label="return to help content list" ></prm-icon>\n  </md-button>\n  <h1>\n    <strong ng-if="helpMenuTitle">{{helpMenuTitle}}</strong>\n    <strong ng-hide="helpMenuTitle">Search Help</strong>\n    <span ng-hide="!entry"> - {{entry.title}}</span>\n  </h1>',o='\n  <div ng-if="entry" id="search-help-menu-content" tabindex="-1">\n    <br />\n    <p ng-if="!entry.template"><em>{{entry.description}}</em></p>\n    <div ng-bind-html="entry.template"></div>\n  </div>\n  <h2 ng-hide="entry || !helpContentUpdates" class="mtl">Search Updates</h2>\n  <ul ng-hide="entry || !helpContentUpdates" style="list-style: none; width: 100%; padding-left: 0px;">\n    <hr aria-hidden="true" />\n    <li ng-repeat="item in helpContentUpdates" class="row">\n      <a ng-if="item.id" href="#{{item.id}}">\n        <prm-icon svg-icon-set="{{item.icon.group}}" icon-definition="ic_{{item.icon.code}}_24px"\n                  icon-type="svg" style="padding-right: 10px;"></prm-icon>\n        {{item.title}}\n      </a>\n      <hr ng-if="!item.id" aria-hidden="true" />\n    </li>\n    <hr aria-hidden="true" />\n  </ul>\n  <h2 ng-hide="entry || !helpContentList" class="mtl">Help Entries</h2>\n  <ul ng-hide="entry || !helpContentList" style="list-style: none; width: 100%; padding-left: 0px;">\n    <hr aria-hidden="true" />\n    <li ng-repeat="item in helpContentList" class="row">\n      <a ng-if="item.id" href="#{{item.id}}">\n        <prm-icon svg-icon-set="{{item.icon.group}}" icon-definition="ic_{{item.icon.code}}_24px"\n                  icon-type="svg" style="padding-right: 10px;"></prm-icon>\n        {{item.title}}\n      </a>\n      <hr ng-if="!item.id" aria-hidden="true" />\n    </li>\n    <hr aria-hidden="true" />\n  </ul>',a='\n  <style>\n    help-menu-content-display { font-size: 140%; margin-bottom: 5px;}\n    #help-header { background-color: lightgrey; }\n    #help-content { padding: 0px 25px; }\n    prm-static-page > prm-static > div { display: none; }\n  </style>\n  <div id="help-header" class="md-toolbar-tools">'.concat(n,'</div>\n  <div id="help-content">').concat(o,"</div>"),s="primoExploreHelpMenuStudioConfig",l="help-menu-notification-indicator-dismissed",r={logToConsole:!1,publishEvents:!1,helpMenuWidth:500,enableNotificationIndicator:!1,notificationIndicatorExpiration:12096e5,list_of_elements:[{id:"getting-started",title:"Getting Started",description:"brief static html content with an overview on how to use BULS; links to direct to main BULS help page in WordPress, other pages, and/or other sections of the menu",icon:{code:"description",group:"action"},template:"\n      <p>BU Libraries Search contains articles, books, journals, databases, films, music, dissertations, and other scholarly materials for your research</p>\n      <h2>Search Tips</h2>\n      <code>brief info about title or subject keyword searches</code>\n      <br /><br />\n      <h2>Filtering</h2>\n      <p>Use the filters to limit to one or more material types (books, articles)</p>\n      <p>Use Peer-Reviewed Articles to quickly limit to only these results...</p>\n    "},{id:"tutorials",title:"Tutorials",description:"at a minimum, links to individual videos and a playlist of existing BULS video tutorials (tbd if in Kaltura, WordPress, or youtube); if possible and desired, embed using Kaltura embed code",icon:{code:"shop_two",group:"action"}},{},{id:"whats-in-search",title:"What's in Search?",description:'brief description of material types, "scopes", and collections; may have submenus for each of the above; likely also link out to WordPress page with all PCI collections',icon:{code:"toc",group:"action"}},{id:"didnt-find",title:"Didn't find it?",description:"TBD info about ILL, scope of collections, and problem cases",icon:{code:"swap_horiz",group:"action"}},{},{id:"guides",title:"Guides",description:"info about research, subject, course, and how to guides; how to find in BULS by way of search and related more info links; link out to LibGuides home",icon:{code:"directions",group:"maps"}},{id:"glossary",title:"Glossary",description:"list of common terms (jargon) and definitions",icon:{code:"view_list",group:"action"}},{},{id:"query-builder",title:"Query Builder",description:"placeholder for this, tbd functionality for future development; interim step may just be to have text demonstrating adv query syntax",icon:{code:"find_in_page",group:"action"}},{},{id:"saving-results",title:"Saving Results",description:"information about My Favorites, exporting results, ref managers",icon:{code:"save",group:"content"}},{id:"citing-sources",title:"Citing Sources",description:"likely, but may depend on if including saving results; would have info about ref managers",icon:{code:"create",group:"content"}},{id:"account",title:"Account",description:"information about My Library Account functionality- loans, renewals, policies?; may also highlight or link to My Library Account",icon:{code:"account_box",group:"action"}},{},{id:"for-instructors",title:"For Instructors",description:'may be more "For" sections; will need considerable content work',icon:{code:"info",group:"action"}},{},{id:"ask-us",title:"Ask Us",description:"needs definition; how to point to chat? link to ask a librarian?",icon:{code:"forum",group:"communication"}},{id:"feedback",title:"Feedback",description:'directs to a new form to send feedback in the format of specific questions, e.g. "rate your experience", "did you find what you\'re looking for?", "send us your thoughts on improving search"; will want to clearly differentiate from Ask and reference help, so that patrons who need help soon can get it',icon:{code:"chat",group:"communication"}}],list_of_updates:[{id:"hathitrust-availability",title:"Hathi Trust Availability ETAS",description:"the hathitrust emergency temporary access service (ETAS) allows online reading access to selected materials",icon:{code:"mediation",group:"action"},template:'\n      <h3>About the HathiTrust Emergency Temporary Access Service (ETAS)</h3>\n      <p>The HathiTrust Emergency Temporary Access Service (ETAS) allows current BU students, faculty, and staff to have <strong>online reading access to selected materials that are in the BU Libraries but are currently unavailable due to the closure of the Libraries</strong>.</p>\n      <p>Faculty, students, and staff can access these materials via <a href="http://library.bu.edu/buls">BU Libraries Search</a>. Physical books in BU Libraries that are also available via HathiTrust will have a “<strong>Full Text Available at HathiTrust</strong>” link included in their records in BU Libraries Search.</p>\n      <p class="big-text"><strong>Access to these books is a multi-step process. Please follow the steps outlined below to read the books online.</strong></p>\n      <h3>How to Access Books via HathiTrust</h3>\n      <p>\n        Faculty, students, and staff can access these materials via BU Libraries Search. Physical books in BU Libraries that are also available via \n        HathiTrust will have a “<strong>Full Text Available at HathiTrust</strong>” link included in their records in BU Libraries Search. \n        <em>(Note: This link will also be shown for out-of-copyright items; for those items the link will take you directly to the item without having to follow the steps below.)</em>\n      </p>\n    '},{id:"visiting-the-libraries",title:"Visiting the Libraries",description:"discussion of covid-related changes to bu libraries operation",icon:{code:"business",group:"communication"},template:"\n      <h2>Try Online First</h2>\n      <p>\n        Our building capacity has been significantly reduced to comply with public health guidelines. To avoid long waits, try connecting with us online \n        before you come to our physical locations. We have expanded our online service delivery and may be able to help you without a visit to one of our branches. \n      </p>\n    "}],logMessage:function(e){this.logToConsole&&console.log("bulib-help-menu) "+e)},logEventToAnalytics:function(e,t,i){!function(e,t,i){window.ga&&window.ga("send","event",e,t,i)}(e,t,i)},logHelpEvent:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location.pathname,i="help-menu";this.logMessage("logging '".concat(i,"' event with action: '").concat(e,"', label:'").concat(t,"'. [publish: ").concat(this.publishEvents,"]")),this.publishEvents&&this.logEventToAnalytics(i,e,t)},isNotificationDismissed:function(){try{var e=window.localStorage.getItem(l);return null!==e&&(!(Date.now()-e>=r.notificationIndicatorExpiration)||(this.logMessage("'".concat(l,"' value is present, but has expired. removing it returning 'not dismissed'")),localStorage.removeItem(l),!1))}catch(e){return this.logMessage(e),!0}},showNotificationIndicatorIfNotDismissed:function(){this.enableNotificationIndicator&&!this.isNotificationDismissed()&&(this.logMessage("'enableNotificationIndicator' is true, local storage is enabled, and it's not dismissed, so we'll show the indicator"),document.querySelector("help-menu-topbar").style.setProperty("--notification-indicator-display","inline-block"))},dismissNotificationIndicator:function(){try{this.enableNotificationIndicator&&(window.localStorage.setItem(l,Date.now()),document.querySelector("help-menu-topbar").style.setProperty("--notification-indicator-display","none"),this.logMessage("notification-indicator dismissed"))}catch(e){this.logMessage(e)}},get_entry_by_id:function(e){for(var t=0;t<this.list_of_elements.length;t++)if(this.list_of_elements[t].id===e)return this.list_of_elements[t];for(var i=0;i<this.list_of_updates.length;i++)if(this.list_of_updates[i].id===e)return this.list_of_updates[i];return{}},override_with_config:function(e){e&&Object.keys(e)&&(Object.keys(e).includes("logToConsole")&&(this.logToConsole=e.logToConsole),Object.keys(e).includes("publishEvents")&&(this.publishEvents=e.publishEvents),Object.keys(e).includes("enableNotificationIndicator")&&(this.enableNotificationIndicator=e.enableNotificationIndicator),Object.keys(e).includes("notificationIndicatorExpiration")&&(this.notificationIndicatorExpiration=e.notificationIndicatorExpiration),Object.keys(e).includes("helpMenuWidth")&&(this.helpMenuWidth=e.helpMenuWidth),Object.keys(e).includes("helpMenuTitle")&&(this.helpMenuTitle=e.helpMenuTitle),Object.keys(e).includes("logEventToAnalytics")&&(this.logEventToAnalytics=e.logEventToAnalytics),Object.keys(e).includes("list_of_elements")&&(this.list_of_elements=e.list_of_elements),Object.keys(e).includes("list_of_updates")&&(this.list_of_updates=e.list_of_updates))}},c=function(e,t,i,n,o){var a={};t.has("helpMenuConfig")&&(a=t.get("helpMenuConfig")),t.has(s)&&(a=t.get(s)),e.override_with_config(a),i.helpContentUpdates=e.list_of_updates,i.helpContentList=e.list_of_elements,i.helpMenuTitle=e.helpMenuTitle,i.hide=function(){o.hide()},i.back=function(){i.entry=null,window.top.location.hash=""},i.openItem=function(t){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];i.entry=e.get_entry_by_id(t),n&&e.logHelpEvent("select-item",t)},i.setEntryIdFromHash=function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=window.location.hash.substring(1);t&&i.openItem(t,e)},i.openHelpInNewWindow=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=window.location.pathname,o="/primo-explore/static-file/help"+window.location.search;t&&(o+="#"+t,n=t);var a=e.helpMenuTitle||"Search Help Menu",s="width=".concat(e.helpMenuWidth,",height=800,resizable=0,location=0,menubar=0,scrollbars=yes");e.logHelpEvent("open-window",n);var l=open(o,a,s);l.onload=function(){this.document.title=a},l.addEventListener("hashchange",i.setEntryIdFromHash,!0),i.hide()},n(i.setEntryIdFromHash(!1),10),window.addEventListener("hashchange",i.setEntryIdFromHash,!0),window.addEventListener("openHelpMenuEvent",(function(t){var n=t.detail||"";e.logMessage("opening helpMenu from 'openHelpMenuEvent' with 'item_id': '"+n+"'"),i.openHelpInNewWindow(n)}))};angular.module("helpMenuContentDisplay",[]).constant("helpMenuHelper",r).controller("helpMenuPopupController",["helpMenuHelper","$injector","$scope","$timeout","$mdDialog",c]).component("prmExploreFooterAfter",{template:'\n      <help-menu-content-display>\n        <div ng-if="'.concat(window.location.pathname.includes("/static-file/help"),'">').concat(a,"</div>\n      </help-menu-content-display>"),controller:"helpMenuPopupController"}),angular.module("helpMenuTopbar",["ngMaterial"]).constant("helpMenuHelper",r).controller("helpMenuDialogController",["helpMenuHelper","$injector","$scope","$timeout","$mdDialog",c]).controller("helpMenuTopbarController",["helpMenuHelper","$injector","$mdDialog",function(e,t,i){var a={};t.has("helpMenuConfig")&&(a=t.get("helpMenuConfig")),t.has(s)&&(a=t.get(s)),e.override_with_config(a),e.showNotificationIndicatorIfNotDismissed(),this.openHelpMenu=function(t){var a;e.logHelpEvent("open-dialog",window.location.pathname),e.dismissNotificationIndicator(),i.show({controller:"helpMenuDialogController",template:(a=e.helpMenuWidth,'\n  <md-dialog id="search-help-dialog" aria-label="Search Help Menu Dialog" style="width: '.concat(a,'px;">\n    <form>\n      <md-toolbar>\n        <div class="md-toolbar-tools">\n          ').concat(n,'\n          <span flex></span>\n          <md-button class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="hide()">\n            <prm-icon aria-label="Close dialog" icon-type="svg" svg-icon-set="navigation" icon-definition="ic_close_24px"></prm-icon>\n          </md-button>\n        </div>\n      </md-toolbar>\n      <md-dialog-content>\n        <div class="md-dialog-content">').concat(o,'</div>\n      </md-dialog-content>\n      <md-dialog-actions layout="row">\n        <md-button ng-click="openHelpInNewWindow(entry.id)">Open in New Window</md-button>\n      </md-dialog-actions>\n    </form>\n  </md-dialog>')),hasBackdrop:!0,multiple:!1,clickOutsideToClose:!0,fullscreen:!1,focusOnOpen:!0})}}]).component("prmSearchBookmarkFilterAfter",{template:'\n      <help-menu-topbar>\n        <div class="layout-align-center layout-row">\n          <a class="md-icon-button button-over-dark md-button md-primoExplore-theme md-ink-ripple"\n                    aria-label="Open Search Help Menu" ng-click="$ctrl.openHelpMenu($event)"\n                    href="#" title="open help menu">\n            <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_help_24px"></prm-icon>\n          </a>\n        </div>\n        <span class="notification-indicator"></span>\n      </help-menu-topbar>',controller:"helpMenuTopbarController"})}]);