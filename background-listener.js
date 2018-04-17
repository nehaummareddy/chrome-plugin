
var UserButtonClickElements = [];
var UserAnchorTagClickDomElements = [];
var pdfLinks = [];
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "update-view-with-pdf-links") {
    var message = document.querySelector('#message');

    console.log(request.initialUpdate + pdfLinks.length);
    if(request.initialUpdate && pdfLinks.length === 0)  {
      console.log("updated1");
      console.log("updated1. length =>" + pdfLinks.length);
      pdfLinks = request.pdfLinks;
    }
    else if(!request.initialUpdate) {
      console.log("updated2");
       console.log("updated2. length =>" + pdfLinks.length);
      pdfLinks = request.pdfLinks;
    }

    console.log("text =>" + pdfLinks.join("\n"));
    if(message) { 
      if(pdfLinks && pdfLinks.length > 0){
        var text  = pdfLinks.join("\n") ;
        if(!request.initialUpdate) text = text +  (request.isFetching ? ("\n\n\nFetching files, please wait. Element clicked => " + request.eleName ) : "\n\n\nCompleted fetching files");
        message.innerText = text;
      }else message.innerText =  request.isFetching ? ("No files yet!" + "\n\nFetching files. Element clicked => " + request.eleName ) : "No pdf Files";
    }
  }else if(request.action == "button_clicked"){
    UserButtonClickElements.push(request.element);
    alert(UserButtonClickElements.join("/n"));
  }else if(request.action === "anchor_tag_clicked"){
    UserAnchorTagClickDomElements.push(request.element);
     alert(UserAnchorTagClickDomElements.join("/n"));
  }else if(request.action === "upload-files"){
      if(request.password && pdfLinks.length > 0) dummyService(request.password);
  } 
  else if(request.action === 'trigger-click'){
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "trigger-click-similar-elements"}, function(response) {
        // call back
       });
    });
  }
});

