const { mapkey, unmapAllExcept, Hints, Front, RUNTIME } = api;

unmapAllExcept(["j", "k", "gg", "G"]);

Hints.setCharacters("fjdksla");

mapkey("l", "Choose a tab", function () {
  Front.openOmnibar({ type: "Tabs", extra: {} });
});

mapkey("f", "Open a link in same tab", function () {
  Hints.create("", Hints.dispatchMouseClick, { tabbed: false, active: false });
});
mapkey("b", "Open a link in non-active new tab", function () {
  Hints.create("", Hints.dispatchMouseClick, { tabbed: true, active: false });
});
mapkey("n", "Mouse over elements.", function () {
  Hints.create("", Hints.dispatchMouseClick, { mouseEvents: ["mouseover"] });
});

mapkey("y", "Capture with org-capture", function () {
  function openUrl(url) {
    RUNTIME("openLink", {
      tab: {
        tabbed: false,
      },
      url: url,
    });
  }

  Front.showEditor(
    "",
    function (body) {
      openUrl(
        "org-protocol://capture?" +
          new URLSearchParams({
            template: "wc",
            url: location.href,
            title: document.title,
            body: body,
          })
      );
    },
    "url"
  );
});
