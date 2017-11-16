angular.element(document).ready(function () {
  if (window.location.href.indexOf('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu') > 0 ) {
      var n = window.location.href.replace('buprimo-hosted-exlibrisgroup-com.ezproxy.bu.edu','buprimo.hosted.exlibrisgroup.com');
      window.location.assign(n);
  }
});
