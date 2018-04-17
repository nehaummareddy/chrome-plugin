function onWindowLoad() {
  var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {file: "extract.js"}, 
    function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

window.onload = onWindowLoad;

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("upload-button-id").addEventListener("click", function(e){
        var password =  document.getElementById("password-id") && document.getElementById("password-id").value;
        chrome.extension.sendMessage({action:"upload-files", password : password}, function(response) {
           //callback
      });
  });
});



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("capture-button-id").addEventListener("click", function(e){
        chrome.extension.sendMessage({action:"trigger-click"}, function(response) {
          
      });
  });
});




