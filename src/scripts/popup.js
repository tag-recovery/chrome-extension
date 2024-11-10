function injectBackgroundColor() {
  document.querySelector("body").id = "tag-recovery-body";
  const body = document.getElementById("tag-recovery-body");
  body.style.backgroundColor = "#af6ec3";
}

function getElements() {
  const expDaysNode = document.getElementById("expiration");

  return { expDaysNode };
}

function injectOptionsEventListeners() {
  const { expDaysNode } = getElements();
  expDaysNode.addEventListener("change", (e) =>
    chrome.storage.local.set({ expDays: e.target.value })
  );
}
async function injectOptionsValues({ expDaysValue }) {
  const { expDaysNode } = getElements();
  console.log(expDaysValue);
  expDaysNode.value = expDaysValue;
}

function registerPopup(expDaysValue) {
  injectBackgroundColor();
  injectOptionsValues({ expDaysValue });
  injectOptionsEventListeners();
}

if (document.readyState !== "loading") {
  chrome.storage.local.get(["expDays"]).then((result) => {
    if (result.expDays) {
      registerPopup(result.expDays);
    } else {
      chrome.storage.local.set({ expDays: 3 }).then((res) => {
        console.log(res);
        registerPopup(3);
      });
    }
  });
}
