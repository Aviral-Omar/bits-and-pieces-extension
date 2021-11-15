/* global browser, chrome*/

const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const loginLink = document.getElementById("loginbutton").parentElement;

const login = (credentials) => {
  usernameField.value = credentials.username;
  passwordField.value = credentials.password;
  loginLink.click();
};

try {
  browser.runtime.onMessage.addListener((credentials) => {
    login(credentials);
  });
} catch {
  chrome.runtime.onMessage.addListener((credentials) => {
    login(credentials);
  });
}
