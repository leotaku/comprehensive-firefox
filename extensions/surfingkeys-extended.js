const { map, mapkey, unmapAllExcept, Hints, Front, RUNTIME } = api;

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
          }),
      );
    },
    "url",
  );
});

mapkey("t", "Open new tab", function () {
  RUNTIME("openLink", {
    tab: {
      tabbed: true,
    },
    url: "about:blank",
  });
});

mapkey("q", "Select previous tab", function () {
  RUNTIME("previousTab");
});
mapkey("w", "Select next tab", function () {
  RUNTIME("nextTab");
});
mapkey("Q", "Move current tab to left", function () {
  RUNTIME("moveTab", {
    step: -1,
  });
});
mapkey("W", "Move current tab to right", function () {
  RUNTIME("moveTab", {
    step: 1,
  });
});

map("a", "Focus first tab", function () {
  RUNTIME.repeats = 500;
  RUNTIME("previousTab");
});
map("s", "Focus last tab", function () {
  RUNTIME.repeats = 500;
  RUNTIME("nextTab");
});
mapkey("A", "Move current tab to far left", function () {
  RUNTIME("moveTab", {
    step: -500,
  });
});
mapkey("S", "Move current tab to far right", function () {
  RUNTIME("moveTab", {
    step: 500,
  });
});

mapkey("x", "Close current tab", function () {
  RUNTIME("closeTab");
});
mapkey("r", "#4Reload the page", function () {
  RUNTIME("reloadTab", { nocache: false });
});
mapkey("u", "Restore closed tab", function () {
  RUNTIME("openLast");
});
mapkey("p", "pin/unpin current tab", function () {
  RUNTIME("togglePinTab");
});
mapkey("m", "mute/unmute current tab", function () {
  RUNTIME("muteTab");
});

mapkey(
  "c",
  "Go back in history",
  function () {
    history.go(-1);
  },
  { repeatIgnore: true },
);

mapkey(
  "v",
  "Go forward in history",
  function () {
    history.go(1);
  },
  { repeatIgnore: true },
);

mapkey("=", "Reset zoom level", function () {
  RUNTIME("setZoom", {
    zoomFactor: 0,
  });
});
mapkey("+", "Zoom in", function () {
  RUNTIME("setZoom", {
    zoomFactor: 0.05,
  });
});
mapkey("-", "Zoom out", function () {
  RUNTIME("setZoom", {
    zoomFactor: -0.05,
  });
});
