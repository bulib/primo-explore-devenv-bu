function addProxy() {
    app.controller('prmServiceLinksAfterController',[ function () {
        var vm = this;
        var parentCtrl = vm.parentCtrl;
        var baseUrls = window.appConfig[ 'mapping-tables'][ 'Institution Base URLs'];
        
        vm.$onInit = function () {
            var pnxRecord = vm.parentCtrl.item.pnx;
            var proxy = '';
                        
            /* find the proxy URL - N.B. - assumes MT is already Institution-specific (i.e. only one proxy_prefix line) */
            angular.forEach(baseUrls, function (value, key) {
                if (value.source2 == 'proxy_prefix') {
                    proxy = value.target;
                }
            });
            
            if (parentCtrl.item.context == "PC" && (typeof pnxRecord.addata.oa == "undefined" || pnxRecord.addata.oa[0] != "free_for_read")) {
                /* PC record AND (no addata/oa OR addata/oa does not contain "free_for_read") => proxy */
                angular.forEach(parentCtrl.recordLinks, function (value, key) {
                    value.linkURL = proxy + value.linkURL;
                });
            }
        };
    }]);
    
    app.component('prmServiceLinksAfter', {
        bindings: {
            parentCtrl: '<'
        },
        controller: 'prmServiceLinksAfterController',
    });
}

function checkProquest(){ 
setTimeout(function(){ 
//timeout set to ensure all elements of page are present before running function 
var checkResultPage = document.body.innerHTML.toString().search('full-view-section-content'); 
if (checkResultPage > -1){ 
var myEl = angular.element( document.querySelector( '#getit_link1_0 a.arrow-link' ) ); 
var myElAttr = myEl.attr('href'); 
if (myElAttr.indexOf("search.proquest") !== -1 && myElAttr.indexOf("ezproxy") == -1) { 
myEl.attr('href', 'http://ezproxy.bu.edu/login?url='+myElAttr) 
} 
} 
},1000) 
} 

addProxy();
checkProquest();