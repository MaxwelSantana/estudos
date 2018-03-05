function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("mx-include-html");
        if (file) {
            let url = getUrlComponent(file);
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {appendComponent(elmnt, this.responseText, file)}
                if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                /*remove the attribute, and call this function once more:*/
                elmnt.removeAttribute("mx-include-html");
                includeHTML();
            }
            }      
            xhttp.open("GET", url, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

function appendComponent(elmnt, content, page){
    if(page){
        elmnt.classList.add("component-" + page.slice(0,page.indexOf(".")));
    }
    elmnt.innerHTML = content;
    nodeScriptReplace(elmnt);
}

function getUrlComponent(page){
    return document.URL + "/components/" + page.slice(0,page.indexOf(".")) + "/" + page;
}

function loadComponentJS(componentjs){
    fetch(getUrlComponent(componentjs))
}

function nodeScriptReplace(node) {
    if ( nodeScriptIs(node) === true ) {
        node.parentNode.replaceChild( nodeScriptClone(node) , node );
    }
    else {
        var i = 0;
        var children = node.childNodes;
        while ( i < children.length ) {
            nodeScriptReplace( children[i++] );
        }
    }
    return node;
}
function nodeScriptIs(node) {
    return node.tagName === 'SCRIPT';
}
function nodeScriptClone(node){
    var script  = document.createElement("script");
    script.text = node.innerHTML;
    for( var i = node.attributes.length-1; i >= 0; i-- ) {
            script.setAttribute( node.attributes[i].name, node.attributes[i].value );
    }
    return script;
}