app.controller('prmLogoAfterController', [function () {
  var vm = this;
  vm.getIconLink = getIconLink;
  function getIconLink() {
    return vm.parentCtrl.iconLink;
  }
}]);

app.component('prmLogoAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmLogoAfterController',
  template: '<div class="product-logo product-logo-local" layout="row" layout-align="start center" layout-fill id="banner" tabindex="0" role="banner">\n  <a href="https://www.bu.edu/library/search">\n  <img class="logo-image" alt="{{(\'nui.header.LogoAlt\' | translate)}}" ng-src="{{$ctrl.getIconLink()}}"/>\n  </a>\n  </div>'
});
