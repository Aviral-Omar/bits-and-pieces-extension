/* global browser*/
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
    case "WiFi Login":
      return "https://fw.bits-pilani.ac.in:8090/httpclient.html";
    case "Time Table Generator":
      return "https://timetable.bits-dvm.org/pilani.html";
    case "BITS Map":
      return "https://map.epcbits.com/";
    case "Handouts":
      return "https://sacbitspilani.wordpress.com/resources/";
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
    default:
      return true;
  }
};

const createTab = async (name) => {
  const tab = await browser.tabs.create({
    url: getLink(name),
    active: makeActive(name),
  });
  return tab.id;
};

const automate = async (tabId, name) => {
  browser.webNavigation.onDOMContentLoaded.addListener(
    async () => {
      try {
        await browser.tabs.executeScript({
          file: "/content_scripts/browser-polyfill.js",
        });
        await browser.tabs.executeScript(tabId, {
          file: `/content_scripts/${getScript(name)}.js`,
        });
      } catch (error) {
        console.error(error);
      }
    },
    {
      url: [
        { urlMatches: "https://academic.bits-pilani.ac.in/Student_Login.aspx" },
        { urlMatches: "https://nalanda-aws.bits-pilani.ac.in/login/index.php" },
      ],
    }
  );
};

const handleLink = async (name) => {
  const tabId = await createTab(name);
  automate(tabId, name);
};

const linkData = [
  {
    title: "Institute Links",
    links: ["AUGSD", "Nalanda", "ERP", "Notice Board", "SWD", "Library", "PSD"],
  },
  {
    title: "Unions, Clubs & Departments",
    links: ["SU", "Sports Union", "SAC", "EC", "EPC", "HPC"],
  },
  {
    title: "Utility",
    links: ["WiFi Login", "Time Table Generator", "BITS Map", "Handouts"],
  },
];

export { handleLink, linkData };
