/* - add css and javascript imports to the header - */

// add a css stylesheet import to the head
let addStyleToHead = function(url){
  let new_style = document.createElement("link");
  new_style.rel="stylesheet";
  new_style.type="text/css";
  new_style.href=url;
  document.head.appendChild(new_style);
}

// add javascript helper/library to the header
let addScriptToHead = function(url, type, attr){
  let new_script = document.createElement("script");
  new_script.src = url; 
  new_script.type = (!!type)? type : "text/javascript";
  
  // add bare attribute, if one exists (e.g. 'defer')
  if(!!attr){
    let att = document.createAttribute(attr);
    new_script.setAttributeNode(att);
  }
  document.head.appendChild(new_script)
}

// load web components
addScriptToHead("https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.1.3/webcomponents-loader.min.js", "", "defer");
addScriptToHead("https://unpkg.com/bulib-wc@0.1.9/src/index.js?module", "module", "defer");

// add styles 
addStyleToHead("https://cdn.jsdelivr.net/npm/bulib-wc@0.1.9/dist/bundle.min.css");
