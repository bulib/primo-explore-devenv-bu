(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-5204430-3', 'auto');
ga('send', 'pageview');

app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
  $rootScope.$on('$locationChangeSuccess', function(event){
    $window.ga('send', 'pageview', {location: $location.url()});
  });
}]);

// helper function for sending event data to google analytics
app.service('gaEventLogger', function(){
  this.logAboutEvent = function(message, debug=false){
    if(debug){ console.log("gaEventLogger) " + message); }
  }
  this.logEvent = function(category="", action="", label="", debug=false){
    var eventMessage = "cat:'"+category + "' act:'"+action + "' label:'"+label+"'";
    if(window.ga){
      // send pageview event --- ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue])
      window.ga('send', 'event', category, action, label);
      this.logAboutEvent("new '" + category + "' event sent to Google Analytics", debug);
    }else{
      this.logAboutEvent("window.ga not found! cannot log message: '" + eventMessage + "'.", debug);
    }
  }
});
