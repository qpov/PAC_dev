chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var mainElements = document.querySelectorAll('.main p');
    mainElements[0].textContent = message.text;
    mainElements[2].textContent = Number(message.text) - 1;
  });
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: function() {
        var tables = document.querySelectorAll('.propertyTable');
        if (tables.length > 2) {
          var values = tables[2].querySelectorAll('.propertyValue');
          if (values.length > 0) {
            var text = values[0].textContent;
            chrome.runtime.sendMessage({text: text});
          }
        }
      }
    });
  });