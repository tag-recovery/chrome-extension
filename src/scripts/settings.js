export const DEFAULT_SETTINGS = {
  expDays: 3,
  debounceWait: 5000,
};

/* seeds any missing keys in storage so later reads/popup display stay consistent */
export function loadSettings(browser) {
  return browser.storage.local
    .get(Object.keys(DEFAULT_SETTINGS))
    .then((stored) => {
      const settings = { ...DEFAULT_SETTINGS, ...stored };
      const missingDefaults = {};
      for (const key of Object.keys(DEFAULT_SETTINGS)) {
        if (stored[key] === undefined) {
          missingDefaults[key] = DEFAULT_SETTINGS[key];
        }
      }
      if (Object.keys(missingDefaults).length === 0) {
        return settings;
      }
      return browser.storage.local.set(missingDefaults).then(() => settings);
    });
}
