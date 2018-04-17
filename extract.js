function getPdfLinksFromCurrentPageSource () {
    var array = [];
    var links = document.links;
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var ResouceUrlsArray = ["no pdfs"]
    for(var i=0; i<links.length; i++) {
                let urls = links[i].outerHTML.match(urlRegex);
                if(urls) urls.push(links[i].href)
                else urls = links[i].href;
                array = array.concat(urls);
    }

    // makine elements uniq
    array =  Array.from(new Set(array));
    if(array && array.length > 0) {
        ResouceUrlsArray = array.filter(x => x && x.toString().indexOf(".pdf") > -1);
        ResouceUrlsArray = Array.from(new Set(ResouceUrlsArray))
    }   
    return ResouceUrlsArray;
}


chrome.runtime.sendMessage({
    action: "update-view-with-pdf-links",
    initialUpdate: true,
    eleName: '',
    pdfLinks : getPdfLinksFromCurrentPageSource()
});


