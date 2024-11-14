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
  expDaysNode.value = expDaysValue;
}

function registerPopup(expDaysValue) {
  injectBackgroundColor();
  injectOptionsValues({ expDaysValue });
  injectOptionsEventListeners();
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    chrome.storage.local
      .get(["expDays"])
      .then((result) => {
        if (result.expDays) {
          registerPopup(result.expDays);
        } else {
          chrome.storage.local
            .set({ expDays: 3 })
            .then((res) => {
              registerPopup(3);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
};
