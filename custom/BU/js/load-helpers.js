/* - help to construct 'module_dependencies' based on feature flags - */

// add LibChat widget
import {addLibchatWidgetWithHash} from '../../CENTRAL_PACKAGE/js/header-imports';
const LIBCHAT_HASH_BU = "0b9beff60316d9b71b1de06909bdf5c1";
addLibchatWidgetWithHash(LIBCHAT_HASH_BU);

// configuration options
const INCLUDE_EZPROXY = true;
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

// - module dependencies - //
export let module_dependencies = ['angularLoad', 'noResults'];
if(INCLUDE_UNPAYWALL){ module_dependencies.push('bulibUnpaywall'); }
if(INCLUDE_OUTBOUND_LINKS){ module_dependencies.push('outboundLinksLogger'); }
if(INCLUDE_HELP_MENU){ module_dependencies.push('helpMenuContentDisplay',  'helpMenuTopbar'); }
if(INCLUDE_ANNOUNCE_BANNER){ module_dependencies.push('announceBanner'); }
