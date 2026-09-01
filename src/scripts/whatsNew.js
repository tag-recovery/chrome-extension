import { injectBackgroundColor } from "./pageChrome";
import { CHANGELOG } from "./changelog";

injectBackgroundColor();

const list = document.getElementById("changelog-list");
CHANGELOG.forEach(({ version, changes }) => {
  const entry = document.createElement("div");
  entry.className = "changelog-entry";

  const heading = document.createElement("h3");
  heading.textContent = `v${version}`;
  entry.appendChild(heading);

  const ul = document.createElement("ul");
  changes.forEach((change) => {
    const li = document.createElement("li");
    li.textContent = change;
    ul.appendChild(li);
  });
  entry.appendChild(ul);

  list.appendChild(entry);
});
