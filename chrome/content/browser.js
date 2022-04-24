window.addEventListener("load", function () {
  customTabWidth.init();
}, false);
window.addEventListener("unload", function () {
  customTabWidth.uninit();
}, false);

var customTabWidth = {
  init: function() {
    var ss = document.styleSheets;
    for (let i = ss.length - 1; i >= 0; i--) {
      if (ss[i].href == "chrome://tab-width/content/browser.css") {
         this.styleSheet = ss[i];
         break;
      }
    }
    Services.prefs.addObserver("browser.tabs.tabMinWidth", this, false);
    Services.prefs.addObserver("browser.tabs.tabMaxWidth", this, false);
    this.observe();
  },
  uninit: function () {
    Services.prefs.removeObserver("browser.tabs.tabMinWidth", this);
    Services.prefs.removeObserver("browser.tabs.tabMaxWidth", this);
    delete this.styleSheet;
  },
  observe: function () {
    var min = Math.max(20, Services.prefs.getIntPref("browser.tabs.tabMinWidth"));
    var max = Math.max(20, Services.prefs.getIntPref("browser.tabs.tabMaxWidth"));
    var style = this.styleSheet.cssRules[1].style;
    style.setProperty("min-width", min + "px", "important");
    style.setProperty("max-width", max + "px", "important");
  }
};