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
    "key",
  );
  mapping.setAttribute("id", "key_custom_" + key + "_" + modifiers);
  mapping.setAttribute("modifiers", modifiers);
  mapping.setAttribute("key", key);
  mapping.setAttribute("oncommand", command);
  mapping.addEventListener("command", this, false);

  let mainKeyset = window.document.getElementById("mainKeyset");
  mainKeyset.appendChild(mapping);
}

function changeKeyboardShortcuts(w) {
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

  w.ToggleURLBarFocus = function () {
    let urlbar = w.document.getElementById("urlbar-input");
    if (urlbar == w.document.activeElement) {
      urlbar.blur();
    } else {
      urlbar.focus();
    }
  };

  setKey(w, "O", "alt", "ToggleURLBarFocus();");
}

/* Load code in global browser context */

try {
  if (!Services.appinfo.inSafeMode) {
    Services.obs.addObserver(
      (subject) => {
        subject.addEventListener(
          "DOMContentLoaded",
          (event) => {
            let document = event.originalTarget;
            let window = document.defaultView;

            if (
              window.location.href === "chrome://browser/content/browser.xhtml"
            ) {
              window.console.log(
                "[comprehensive-firefox]: configuring keyboard shortcuts",
              );
              changeKeyboardShortcuts(window);
            }
          },
          { once: true },
        );
      },
      "chrome-document-global-created",
      false,
    );
  }
} catch (exception) {
  Components.utils.reportError(exception);
}
