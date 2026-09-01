/* keep newest first; add an entry here each release so whats-new.html stays current */
export const CHANGELOG = [
  {
    version: "1.3.0",
    changes: [
      "Fixed username detection to use the logged-in cookie user instead of the first profile link found on the page.",
      "Added a 'save tag after _ ms of inactivity' setting alongside the existing expiration-days setting.",
      "The 'no logged-in user found' message no longer appears on pages without a comment form, or for visitors who simply aren't logged in yet.",
      "Added Firefox support alongside Chrome.",
    ],
  },
];
