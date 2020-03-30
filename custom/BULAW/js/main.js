import {addLibchatWidgetWithHash, addScriptToHead, addStyleToHead} from '../../CENTRAL_PACKAGE/js/header-imports.js';

/* add libchat widget  */
const LIBCHAT_HASH_BULAW = "d27ec78ed69c9d8969cd01f69fc196f1";
addLibchatWidgetWithHash(LIBCHAT_HASH_BULAW);

/* fontawesome */
const fontawesome_stylesheet_url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
addStyleToHead(fontawesome_stylesheet_url);

/* stackmap styles and scripts */
const stackmap_stylesheet_url = "https://www.stackmap.com/integration/bulaw-new-primo/StackMap.css";
addStyleToHead(stackmap_stylesheet_url);

const stackmap_scriptjs_url = "https://www.stackmap.com/integration/bulaw-new-primo/StackMap.js";
addScriptToHead(stackmap_scriptjs_url, "text/javascript", "async");

/* load custom view */
angular.module('viewCustom', ['angularLoad'])

  // add 'bulib-announce' banner for 'primo-BULAW', 'primo', 'all'
  .component('prmSearchBarAfter', { 
    template: `
      <div id="bulib-announcements">
        <bulib-announce dismissed code="primo-BULAW"></bulib-announce>
        <bulib-announce dismissed code="primo"></bulib-announce>
        <!--bulib-announce dismissed code="all"></bulib-announce-->
      </div>
    `
  })

;