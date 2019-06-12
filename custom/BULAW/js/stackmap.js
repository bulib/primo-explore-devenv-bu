// - StackMap: Start - //

/* add fontawesome and stackmap stylesheets to <head> */
var a = document.querySelector("head");
var css1 = document.createElement("link"); 
css1.type = "text/css";
css1.rel = "Stylesheet";
css1.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
css1.crossorigin = "anonymous";
a.appendChild(css1); // <link type="text/css" rel="Stylesheet" href="___" crossorigin="anonymous" />

var css2 = document.createElement("link"); 
css2.type = "text/css";
css2.rel = "Stylesheet";
css2.href = "https://www.stackmap.com/integration/bulaw-new-primo/StackMap.css";
a.appendChild(css2); // <link type="text/css" rel="Stylesheet" href="___" />

/* add stackmap script to <body> */
var w = document.createElement("script"); 
w.type = "text/javascript"; w.async = true;
w.src = "https://www.stackmap.com/integration/bulaw-new-primo/StackMap.js";
var b = document.body;
b.appendChild(w);  // <script type="text/javascript" src="___/StackMap.js" async></script>

// - StackMap: END - //