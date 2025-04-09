document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("action-button");
  button.addEventListener("click", function () {
    // Handle button click
    // alert("Button clicked!");
    // console.log(document);

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const currentTab = tabs[0];
      const currentURL = currentTab.url;
      console.log("currentURL =>", currentURL);

      const urlParts = currentURL.split("/");
      const issueId = urlParts[5];

      if (issueId) {
        console.log("Issue ID:", issueId);
      } else {
        console.log("No issue ID found.");
      }
    });
  });
});
