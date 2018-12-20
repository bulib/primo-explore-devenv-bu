angular.module('secondaryBanner', [])
  .component('prmTopbarAfter', {
    template: `
      <secondary-banner>
        <div class="row"><h1>{{$ctrl.title}}</h1></div>
      </secondary-banner>
    `,
    controller:
      function secondaryBannerController(secondaryBannerOptions) {
        let h1HtmlCollection = document.getElementsByTagName("h1");
        console.log(h1HtmlCollection);
        for(let elem of h1HtmlCollection){
          console.log(elem);
        }
        self.title = secondaryBannerOptions.title;
        this.secondaryNavHtml = secondaryBannerOptions.htmlToInsert;
        console.log("secondaryBanner controller called with innerHtml: " + this.secondaryNavHtml);
      }
  });
