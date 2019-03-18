// configuration options
let INCLUDE_LIBCHAT_WIDGET = true;
let INCLUDE_EZPROXY = true;

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