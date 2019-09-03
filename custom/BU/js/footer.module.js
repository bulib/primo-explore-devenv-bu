angular.module('bulibwcFooter', [])
  .controller('footerController', ['$http', '$scope', '$timeout',
    function($http, $scope, $timeout){
      $scope.showFooter = window.location.search.includes("query");
      $timeout(function(currentPath, hrefArgs){
        // determine whether to display the footer based on current page
        var currentPath = window.location.pathname;  // want to show on the openurl page (and maybe others)
        var hrefArgs = window.location.search;  // want to show on home page, but not results

        if((currentPath === "/primo-explore/openurl") || !hrefArgs.includes("query=")){
          $scope.showFooter = true;
        }
      },2500)
      
    }])
  .component('bulibwcFooter', {
    template: '<bulib-footer ng-if="showFooter"></bulib-footer>',
    controller: 'footerController'
  });