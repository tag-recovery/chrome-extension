import { registerPopup } from "./popupContent";

if (document.readyState !== "loading") {
  chrome.storage.local.get(["expDays"]).then((result) => {
    if (result.expDays) {
      registerPopup(result.expDays);
    } else {
      chrome.storage.local.set({ expDays: 3 }).then((res) => registerPopup(3));
    }
  });
}
