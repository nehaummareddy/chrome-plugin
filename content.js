var captureButtonClicked = false;
var captureAnchorTagClicked = false;
var pdfsList = [];

function addListenerToButtonClick() {
  var bns = document.getElementsByTagName("button");
  for (j = 0; j < bns.length; j++) {
    bns[j].addEventListener("click", function(e) {
    	e = e || window.event;
    	var clickedButton = e.target || e.srcElement;
    	if(captureButtonClicked) {
    		captureButtonClicked = false;
    		getSimilarElements(e,"button");
    	}
	});
  }
}


function addListenerToAchorTagClick() {
  var ans = document.getElementsByTagName("a");
  for (i = 0; i < ans.length; i++) {
    ans[i].addEventListener("click", function(e) {
    	e = e || window.event;
    	var clickedAnchorTag = e.target || e.srcElement;
    	if(captureAnchorTagClicked) {
    		captureAnchorTagClicked = false;
    		getSimilarElements(e,"a");
    	}
	});	
  }
}


window.addEventListener("load",function() {
  addListenerToButtonClick();
  addListenerToAchorTagClick();
});


function getSimilarElements(e,tag){
		var siblingElements = e.target.parentElement.parentElement.getElementsByTagName(tag);
		clickAllElements(siblingElements);
}

function extractPdfDocuments(){
    var array = [];
    var links = document.links;
    var ResouceUrlsArray = ["no pdfs"]
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    for(var i=0; i<links.length; i++) {
                let urls = links[i].outerHTML.match(urlRegex);
                if(urls) urls.push(links[i].href)
                else urls = links[i].href;
                array = array.concat(urls)

    }

    if(array && array.length > 0) {
        ResouceUrlsArray = array.filter(x => x.toString().indexOf(".pdf") > -1);
    }   
    pdfsList = pdfsList.concat(ResouceUrlsArray);
    pdfsList =  Array.from(new Set (pdfsList));
}


function clickAllElements(allElems){
    	var count = 0;
    	var clickCron = setInterval(() => {
    			console.log("click element =>"  + allElems[count].innerText + " Count => " + count + " number of pdf Files => " + pdfsList.length);
				allElems[count].click();
				var eleName = allElems[count].innerText;
				extractPdfDocuments();
				triggerUpdateView(true,eleName);
    			count = count + 1;
    			if(count === allElems.length) {
    				clearTimeout(clickCron);
    				console.log("completed");	
    				triggerUpdateView(false,'');
    			}
    	},5000);		
}


function triggerUpdateView(isFetching,eleName){
	chrome.runtime.sendMessage({
    	action: "update-view-with-pdf-links",
    	initialUpdate : false,
    	isFetching : isFetching,
    	eleName : eleName,
   		pdfLinks : pdfsList	
	});

}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "trigger-click-similar-elements") {
    		console.log("updated capture flag to true");
    		captureButtonClicked = true;
    		captureAnchorTagClicked = true;
    }
});


// $('select[name=' + 'search-results_length' + ']').val('-1')




