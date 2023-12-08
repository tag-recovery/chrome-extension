import {
  injectBackgroundColor,
  injectLogo,
  injectOptionsValues,
  injectOptionsEventListeners,
  loadStorage,
} from "./popupHelpers";

export function registerPopup(expDaysValue) {
  injectBackgroundColor();
  injectLogo();
  injectOptionsValues({ expDaysValue });
  injectOptionsEventListeners();
}
