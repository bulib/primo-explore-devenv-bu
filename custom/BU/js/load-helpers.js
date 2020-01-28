/* - help to construct 'module_dependencies' based on feature flags - */ 

// configuration options
let view_name = process.argv[0] || "BU";
const INCLUDE_LIBCHAT_WIDGET = (view_name == "BU") || (view_name == "BULAW");
const INCLUDE_EZPROXY = true;
const INCLUDE_UNPAYWALL = (view_name == "BU");
const INCLUDE_OUTBOUND_LINKS = false;
const INCLUDE_HELP_MENU = (view_name == "BU");
const INCLUDE_ANNOUNCE_BANNER = (view_name == "BU");

// - production vs staging - //
export const ENV_PRODUCTION = process.argv[1] || false; 
const config_staging    = { "logToConsole":true,  "publishEvents":false };
const config_production = { "logToConsole":false, "publishEvents":true  };
export const default_config = ENV_PRODUCTION ? config_production : config_staging;

// - ez proxy - //
if(INCLUDE_EZPROXY){
  angular.element(document).ready( function () {
    if (window.location.href.indexOf('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu') > 0 ) {
      var n = window.location.href.replace('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu','buprimo.hosted.exlibrisgroup.com');
      window.location.assign(n);
    }
  });
}

// - libchat widget - //
const LIBCHAT_HASH_BU    = "0b9beff60316d9b71b1de06909bdf5c1";
const LIBCHAT_HASH_BULAW = "d27ec78ed69c9d8969cd01f69fc196f1";
if(INCLUDE_LIBCHAT_WIDGET){
  let libChatWidgetElement = document.createElement('script');
  let hash = (view_name == "BULAW")? LIBCHAT_HASH_BULAW : LIBCHAT_HASH_BU;
  libChatWidgetElement.src = "https://v2.libanswers.com/load_chat.php?hash=" + hash;
  document.head.appendChild(libChatWidgetElement);
}

// - module dependencies - //
export let module_dependencies = ['angularLoad', 'noResults'];
if(INCLUDE_UNPAYWALL){ module_dependencies.push('bulibUnpaywall'); }
if(INCLUDE_OUTBOUND_LINKS){ module_dependencies.push('outboundLinksLogger'); }
if(INCLUDE_HELP_MENU){ module_dependencies.push('helpMenuContentDisplay',  'helpMenuTopbar'); }
if(INCLUDE_ANNOUNCE_BANNER){ module_dependencies.push('announceBanner'); }
