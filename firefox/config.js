// IMPORTANT: Start your code on the 2nd line

/* Preferences */

defaultPref("browser.urlbar.decodeURLsOnCopy", true);
defaultPref("browser.urlbar.trimURLs", false);
defaultPref("places.history.expiration.max_pages", 2147483647);
defaultPref("apz.gtk.kinetic_scroll.enabled", false);

defaultPref("services.sync.engine.addons", false);
defaultPref("services.sync.engine.bookmarks", false);
defaultPref("services.sync.engine.history", false);
defaultPref("services.sync.engine.prefs", false);

/* Custom Keybindings */

function mapKey(window, key, modifiers, command) {
  let mapping = window.document.getElementById(command);
  mapping.setAttribute("modifiers", modifiers);
  mapping.setAttribute("key", key);
}

function setKey(window, key, modifiers, command) {
  let mapping = window.document.createElementNS(
    "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
    "key"
  );
  mapping.setAttribute("id", "key_custom_" + key + "_" + modifiers);
  mapping.setAttribute("modifiers", modifiers);
  mapping.setAttribute("key", key);
  mapping.setAttribute("oncommand", command);
  mapping.addEventListener("command", this, false);

  let mainKeyset = window.document.getElementById("mainKeyset");
  mainKeyset.appendChild(mapping);
}

function __changeKeyboardShortcuts(w) {
  setKey(w, "W", "", "gBrowser.tabContainer.advanceSelectedTab(1, true);");
  setKey(w, "Q", "", "gBrowser.tabContainer.advanceSelectedTab(-1, true);");
  setKey(w, "S", "", "gBrowser.selectTabAtIndex(-1, event);");
  setKey(w, "A", "", "gBrowser.selectTabAtIndex(0, event);");

  setKey(w, "W", "shift", "gBrowser.moveTabForward();");
  setKey(w, "Q", "shift", "gBrowser.moveTabBackward();");
  setKey(w, "S", "shift", "gBrowser.moveTabToEnd();");
  setKey(w, "A", "shift", "gBrowser.moveTabToStart();");

  setKey(w, "X", "", "BrowserCloseTabOrWindow(event);");
  setKey(w, "U", "", "undoCloseTab();");
  setKey(w, "T", "", "BrowserOpenTab();");
  let muteCommand =
    "gBrowser.toggleMuteAudioOnMultiSelectedTabs(gBrowser.selectedTab);";
  setKey(w, "M", "", muteCommand);
  setKey(w, "R", "", "BrowserReload();");
  setKey(w, "R", "shift", "BrowserReloadSkipCache();");

  setKey(w, "C", "", "BrowserBack();");
  setKey(w, "V", "", "BrowserForward();");
}

try {
  let { classes: Cc, interfaces: Ci, manager: Cm } = Components;
  const { Services } = Components.utils.import(
    "resource://gre/modules/Services.jsm"
  );
  const { SessionStore } = Components.utils.import(
    "resource:///modules/sessionstore/SessionStore.jsm"
  );
  function ConfigJS() {
    Services.obs.addObserver(this, "chrome-document-global-created", false);
  }
  ConfigJS.prototype = {
    observe: function (aSubject) {
      aSubject.addEventListener("DOMContentLoaded", this, { once: true });
    },
    handleEvent: function (aEvent) {
      let document = aEvent.originalTarget;
      let window = document.defaultView;
      let location = window.location;
      if (
        /^(chrome:(?!\/\/(global\/content\/commonDialog|browser\/content\/webext-panels)\.x?html)|about:(?!blank))/i.test(
          location.href
        )
      ) {
        if (window._gBrowser) {
          __changeKeyboardShortcuts(window);
        }
      }
    },
  };
  if (!Services.appinfo.inSafeMode) {
    new ConfigJS();
  }
} catch (ex) {}
