/* global browser, chrome*/
//TODO Add links
const getScript = (name) => {
  switch (name) {
    case "AUGSD":
      return "augsd";
    case "Nalanda":
      return "nalanda";
    case "Time Table Generator":
      return "ttgen";
  }
};

const makeActive = (name) => {
  switch (name) {
    case "AUGSD":
      return false;
    case "Nalanda":
      return false;
    default:
      return true;
  }
};

const automate = async (tabId, name) => {
  try {
    //FF
    browser.webNavigation.onDOMContentLoaded.addListener(
      async () => {
        try {
          await browser.tabs.executeScript(tabId, {
            file: `/content_scripts/${getScript(name)}.js`,
          });
          //Sign in page becomes active for AUGSD
          if (name !== "AUGSD") {
            browser.tabs.update(tabId, { active: true });
          }
          window.close();
        } catch (error) {
          console.error(error);
        }
      },
      {
        url: [
          {
            urlMatches: "https://academic.bits-pilani.ac.in/Student_Login.aspx",
          },
          {
            urlMatches: "https://nalanda-aws.bits-pilani.ac.in/login/index.php",
          },
        ],
      }
    );
    browser.webNavigation.onCommitted.addListener(
      () => {
        browser.tabs.update(tabId, { active: true });
        window.close();
      },
      { url: [{ urlContains: "https://nalanda-aws.bits-pilani.ac.in/my" }] }
    );
  } catch {
    chrome.webNavigation.onDOMContentLoaded.addListener(
      async () => {
        try {
          await chrome.tabs.executeScript(tabId, {
            file: `/content_scripts/${getScript(name)}.js`,
          });
          chrome.tabs.update(tabId, { active: true });
          window.close();
        } catch (error) {
          console.error(error);
        }
      },
      {
        url: [
          {
            urlMatches: "https://academic.bits-pilani.ac.in/Student_Login.aspx",
          },
          {
            urlMatches: "https://nalanda-aws.bits-pilani.ac.in/login/index.php",
          },
        ],
      }
    );
    chrome.webNavigation.onCommitted.addListener(
      () => {
        chrome.tabs.update(tabId, { active: true });
        window.close();
      },
      { url: [{ urlContains: "https://nalanda-aws.bits-pilani.ac.in/my" }] }
    );
  }
};

const createTab = async (link) => {
  try {
    //FF
    const tab = await browser.tabs.create({
      url: link.url,
      active: makeActive(link.name),
    });
    automate(tab.id, link.name);
  } catch {
    //Chrome
    chrome.tabs.create(
      {
        url: link.url,
        active: makeActive(link.name),
      },
      (tab) => {
        automate(tab.id, link.name);
      }
    );
  }
};

const handleLink = async (link) => {
  createTab(link);
};

export { handleLink };
