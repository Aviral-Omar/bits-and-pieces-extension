/*global browser, chrome*/

//Common
browser.webNavigation.onDOMContentLoaded.addListener(
  async () => {
    try {
      await browser.tabs.executeScript({
        file: `/content_scripts/browser-polyfill.js`,
      });
      await browser.tabs.executeScript({
        file: `/content_scripts/ttgen.js`,
      });
    } catch (error) {
      console.error(error);
    }
  },
  {
    url: [{ urlMatches: "https://timetable.bits-dvm.org/renderer.html" }],
  }
);

browser.runtime.onMessage.addListener((message) => {
  if (message.tt) {
    const ld = new Array(12);
    for (let i = 0; i < 12; i++) {
      ld[i] = new Array(6);
      for (let j = 0; j < 6; j++) {
        ld[i][j] = {
          url: "",
          platform: undefined,
        };
      }
    }
    try {
      //FF
      browser.storage.local.set({ ...message, linkData: ld });
    } catch {
      //Chrome
      chrome.storage.local.set({ ...message, linkData: ld });
    }
  }
});
