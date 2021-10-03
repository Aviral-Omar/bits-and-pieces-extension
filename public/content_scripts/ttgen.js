/*global browser, chrome*/
const addButton = document.createElement("button");
addButton.textContent = "Add to BITS Compendium";
addButton.setAttribute("id", "button1");
addButton.setAttribute("class", "pdfbutton");
addButton.onclick = () => {
  const tt = JSON.parse(localStorage.getItem("time_table"));
  try {
    browser.runtime.sendMessage({ tt: tt[0] });
  } catch {
    chrome.runtime.sendMessage({ tt: tt[0] });
  }
};

const pdfButton = document.getElementById("button0");
pdfButton.parentNode.insertBefore(addButton, pdfButton.nextSibling);
