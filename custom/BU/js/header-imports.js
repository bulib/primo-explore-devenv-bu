var headElem = document.getElementsByTagName("head")[0];

var addStyleToHead = function(url){
  var new_style = document.createElement("link");
  new_style.rel="stylesheet";
  new_style.type="text/css";
  new_style.href=url;
  headElem.appendChild(new_style);
}

var addScriptToHead = function(url, type){
  if(!type){ type="text/javascript"; }
  var new_script = document.createElement("script");
  new_script.src = url; 
  headElem.appendChild(new_script)
}

// load web components
addScriptToHead("https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.1.3/webcomponents-bundle.min.js");
addScriptToHead("https://unpkg.com/bulib-wc@0.0.70/src/index.js?module", "module");

// add styles 
addStyleToHead("https://cdn.jsdelivr.net/npm/bulib-wc@0.0.70/dist/bundle.min.css");
addStyleToHead("https://fonts.googleapis.com/icon?family=Material+Icons");
addStyleToHead("https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap");