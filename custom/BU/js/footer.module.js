angular.module('bulibwcFooter', [])
  .component('prmExploreFooterAfter', {
    bindings: { parentCtrl: '<'},
    template: `
    <bulibwc-footer>
      <hr /><br /><br /><hr />
      <bulib-footer host_site="primo"></bulib-footer>
    <bulibwc-footer>
    `,
    controller: function footerController() {
      console.log("Successfully loaded the footer at path: '" + window.location.pathname + "'.");
    },
  });
