let debug = true;

let logLinkToResource = function(fullViewOrMore, urlClicked){
  let category, action, label, eventMessage;
  category = "link-to-resource";
  action = fullViewOrMore;
  label = urlClicked;
  eventMessage = `cat:'${category}' act:'${action}' label:'${label}'`;
  console.log("link-to-resource: creating new google event " + eventMessage);
  if(window.ga && !debug){
    window.ga('send', 'event', category, action, label);
  }
}

let getAnchorTagsFromMoreLinks = function(){
  console.log("getting anchor tags from more links");
  let lsAnchorElems = document.getElementsByClassName("arrow-link md-primoExplore-theme");
  console.log(lsAnchorElems);
  console.log(lsAnchorElems.length);
  for(let i=0; i<lsAnchorElems.length; i++){
    let elem = lsAnchorElems[i];
    console.log(elem);
    let offsetParent = elem.getAttribute('offsetParent');
    console.log(offsetParent);
  }
  return lsAnchorElems;
}

let l2rMoreLinks = function () {
  logLinkToResource("more-links", "test.com");
  let linkElements = document.querySelector("prm-service-links");
  console.log(linkElements);
}


// window.onload = function(){ ; }
// if(window.attachEvent){ window.attachEvent('onload', l2rMoreLinks)}
// window.addEventListener('onload', function(){
//   console.log("fufu");
// }, false);


getAnchorTagsFromMoreLinks();
