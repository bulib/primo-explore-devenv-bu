angular.module('secondaryBanner', [])
  .component('prmTopbarAfter', {
    template: `
      <secondary-banner>
        <div class="row" style="color: white !important;">{{$ctrl.secondaryNavHtml}}</div>
      </secondary-banner>
    `,
    controller:
      function secondaryBannerController(secondaryBannerOptions) {
        var titlePrefix = secondaryBannerOptions.titleFragment;
        this.secondaryNavHtml = secondaryBannerOptions.htmlToInsert;
        console.log("secondaryBanner controller called with innerHtml: " + this.secondaryNavHtml);
      }
  });
