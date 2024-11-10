function grabElements() {
  const username = document
    .querySelector("form span.ljuser")
    .getAttribute("lj:user");
  const textarea = document.querySelector("textarea#body");
  let dwrpTools = document.querySelectorAll("input.custom-button");
  let prevTextArea = textarea.value;
  return { username, textarea, prevTextArea, dwrpTools };
}

function recordsCss() {
  return `.visible {
    display: block;
  }
  .hide {
    display: none;
  }
  #records-wrap {
    position: relative;
  }
  .tag-text {
    font-family: monospace, "Courier New", Courier;
    width: 350px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .timestamp {
    width: 200px;
    text-align: right;
    margin-right: 10px;
  }
  #tag-recovery-container {
    margin-right: 5px;
  }
  #tag-recovery:hover,
  #tag-recovery:focus {
    cursor: pointer;
  }
  #no-texts {
    background-color: rgba(0, 9, 40, 0.04);
    margin: 10px auto;
  }
  #tag-storage-container {
    margin: 0 auto;
    padding: 0.2em;
    width: 550px;
    height: 250px;
    position: absolute;
    z-index: 3;
    top: -270px;
    border-radius: 8px;
    background-color: white;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 1px solid rgba(0, 0, 0, 0.085);
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
  #tag-storage-container table {
    width: 100%;
    table-layout: fixed;
  }
  #tag-storage-container table tr {
    border-bottom: 1px rgba(0, 9, 40, 0.085);
    border-top: 1px rgba(0, 9, 40.085);
  }
  #tag-storage-container table tr:nth-child(even) {
    background-color: rgba(0, 9, 40, 0.04);
  }
  #tag-storage-container table tr:hover,
  #tag-storage-container table tr:nth-child(even):hover {
    background-color: rgba(0, 9, 40, 0.07);
  }
  #tag-storage-container table tr td {
    padding: 0.45em;
  }`;
}

/*
FILTERS THRU RECORDS
BASED ON AMT OF DAYS PASSED IN
*/
function checkExpByDays(data, amt) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - amt);
  const filteredData = data.filter(
    (record) => new Date(record.timestamp) > targetDate
  );
  return filteredData;
}

function findElementId() {
  return (
    document.getElementById("previewplaceholder") ||
    document.getElementsByName("submitpreview")[0]
  );
}

/* 
RETIREVES STORAGE OBJECT 
BY CURRENT USER
IF NO STORAGE,
CREATES EMPTY STARTER
*/
function loadStorage(username, expDaysValue) {
  const result = JSON.parse(localStorage.getItem(username));
  if (result) {
    const filteredResult = checkExpByDays(result, expDaysValue);
    return filteredResult;
  } else {
    localStorage.setItem(username, JSON.stringify([]));
    return [];
  }
}

/*
SAVES CURRENT STORE VALUE
TO STORAGE
*/
function setStorage(username, value) {
  localStorage.setItem(username, JSON.stringify(value));
}

function injectIcon(data) {
  const style = document.createElement("style");
  style.innerHTML = recordsCss();
  document.getElementsByTagName("head")[0].appendChild(style);

  const iconNode = document.createElement("div");
  iconNode.id = "tag-recovery-container";
  iconNode.innerHTML = iconHtml();

  const recordsNode = document.createElement("div");
  recordsNode.id = "records-wrap";
  recordsNode.className = "hide";
  recordsNode.innerHTML = recordsHtml(data);

  /*
  WHEN ICON IS CLICKED
  RECORD CONTAINER IS OPENED/CLOSED
  */
  iconNode.addEventListener("click", () => {
    recordsNode.className === "hide"
      ? (recordsNode.className = "visible")
      : (recordsNode.className = "hide");
  });

  const anchor = findElementId();
  anchor.after(iconNode, recordsNode);
}

function injectRecordEventListeners({
  username,
  textarea,
  prevTextArea,
  value,
}) {
  const recordsNode = document.getElementById("records-wrap");
  const recordsEl = document.querySelectorAll("#records-table tr");
  if (recordsEl.length < 2 && recordsEl[0].children[0].id === "no-texts") {
    return;
  }
  recordsEl.forEach((record) => {
    const sameRecord = value.filter((r) => r.id === record.id);
    record.addEventListener("click", (e) => {
      selectTag(username, textarea, prevTextArea, sameRecord[0]);
      recordsNode.className =
        recordsNode.className === "hide"
          ? (recordsNode.className = "visible")
          : (recordsNode.className = "hide");
    });
    record.addEventListener("mouseover", (e) =>
      viewTag(textarea, sameRecord[0].tag)
    );
    record.addEventListener("mouseout", (e) => reset());
  });
}

/*
ADDS NEW TAG TO RECORDS STORE
*/
function createTag(data) {
  try {
    const newTag = {
      id: (Math.random() + 1).toString(36).substring(2),
      tag: data,
      timestamp: new Date().getTime(),
    };
    return newTag;
  } catch (err) {
    return err;
  }
}

/*
UPDATES TEXTAREA WITH THE CURRENTLY VIEWED
OR "FOCUSED" ON TAG
*/
function viewTag(textarea, data) {
  textarea.value = data;
}

/*
TAKES THE SELECTED TAG 
AND MOVES IT TO THE FRONT AS THE LATEST TAG
*/
function selectTag(username, textarea, prevTextArea, record) {
  prevTextArea = record.tag;
  textarea.value = prevTextArea;
  storeProxy.data = shiftTags(record, storeProxy.data);
}

/*
MOVES THE SLECTED TAG
TO THE TOP OF THE ARRAY
AND UPDATES ITS TIMESTAMP
*/
function shiftTags(record, data) {
  record.timestamp = new Date().getTime();
  const filteredArray = data.filter((d) => d.id !== record.id);
  filteredArray.push(record);
  return filteredArray;
}
/*
RESETS THE TEXTAREA
TO ITS PREVIOUS VALUE
*/
function reset() {
  textarea.value = prevTextArea;
}

/* 
WAITS FOR KEYUP EVENT TIMEOUT
IF KEYUP RESUMES, TIMEOUT IS RESET
*/
function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      callback.apply(this, args);
    }, wait);
  };
}

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
      const elements = grabElements();
      injectRecordEventListeners({ ...elements, value: value });
    }
    return true;
  },
});

/*
FORMATS RECORD'S TIMESTAMP
FROM LOCAL STORAGE
*/
function formatDate(date) {
  const hh = date.getHours() % 12 || 12;
  const min =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const mer = date.getHours() >= 12 ? "pm" : "am";
  const localDate = `${hh}:${min}${mer} - ${mm}/${dd}`;
  return localDate;
}

function recordsHtml(records) {
  let content = `
    <div id="tag-storage-container">
      <table id="records-table" role="grid">
        <tbody>
  `;
  if (records.length < 1) {
    content += `<tr>
      <td id="no-texts">No saved tags yet.</td>
    </tr>`;
  } else {
    for (const record of records.toReversed()) {
      content += `<tr id=${record.id} class="record-row">
        <td class="tag-text">${record.tag}</td>
        <td class="timestamp">${formatDate(new Date(record.timestamp))}</td>
      </tr>`;
    }
  }
  content += `</tbody>
    </table>
  </div>`;
  return content;
}

function iconHtml() {
  return `
  <svg
    id="tag-recovery"
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    enable-background="new 0 0 100 100"
    xml:space="preserve"
    >
    <g>
      <path
        fill="#AF6EC3"
        d="M93.935,55.962L81.878,40.918L67.132,52.737c-1.804,1.446-2.094,4.081-0.649,5.885   c1.446,1.803,4.081,2.094,5.885,0.648l3.164-2.536c-0.822,2.779-2.112,5.421-3.853,7.841c-4.07,5.659-10.099,9.393-16.978,10.516   c-6.88,1.123-13.783-0.499-19.442-4.57c-3.657-2.631-6.58-6.168-8.453-10.23c-0.968-2.1-3.455-3.016-5.554-2.05   c-2.1,0.968-3.017,3.455-2.049,5.554c2.477,5.373,6.338,10.049,11.167,13.523c5.928,4.264,12.891,6.495,20.053,6.495   c1.867-0.001,3.748-0.152,5.627-0.458c9.086-1.484,17.051-6.416,22.426-13.89c2.72-3.781,4.607-7.971,5.62-12.39l3.306,4.124   c0.827,1.032,2.042,1.568,3.269,1.568c0.918,0,1.843-0.301,2.615-0.92C95.091,60.401,95.381,57.767,93.935,55.962z"
      /><path
        fill="#AF6EC3"
        d="M33.371,39.558c-1.446-1.804-4.081-2.096-5.885-0.648l-3.164,2.536c0.822-2.78,2.112-5.421,3.853-7.841   c4.07-5.658,10.1-9.393,16.979-10.516c6.877-1.123,13.783,0.5,19.441,4.57c3.657,2.631,6.58,6.169,8.453,10.231   c0.968,2.1,3.455,3.017,5.554,2.049c2.1-0.968,3.017-3.455,2.049-5.554c-2.477-5.373-6.338-10.049-11.167-13.522   c-15.43-11.098-37.009-7.575-48.106,7.853c-2.72,3.781-4.607,7.971-5.62,12.39l-3.306-4.125c-1.446-1.804-4.081-2.096-5.885-0.648   c-1.804,1.446-2.095,4.081-0.648,5.885l12.057,15.044l14.746-11.818C34.527,43.997,34.818,41.362,33.371,39.558z"
      />
    </g>
  </svg>
`;
}

function registerIcon(expDaysValue, elements) {
  const { username, textarea, prevTextArea, dwrpTools } = elements;
  storeProxy.expDays = expDaysValue;
  injectIcon(storeProxy.data);
  injectRecordEventListeners({
    username,
    textarea,
    prevTextArea,
    dwrpTools,
    value: [],
  });
  storeProxy.data = loadStorage(username, storeProxy.expDays);

  /*
  WAITS A SET AMT OF INACTIVE TIME,
  THEN SAVES TEXTAREA VALUE
  IN LOCAL STORAGE
  */
  textarea.addEventListener(
    "keyup",
    debounce((e) => {
      try {
        const prevTextArea = e.target.value;
        const result = createTag(e.target.value);
        if (result.id) {
          storeProxy.data = [...storeProxy.data, result];
        } else {
          throw new Error(
            "Error occured. Tag was unsuccessfully created. Report bug to Tag Recovery developer."
          );
        }
      } catch (err) {
        console.error(err.message);
      }
    }, 3500)
  );
  if (dwrpTools) {
    /*
    DETECTS USE OF DWRP TOOL BUTTONS
    AND SAVES LATEST TEXTAREA INJECTION
    TO LOCAL STORAGE
    */
    dwrpTools.forEach((btn) => {
      btn.addEventListener("click", () => {
        const result = createTag(textarea.value);
        if (result.id) {
          storeProxy.data = [...storeProxy.data, result];
        }
      });
    });
  }
}

if (document.readyState !== "loading") {
  chrome.storage.local.get(["expDays"]).then((result) => {
    const elements = grabElements();
    if (result.expDays) {
      registerIcon(result.expDays, elements);
    } else {
      chrome.storage.local.set({ expDays: 3 }).then((res) => registerIcon(3));
    }
  });
}
