/*global content*/
let _url =
  "https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&client_id=668519179587-ld67oi74a4aiq45opesahghllr239tss.apps.googleusercontent.com&redirect_uri=https://academic.bits-pilani.ac.in&response_type=token";
let acToken;

const addSession = async (user) => {
  try {
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
  } catch {
    await (
      await fetch(
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
  }
  document.getElementById("linkPage").click();
};

const getUserInfo = async () => {
  let user;
  try {
    user = await (
      await content.fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${acToken}`
      )
    ).json();
  } catch {
    user = await (
      await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${acToken}`
      )
    ).json();
  }

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
  try {
    await (
      await content.fetch(
        "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token
      )
    ).json();
  } catch {
    await (
      await fetch(
        "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token
      )
    ).json();
  }
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
      if (
        tab.document.URL.indexOf("https://academic.bits-pilani.ac.in") != -1
      ) {
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
