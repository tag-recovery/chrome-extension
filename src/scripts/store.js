import { grabElements, injectRecordEventListeners } from "./iconHelpers";
import { recordsHtml } from "./html";

const elements = grabElements();
const { username } = elements;

const store = { data: [], expDays: undefined };
const storeProxy = new Proxy(store, {
  get(obj, prop) {
    return obj[prop];
  },
  set(obj, prop, value) {
    obj[prop] = value;
    if (prop === "data") {
      localStorage.setItem(username, JSON.stringify(value));
      const recordsNode = document.getElementById("records-wrap");
      recordsNode.innerHTML = recordsHtml(value);
      injectRecordEventListeners({ ...elements, value: value });
    }
    return true;
  },
});

export default storeProxy;
