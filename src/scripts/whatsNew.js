import { CHANGELOG } from "./changelog";
import "../styles/whats-new.css";

const list = document.getElementById("changelog-list");
CHANGELOG.forEach(({ version, changes }) => {
  const entry = document.createElement("div");
  entry.className = "border-l-2 border-lilac pl-5";

  const heading = document.createElement("h2");
  heading.className = "font-display text-lg font-semibold";
  heading.textContent = `v${version}`;
  entry.appendChild(heading);

  const ul = document.createElement("ul");
  ul.className = "mt-3 space-y-2 text-sm leading-relaxed text-ink/70";
  changes.forEach((change) => {
    const li = document.createElement("li");
    li.className = "flex gap-2.5 before:text-coral before:content-['•']";
    li.textContent = change;
    ul.appendChild(li);
  });
  entry.appendChild(ul);

  list.appendChild(entry);
});
