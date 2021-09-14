/*global browser*/
const addButton = document.createElement("button");
const text = document.createTextNode("Add to BITS and Pieces");
addButton.appendChild(text);
addButton.setAttribute("id", "button1");
addButton.setAttribute("class", "pdfbutton");
addButton.onclick = () => {
  const tt = JSON.parse(localStorage.getItem("time_table"));
  browser.runtime.sendMessage({ tt: tt[0] });
};

const pdfButton = document.getElementById("button0");
pdfButton.parentNode.insertBefore(addButton, pdfButton.nextSibling);
