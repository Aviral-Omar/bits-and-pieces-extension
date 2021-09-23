/*global content*/
let OAUTHURL = "https://accounts.google.com/o/oauth2/auth?";
let VALIDURL = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=";
let SCOPE =
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
let CLIENTID =
  "668519179587-ld67oi74a4aiq45opesahghllr239tss.apps.googleusercontent.com";
let REDIRECT = "https://academic.bits-pilani.ac.in";
let TYPE = "token";
let _url =
  OAUTHURL +
  "scope=" +
  SCOPE +
  "&client_id=" +
  CLIENTID +
  "&redirect_uri=" +
  REDIRECT +
  "&response_type=" +
  TYPE;
let acToken;

const addSession = async (user) => {
  await (
    await content.fetch(
      "https://academic.bits-pilani.ac.in/dashboard.aspx/addSession",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      }
    )
  ).text();
  document.getElementById("linkPage").click();
};

const getUserInfo = async () => {
  const user = await (
    await content.fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${acToken}`
    )
  ).json();

  //Check BITS Pilani
  let domain_matcher = /@(.*)$/.exec(user.email);
  let domain_name = domain_matcher[1].substring(
    0,
    domain_matcher[1].indexOf(".", 0)
  );
  if (domain_name == "gmail") {
    window.location = "mailerror.aspx";
  }
  //End Check BITS Pilani

  document.getElementById("HiddenField1").value = user.name;
  document.getElementById("HiddenField2").value = user.email;

  await addSession(user);
};

const validateToken = async (token) => {
  await (await content.fetch(VALIDURL + token)).json();
  await getUserInfo();
};

const gup = (url, name) => {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  let regexS = "[\\#&]" + name + "=([^&#]*)";
  let regex = new RegExp(regexS);
  let results = regex.exec(url);
  if (results == null) return "";
  else return results[1];
};

const login = () => {
  let tab = window.open(_url);
  let pollTimer = window.setInterval(function () {
    try {
      if (tab.document.URL.indexOf(REDIRECT) != -1) {
        window.clearInterval(pollTimer);
        let url = tab.document.URL;
        acToken = gup(url, "access_token");
        tab.close();
        validateToken(acToken);
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);
};

login();
