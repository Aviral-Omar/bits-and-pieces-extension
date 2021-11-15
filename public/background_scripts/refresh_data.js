/* global browser, chrome */

const refreshData = async () => {
  const contactData = await (
    await fetch("https://aviral-omar.github.io/data/contact-data.json")
  ).json();
  const links = await (
    await fetch("https://aviral-omar.github.io/data/link-data.json")
  ).json();

  try {
    browser.storage.sync.set({ contactData, links });
  } catch (e) {
    chrome.storage.sync.set({ contactData, links });
  }
};

const setUpdateAlarm = () => {
  try {
    browser.alarms.create("update", { periodInMinutes: 20 });
    browser.alarms.onAlarm.addListener(refreshData);
  } catch {
    chrome.alarms.create("update", { periodInMinutes: 20 });
    chrome.alarms.onAlarm.addListener(refreshData);
  }
};

refreshData();
setUpdateAlarm();
