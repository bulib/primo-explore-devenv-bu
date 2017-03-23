angular.element(document).ready(function () {
  if (window.location.href.indexOf('.ezproxy.bu.edu') > 0 ) {
      var n = window.location.href.replace('.ezproxy.bu.edu','');
      window.location.assign(n);
  }
});
