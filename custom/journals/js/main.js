// set the google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('send', 'pageview');
ga('create', 'UA-5204430-3', 'auto');

// create the main module
angular.module('viewCustom', ['angularLoad'])

  // log a page view event
  .run(['$rootScope', '$location', '$window', 
    function($rootScope, $location, $window){
      $rootScope.$on('$locationChangeSuccess', function(event){
        $window.ga('send', 'pageview', {location: $location.url()});
      });
    }
  ])

  // add 'bulib-announce' banner for 'primo-journals', 'primo', 'all'
  .component('prmSearchBarAfter', {
    template: `
      <div id="bulib-announcements">
        <bulib-announce dismissed code="primo-journals"></bulib-announce>
        <bulib-announce dismissed code="primo"></bulib-announce>
        <bulib-announce dismissed code="all"></bulib-announce>
      </div>
    `
  })
;
