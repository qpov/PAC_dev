chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.scripting.executeScript({
    target: {tabId: tabs[0].id},
    function: function() {
      var elements = document.getElementsByClassName('propertyValue');
      for (var i = 0; i < elements.length; i++) {
        var text = elements[i].textContent;
        chrome.runtime.sendMessage({text: text});
      }
    }
  });
});