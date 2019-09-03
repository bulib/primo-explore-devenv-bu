angular.module('bulibwcFooter', [])
  .controller('footerController', ['$http', '$scope', '$timeout',
    function($http, $scope, $timeout){
      $scope.showFooter = false;
      $timeout(function(){
        var pathname = window.location.pathname;
        $scope.showFooter = pathname.includes("openurl") || pathname.includes("fulldisplay");
      },2500);

    }])
  .component('prmFullViewContAfter', {
    template: '<bulib-footer ng-if="showFooter" ng-hide="!showFooter"></bulib-footer>',
    controller: 'footerController'
  });