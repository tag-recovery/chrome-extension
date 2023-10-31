/* 
CREATES THE SVG ICON ELEMENT
*/
export const createSVG = () => {
  const div = document.createElement("div");
  div.innerHTML = `
<svg id="tag-recovery" xmlns="http://www.w3.org/2000/svg" width="32" height="32" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="#AF6EC3" d="M93.935,55.962L81.878,40.918L67.132,52.737c-1.804,1.446-2.094,4.081-0.649,5.885   c1.446,1.803,4.081,2.094,5.885,0.648l3.164-2.536c-0.822,2.779-2.112,5.421-3.853,7.841c-4.07,5.659-10.099,9.393-16.978,10.516   c-6.88,1.123-13.783-0.499-19.442-4.57c-3.657-2.631-6.58-6.168-8.453-10.23c-0.968-2.1-3.455-3.016-5.554-2.05   c-2.1,0.968-3.017,3.455-2.049,5.554c2.477,5.373,6.338,10.049,11.167,13.523c5.928,4.264,12.891,6.495,20.053,6.495   c1.867-0.001,3.748-0.152,5.627-0.458c9.086-1.484,17.051-6.416,22.426-13.89c2.72-3.781,4.607-7.971,5.62-12.39l3.306,4.124   c0.827,1.032,2.042,1.568,3.269,1.568c0.918,0,1.843-0.301,2.615-0.92C95.091,60.401,95.381,57.767,93.935,55.962z"></path><path fill="#AF6EC3" d="M33.371,39.558c-1.446-1.804-4.081-2.096-5.885-0.648l-3.164,2.536c0.822-2.78,2.112-5.421,3.853-7.841   c4.07-5.658,10.1-9.393,16.979-10.516c6.877-1.123,13.783,0.5,19.441,4.57c3.657,2.631,6.58,6.169,8.453,10.231   c0.968,2.1,3.455,3.017,5.554,2.049c2.1-0.968,3.017-3.455,2.049-5.554c-2.477-5.373-6.338-10.049-11.167-13.522   c-15.43-11.098-37.009-7.575-48.106,7.853c-2.72,3.781-4.607,7.971-5.62,12.39l-3.306-4.125c-1.446-1.804-4.081-2.096-5.885-0.648   c-1.804,1.446-2.095,4.081-0.648,5.885l12.057,15.044l14.746-11.818C34.527,43.997,34.818,41.362,33.371,39.558z"></path></g></svg>
`;
  div.style.display = "flex";
  div.style.justifyContent = "flex-end";
  div.style.position = "relative";
  div.style.top = "-2.5em";
  div.style.left = "-1em";

  return div;
};
/* 
INJECTS THE SVG ICON ELEMENT INTO THE TEXTAREA PARENT ELEMENT
*/
export const injectIcon = (taParent) => {
  const div = createSVG();
  taParent.appendChild(div);
  return document.getElementById("tag-recovery");
};

/* 
WAITS FOR KEYUP EVENT TIMEOUT
IF KEYUP RESUMES, TIMEOUT IS RESET
*/
export const debounce = (callback, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      callback.apply(this, args);
    }, wait);
  };
};

/* 
RETIREVES STORAGE OBJECT 
BY CURRENT USER'S COMMUNITY SUBDOMAIN
*/
export const getStorageByComm = (comm) => {
  chrome.storage.sync
    .get([comm])
    .then((result) => {
      return result[comm];
    })
    .catch((err) => {
      return undefined;
    });
};
/* 
FILTERS CURRENT USER'S COMMUNITY SUBDOMAIN
BY USERNAME
*/
export const filterByUsername = (storage, username) => {
  return storage.filter((tag) => tag.username === username);
};

/* 
SAVES NEW TEXTAREA DATA 
BY CURRENT USER'S COMMUNITY SUBDOMAIN
*/
export const setStorageByComm = (comm, username, data) => {
  const currentStorage = getStorageByComm(comm);
  const newTag = { [username]: data, timestamp: Date.now() };
  if (currentStorage) {
    const tempStorage = [...currentStorage];
    tempStorage.push(newTag);
    chrome.storage.sync.set({ [comm]: tempStorage });
  } else {
    chrome.storage.sync.set({ [comm]: [newTag] });
  }
};
