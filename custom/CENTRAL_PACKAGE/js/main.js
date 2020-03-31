import {addScriptToHead, addStyleToHead} from './header-imports';

// load web components
addScriptToHead("https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.1.3/webcomponents-loader.min.js", "", "defer");
addScriptToHead("https://unpkg.com/bulib-wc@0.1.28/src/index.js?module", "module", "defer");

// add styles 
addStyleToHead("https://cdn.jsdelivr.net/npm/bulib-wc@0.1.28/dist/bundle.min.css");

// create the 'centralCustom' and add in the pageview i
angular.module('centralCustom', ['angularLoad']);