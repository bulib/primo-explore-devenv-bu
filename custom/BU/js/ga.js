let gaRunList = ['$rootScope', '$location', '$window', function($rootScope, $location, $window){
  $rootScope.$on('$locationChangeSuccess', function(event){
    $window.ga('send', 'pageview', {location: $location.url()});
  });
}];

// helper function for sending event data to google analytics
let gaEventLogger = function(){
  this.logAboutEvent = function(message, debug=false){
    if(debug){ console.log("gaEventLogger) " + message); }
  }
  this.logEvent = function(category="", action="", label="", debug=false){
    var eventMessage = "cat:'"+category + "' act:'"+action + "' label:'"+label+"'";
    if(window.ga){
      window.ga('send', 'event', category, action, label);
      this.logAboutEvent("new '" + category + "' event sent to Google Analytics", debug);
    }else{
      this.logAboutEvent("window.ga not found! cannot log message: '" + eventMessage + "'.", debug);
    }
  }
};
