(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-5204430-3', 'auto');

// send pageview event --- ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue])
ga('send', 'pageview');

app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
  $rootScope.$on('$locationChangeSuccess', function(event){
    $window.ga('send', 'pageview', {location: $location.url()});
  });
}]);

app.service('gaEventLogger', function(){
  this.logEvent = function(category="", action="", label="", debug=true){
    var eventMessage = "cat:"+category + " act:"+action + " label:"+label;
    if(window.ga){
      if(debug){ console.log("logging '" + eventMessage + "' event to google analytics."); }
      window.ga('send', 'event', category, action, label);
    }else{
      if(debug){
        console.log("window.ga not found! cannot log message: '" + eventMessage + "'.");
      }
    }
  }
});
