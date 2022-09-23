/* global browser, chrome*/

const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const loginButton = document.getElementById("loginbtn");

const login = (credentials) => {
  usernameField.value = credentials.username;
  passwordField.value = credentials.password;
  loginButton.click();
};

try {
  browser.runtime.onMessage.addListener((credentials) => {
    login(credentials);
  });
} catch (e) {
  chrome.runtime.onMessage.addListener((credentials) => {
    login(credentials);
  });
}
