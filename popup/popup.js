/**
 *
 * @returns {'firefox' | 'chrome' | 'unknown'}
 */
function getBrowserName() {
	if (
		typeof browser !== "undefined" &&
		typeof browser.runtime !== "undefined"
	) {
		return "firefox";
	} else if (
		typeof chrome !== "undefined" &&
		typeof chrome.runtime !== "undefined"
	) {
		return "chrome";
	} else {
		return "unknown";
	}
}

function getCurrentTab() {
	return new Promise((resolve, reject) => {
		chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
			if (chrome.runtime.lastError) {
				return reject(chrome.runtime.lastError);
			}
			if (!tabs || tabs.length === 0) {
				return reject(new Error("No active tab found"));
			}
			resolve(tabs[0]);
		});
	});
}

document.addEventListener("DOMContentLoaded", async function () {
	const container = document.getElementById("popup-container");
	const browserName = getBrowserName();

	if (browserName === "firefox") {
		const tabs = await browser.tabs.query({
			active: true,
			currentWindow: true,
		});
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
	}

	if (browserName === "chrome") {
		const tab = await getCurrentTab();

		const currentURL = tab.url;
		const urlParts = currentURL.split("/");

		// check if currentURL is liner.app
		if (currentURL.includes("linear.app")) {
			const issueId = urlParts[5];

			const markdownText = `[${issueId}](${currentURL})`;

			//copy the issue ID to clipboard
			setTimeout(() => {
				navigator.clipboard
					.writeText(markdownText)
					.then(() => {
						container.innerHTML = "<p>The Issue copied!</p>";
						console.log("Issue ID copied to clipboard:", issueId);
					})
					.catch((err) => {
						container.innerHTML = "<p>Opps, Something wrong!</p>";
						console.error("Failed to copy issue ID:", err);
					});
			}, 200);

			return;
		} else {
			container.innerHTML = "<p>This is extension only works on Linear.app</p>";
		}
	}
});
