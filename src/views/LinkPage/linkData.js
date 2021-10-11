/* global browser, chrome*/
//TODO Add links
const getLink = (name) => {
  switch (name) {
    case "AUGSD":
      return "https://academic.bits-pilani.ac.in/Student_Login.aspx";
    case "Nalanda":
      return "https://nalanda-aws.bits-pilani.ac.in/my/";
    case "ERP":
      return "https://sis.erp.bits-pilani.ac.in/psc/sisprd/EMPLOYEE/SA/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL";
    case "Notice Board":
      return "https://onboard.bits-pilani.ac.in/ucp.php?mode=login&login=external&oauth_service=google";
    case "SWD":
      return "http://swd.bits-pilani.ac.in/Login.aspx";
    case "Library":
      return "http://library.bits-pilani.ac.in/login.php";
    case "PSD":
      return "http://psd.bits-pilani.ac.in/Login.aspx";
    case "IPC":
      return "https://www.bits-pilani.ac.in/pilani/ipc/Services";
    case "SU":
      return "https://su-bitspilani.org/index.html";
    case "Sports Union":
      return "https://bits-sports.org/landing.html";
    case "SAC":
      return "https://sacbitspilani.wordpress.com/";
    case "EC":
      return "https://bitselections.wordpress.com/";
    case "EPC":
      return "https://epcbits.com/";
    case "HPC":
      return "https://hindipressclub.wordpress.com/";
    case "The BITS Review":
      return "https://thebitsreview.org/";
    case "WiFi Login":
      return "https://fw.bits-pilani.ac.in:8090/httpclient.html";
    case "Time Table Generator":
      return "https://timetable.bits-dvm.org/pilani.html";
    case "StudyDeck":
      return "https://studydeck.bits-sutechteam.org/";
    case "BITS Map":
      return "https://map.epcbits.com/";
    case "Handouts":
      return "https://sacbitspilani.wordpress.com/resources/";
    case "Google Meet":
      return "https://meet.google.com/";
    case "Google Calendar":
      return "https://calendar.google.com/";
    case "Google Classroom":
      return "https://classroom.google.com/";
    case "Canvas":
      return "https://canvas.instructure.com/login/google";
  }
};

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

const createTab = async (name) => {
  try {
    //FF
    const tab = await browser.tabs.create({
      url: getLink(name),
      active: makeActive(name),
    });
    automate(tab.id, name);
  } catch {
    //Chrome
    chrome.tabs.create(
      {
        url: getLink(name),
        active: makeActive(name),
      },
      (tab) => {
        automate(tab.id, name);
      }
    );
  }
};

const handleLink = async (name) => {
  createTab(name);
};

const linkData = [
  {
    title: "Institute Links",
    links: [
      "AUGSD",
      "Nalanda",
      "ERP",
      "Notice Board",
      "SWD",
      "Library",
      "PSD",
      "IPC",
    ],
  },
  {
    title: "Unions, Clubs & Departments",
    links: ["SU", "Sports Union", "SAC", "EC", "EPC", "HPC", "The BITS Review"],
  },
  {
    title: "Utility",
    links: [
      "WiFi Login",
      "Time Table Generator",
      "StudyDeck",
      "BITS Map",
      "Handouts",
    ],
  },
  {
    title: "Classes & Evaluation",
    links: ["Google Meet", "Google Calendar", "Google Classroom", "Canvas"],
  },
];

export { handleLink, linkData };
