import browser from "webextension-polyfill";
import { loadSettings } from "./settings";

function injectBackgroundColor() {
  document.querySelector("body").id = "tag-recovery-body";
  const body = document.getElementById("tag-recovery-body");
  body.style.backgroundColor = "#af6ec3";
}

function getElements() {
  const expDaysNode = document.getElementById("expiration");
  const debounceWaitNode = document.getElementById("debounceWait");

  return { expDaysNode, debounceWaitNode };
}

function injectOptionsEventListeners() {
  const { expDaysNode, debounceWaitNode } = getElements();
  expDaysNode.addEventListener("change", (e) =>
    browser.storage.local.set({ expDays: Number(e.target.value) }),
  );
  debounceWaitNode.addEventListener("change", (e) =>
    browser.storage.local.set({ debounceWait: Number(e.target.value) }),
  );
}
async function injectOptionsValues({ expDays, debounceWait }) {
  const { expDaysNode, debounceWaitNode } = getElements();
  expDaysNode.value = expDays;
  debounceWaitNode.value = debounceWait;
}

function registerPopup(settings) {
  injectBackgroundColor();
  injectOptionsValues(settings);
  injectOptionsEventListeners();
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    loadSettings(browser)
      .then((settings) => registerPopup(settings))
      .catch((err) => console.log(err));
  }
};
