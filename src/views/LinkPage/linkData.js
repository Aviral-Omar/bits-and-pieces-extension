/* global browser, chrome*/
const getScript = (name) => {
  switch (name) {
    case "AUGSD":
      return "augsd";
    case "Nalanda":
      return "nalanda";
    case "Time Table Generator":
      return "ttgen";
    case "Wifi Login":
      return "login_wifi";
  }
};

const makeActive = (name) => {
  switch (name) {
    case "AUGSD":
      return false;
    case "Nalanda":
      return false;
    case "Wifi Login":
      return false;
    default:
      return true;
  }
};

const automate = async (tabId, name, credentials) => {
  try {
    //FF
    browser.webNavigation.onCompleted.addListener(
      async () => {
        try {
          await browser.tabs.executeScript(tabId, {
            file: `/content_scripts/${getScript(name)}.js`,
          });

          browser.webRequest.onCompleted.addListener(
            () => {
              browser.tabs.remove(tabId);
            },
            {
              urls: ["https://fw.bits-pilani.ac.in:8090/login.xml"],
              tabId,
            }
          );

          browser.tabs.sendMessage(tabId, credentials);
        } catch (error) {
          console.error(error);
        }
      },
      {
        url: [
          {
            urlMatches: "https://fw.bits-pilani.ac.in:8090/httpclient.html",
          },
        ],
      }
    );

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
    chrome.webNavigation.onCompleted.addListener(
      async () => {
        try {
          chrome.tabs.executeScript(
            tabId,
            {
              file: `/content_scripts/${getScript(name)}.js`,
            },
            () => {
              chrome.webRequest.onCompleted.addListener(
                () => {
                  chrome.tabs.remove(tabId);
                },
                {
                  urls: ["https://fw.bits-pilani.ac.in:8090/login.xml"],
                  tabId,
                }
              );

              chrome.tabs.sendMessage(tabId, credentials);
            }
          );
        } catch (error) {
          console.error(error);
        }
      },
      {
        url: [
          {
            urlMatches: "https://fw.bits-pilani.ac.in:8090/httpclient.html",
          },
        ],
      }
    );
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

const createTab = async (link, credentials) => {
  try {
    //FF
    const tab = await browser.tabs.create({
      url: link.url,
      active: makeActive(link.name),
    });
    await automate(tab.id, link.name, credentials);
  } catch {
    //Chrome
    await chrome.tabs.create(
      {
        url: link.url,
        active: makeActive(link.name),
      },
      (tab) => {
        automate(tab.id, link.name, credentials);
      }
    );
  }
};

const handleLink = async (link, credentials) => {
  createTab(link, credentials);
};

export default handleLink;
