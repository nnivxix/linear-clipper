document.addEventListener("DOMContentLoaded", async function () {
	const button = document.getElementById("action-button");
	const container = document.getElementById("popup-container");

	const tabs = await browser.tabs.query({ active: true, currentWindow: true });
	const currentTab = tabs[0];
	const currentURL = currentTab.url;
	const urlParts = currentURL.split("/");

	// check if currentURL is liner.app
	if (currentURL.includes("linear.app")) {
		container.innerHTML = "<p>The Issue copied!</p>";
		const issueId = urlParts[5];

		const markdownText = `[${issueId}](${currentURL})`;

		//copy the issue ID to clipboard
		navigator.clipboard
			.writeText(markdownText)
			.then(() => {
				console.log("Issue ID copied to clipboard:", issueId);
			})
			.catch((err) => {
				console.error("Failed to copy issue ID:", err);
			});

		return;
	} else {
		container.innerHTML = "<p>This is extension only works on Linear.app</p>";
	}

	button.addEventListener("click", function () {
		if (issueId) {
			console.log("Button clicked with issue ID:", issueId);
		} else {
			console.log("No issue ID found.");
		}
	});
});
