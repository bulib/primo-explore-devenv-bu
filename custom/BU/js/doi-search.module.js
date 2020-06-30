/* - provide recommended resource when search query contains a DOI - */

// - logging - //
const DEBUG = true;
const logDoiSearchMessage = (message) => { if(DEBUG){ console.log("doi-search) " + message); }}

// - helpers - // 

// DOI Regex constructed from Crossref [https://www.crossref.org/blog/dois-and-matching-regular-expressions/]
const doi_regex = /10\.\d{4,9}[\/~][-~._;()\/:A-Z0-9]+|10\.1002[\/~][^\s]+|10\.\d{4}[\/~]\d+-\d+X?(\d+)\d+<[\d\w]+:[\d\w]*>\d+.\d+.\w+;\d+|10\.1207[\/~][\w\d]+\&\d+_\d+/gi;

// - module definition - //
angular.module('doiSearch', [])

  .controller('doiSearchController', [function () {
    let query = this.parentCtrl.query;
    logDoiSearchMessage(`query: '${query}'`);

    let doi; let doisContained = [];
    while ((doi = doi_regex.exec(query)) != null) {
      doisContained.push(doi);
    }
    this.dois = doisContained;
    logDoiSearchMessage(`doisContained: '${doisContained}'`);
  }])

  .component('prmResourceRecommenderAfter',{
    bindings: {parentCtrl: '<'},
    controller: 'doiSearchController',
    template: `<strong>dois contained:</strong>&nbsp;<em>$ctrl.dois</em>`
  });