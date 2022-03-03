const items = document.getElementsByTagName("div");

setTimeout(function () {
  try {
    for (let i = 0; i < items.length; i++) {
      if (items[i].hasAttribute("aria-label")) {
        if (
          items[i].getAttribute("aria-label").includes("microphone") ||
          items[i].getAttribute("aria-label").includes("camera")
        ) {
          items[i].click();
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}, 2000);
