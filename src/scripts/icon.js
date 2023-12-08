import { registerIcon } from "./iconContent";

if (document.readyState !== "loading") {
  chrome.storage.local.get(["expDays"]).then((result) => {
    if (result.expDays) {
      registerIcon(result.expDays);
    } else {
      chrome.storage.local.set({ expDays: 3 }).then((res) => registerIcon(3));
    }
  });
}
