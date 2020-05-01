// import other modules
import './availabilityLineAfter.module';
import './browzine';

// create main 'app' module with additional 'smsLink' dependency
var app = angular.module('viewCustom', ['angularLoad', 'availabilityCustomizations']);

// Add SMS
app.filter('encode', function () { 
  return encodeURIComponent;
});

// add in availability lines customization
app.component('prmSearchResultAvailabilityLineAfter', {
    template: `<availability-customizations></availability-customizations>`
});