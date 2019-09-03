// configuration options
const INCLUDE_LIBCHAT_WIDGET = true;
const INCLUDE_EZPROXY = true;
const INCLUDE_FOOTER = true;
const INCLUDE_UNPAYWALL = true;
const INCLUDE_OUTBOUND_LINKS = false;
const INCLUDE_HELP_MENU = true;
const INCLUDE_ANNOUNCE_BANNER = true;

// - production vs staging - //
export const ENV_PRODUCTION = true;
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
if(INCLUDE_LIBCHAT_WIDGET){
  let libChatWidgetElement = document.createElement('script') ;
  libChatWidgetElement.src = "https://v2.libanswers.com/load_chat.php?hash=0b9beff60316d9b71b1de06909bdf5c1";
  document.head.appendChild(libChatWidgetElement);
}

// - module dependencies - //
export let module_dependencies = ['angularLoad'];
if(INCLUDE_FOOTER){ module_dependencies.push('bulibwcFooter'); }
if(INCLUDE_UNPAYWALL){ module_dependencies.push('bulibUnpaywall'); }
if(INCLUDE_OUTBOUND_LINKS){ module_dependencies.push('outboundLinksLogger'); }
if(INCLUDE_HELP_MENU){ module_dependencies.push('helpMenuContentDisplay',  'helpMenuTopbar'); }
if(INCLUDE_ANNOUNCE_BANNER){ module_dependencies.push('wrlcAnnounce'); }
