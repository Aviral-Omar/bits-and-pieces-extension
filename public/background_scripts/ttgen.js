/*global browser, chrome*/

const listener = async () => {
  try {
    await browser.tabs.executeScript({
      file: `/content_scripts/ttgen.js`,
    });
  } catch {
    await chrome.tabs.executeScript({
      file: `/content_scripts/ttgen.js`,
    });
  }
};

try {
  browser.webNavigation.onCompleted.addListener(listener, {
    url: [{ urlMatches: "https://timetable.bits-dvm.org/renderer.html" }],
  });

  browser.runtime.onMessage.addListener((message) => {
    if (message.tt) {
      const ld = new Array(12);
      for (let i = 0; i < 12; i++) {
        ld[i] = new Array(6);
        for (let j = 0; j < 6; j++) {
          ld[i][j] = {
            url: "",
            platform: "gmeet",
          };
        }
      }
      browser.storage.sync.set({ ...message, linkData: ld });
    }
  });
} catch {
  chrome.webNavigation.onCompleted.addListener(listener, {
    url: [{ urlMatches: "https://timetable.bits-dvm.org/renderer.html" }],
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.tt) {
      const ld = new Array(12);
      for (let i = 0; i < 12; i++) {
        ld[i] = new Array(6);
        for (let j = 0; j < 6; j++) {
          ld[i][j] = {
            url: "",
            platform: "gmeet",
          };
        }
      }
      chrome.storage.sync.set({ ...message, linkData: ld });
    }
  });
}
