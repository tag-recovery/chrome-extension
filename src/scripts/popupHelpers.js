import whiteLogo from "./../assets/img/main-logo-white-transparent.svg";

export function injectBackgroundColor() {
  document.querySelector("body").id = "tag-recovery-body";
  const body = document.getElementById("tag-recovery-body");
  body.style.backgroundColor = "#af6ec3";
}

export function injectLogo() {
  const logo = document.querySelector("#logo-container img");
  logo.src = whiteLogo;
}

export function getElements() {
  const expDaysNode = document.getElementById("expiration");

  return { expDaysNode };
}

export function injectOptionsEventListeners() {
  const { expDaysNode } = getElements();
  expDaysNode.addEventListener("change", (e) =>
    chrome.storage.local.set({ expDays: e.target.value })
  );
}
export async function injectOptionsValues({ expDaysValue }) {
  const { expDaysNode } = getElements();
  console.log(expDaysValue);
  expDaysNode.value = expDaysValue;
}
