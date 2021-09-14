/*global browser*/
browser.webNavigation.onCompleted.addListener(
  async () => {
    try {
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
    browser.storage.local.set(message);
  }
});
