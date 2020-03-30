angular.module('viewCustom', ['angularLoad'])

// add 'bulib-announce' banner for 'primo-ISL', 'primo', 'all'
.component('prmSearchBarAfter', {
  template: `
    <div id="bulib-announcements">
      <bulib-announce dismissed code="primo-ISL"></bulib-announce>
      <bulib-announce dismissed code="primo"></bulib-announce>
      <!--bulib-announce dismissed code="all"></bulib-announce-->
    </div>
  `
});