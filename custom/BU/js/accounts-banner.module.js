angular.module('accountsBanner', ['ngAnimate'])
  // add sign-in prompt ('.announce-banner') to /favorites page (if not signed in)
  .controller('accountsBannerCtrl',[function(){ 
    this.dismiss = function(){ this.dismissed = true; }
    this.handleLogin = function(){ 
      console.log("handleLogin()");
      this.dismiss()
      console.log(this.prmAuthentication);
      this.prmAuthentication.handleLogin(); 
    } 
  }])
  .component('prmFavoritesToolBarAfter', {
    require: { prmAuthentication: '^?prmAuthentication' },
    controller: 'accountsBannerCtrl',
    template: `
      <div class="announce-banner layout-align-center-center layout-row flex info" ng-if="!$ctrl.dismissed">
        <span><a ng-click="$ctrl.handleLogin()">Sign In</a> to view your favorites</span>
        <button id="sign-in" type="button" class="md-button md-primoExplore-theme button-with-icon">
          <span ng-click="$ctrl.handleLogin()">Sign In</span>
        </button>
      </div>
  `})