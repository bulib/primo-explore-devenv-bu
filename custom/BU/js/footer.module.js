let footerContent = `
  <style>
    #address-list > li { padding-left: 0px; }
  </style>
  <div class="footer-wrapper">
  <footer class="pam">
    <div class="ftr-left">
      <div id="bu-content">
        <div class="left txtc bu-logo">
          <br />
          <a href="https://www.bu.edu/" title="Boston University Home"><img alt="boston university logo" src="http://www.bu.edu/academics/files/bu-logo.gif"></a>
          <br /><br />
          <small><a class="white-link" href="https://www.bu.edu/copyright" title="Copyright">&copy; Copyright ${new Date().getFullYear()}</a></small>
          <br /><br />
        </div>
          <ul class="no-bullet ptl">
            <li><a class="white-link" href="https://www.bu.edu/library/" title="Libraries Home">Libraries Home</a></li>
            <li><a class="white-link" href="http://bu.edu/library/search" title="Search available/licensed content">Libraries Search</a></li>
            <li><a class="white-link" href="http://bu.edu/library/about" title="Information regarding various BU Libraries">Library Locations</a></li>
            <li><a class="white-link" href="https://askalibrarian.bu.edu/" title="Help">Help</a></li>
          </ul>
      </div>
    </div>
    <div class="ftr-middle">
      <h3 class="txtc">Boston University Libraries Search</h3>
      <div class="centered-div">
      <ul class="multi-column no-bullet">
        <li><a class="white-link" href="/primo-explore/browse">Browse</a></li>
        <li><a class="white-link" href="https://www.bu.edu/library/help/bu-libraries-search/">Search Help</a></li>
        <li><a class="white-link" href="http://library.bu.edu/az.php">Databases List (A-Z)</a></li>
        <li><a class="white-link" href="https://www.bu.edu/library/help/bu-libraries-search/new-bu-libraries-search-features/">What's New</a></li>
      </ul>
      </div>
    </div>
    <div class="ftr-right">
      <div>
        <div id="locoso">
          <div class="left prm">
            <h3 class="inline">Visit Us</h3>&nbsp;
            <ol id="address-list" class="no-bullet" aria-label="address">
              <li>Boston University Libraries</li>
              <li>771 Commonwealth Ave.</li>
              <li>Boston, MA 02215</li>
              <li>
                <small>
                  <a class="white-link" aria-label="Open library site" href="https://bu.edu/library" title="BU Library website">website</a>
                  <a class="white-link" aria-label="Directions to the Library" title="get directions" target="_blank"
                    href="https://google.com/maps/search/Boston+University+Mugar+Library">directions &raquo;</a>
                </small>
              </li>
            </ol>
          </div>
          <div>
            <h3 class="inline">Contact Us</h3>
            <ul class="no-bullet" aria-label="contact-links">
              <li>call <a class="white-link" href="tel:617-353-2700">617-353-2700</a></li>
              <li>email <a class="white-link" href="mailto:ask@bu.edu">ask@bu.edu</a></li>
              <li>text <a class="white-link" href="sms:617-431-2427">617-431-2427</a></li>
            </ul>
            <h3>Follow Us</h3>
            <ul aria-description="list of social media accounts" class="no-bullet inline-list plm">
              <li><a target="_blank" href="http://twitter.com/BULibNews" title="twitter"><img alt="twitter icon" class="sm-icon white-link"
                     src="https://raw.githubusercontent.com/bulib/bulib-wc/master/assets/icons/icons8-twitter-48.png"></a></li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  </footer>
  </div>`;

app.constant("footerHelper", {
  debugFooter: true,
  logFooterMessage: function(message){
    if(this.debugFooter){ console.log("footerHelper) " + message); }
  },
  populateFooter: function($timeout) {

    // determine whether to display the footer based on current page
    let currentPath = window.location.pathname;  // want to show on the openurl page (and maybe others)
    let hrefArgs = window.location.search;  // want to show on home page, but not results
    let showFooter = (currentPath === "/primo-explore/openurl") || !hrefArgs.includes("query=");
    this.logFooterMessage(`showFooter: '${showFooter}' for path '${currentPath}' with hrefArgs '${hrefArgs}'.`);

    // based on this information, populate the '<bulibwc-footer>' component defined below
    let elem = document.getElementById("footer-wrapper");
    elem.innerHTML = "";
    if(showFooter){
      this.logFooterMessage("awaiting timeout before loading footer");

      // wait to load the footer until we're reasonably sure the rest of the page has loaded
      let timeout_duration = currentPath.includes("openurl")? 2250 : 500;
      self = this;  // quick copy 'this' for access within $timeout TODO: fix this
      $timeout(function(){
        elem.innerHTML = footerContent;
        self.logFooterMessage("footer loaded after " + timeout_duration + "ms.");
      }, timeout_duration);
    }
  }
});

angular.module('bulibwcFooter', [])
  .component('prmExploreFooterAfter', {
    template: `
    <bulibwc-footer>
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/bulib/bulib-wc@common-v1.0/assets/css/common.min.css">
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/bulib/bulib-wc@footer-v2.6.6/src/footer/footer.min.css">
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/bulib/bulib-wc@locoso-v1.4/src/locoso/locoso.min.css">
      <div id="footer-wrapper"></div>
    <bulibwc-footer>`,
    controller: function($rootScope, footerHelper, $timeout) {
      $rootScope.$on("$locationChangeSuccess", function(event){
        footerHelper.logFooterMessage("$locationChangeSuccess emitted for " + window.location.pathname + " calling footerHelper!");
        footerHelper.populateFooter($timeout);
      });
    }
  });
