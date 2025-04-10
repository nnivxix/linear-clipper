/**
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

function getCurrentTab(browserName) {
	return new Promise((resolve, reject) => {
		if (browserName === "firefox") {
			browser.tabs
				.query({ active: true, currentWindow: true })
				.then((tabs) => {
					if (!tabs || tabs.length === 0) {
						return reject(new Error("No active tab found"));
					}
					resolve(tabs[0]);
				})
				.catch(reject);
		} else if (browserName === "chrome") {
			chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
				if (chrome.runtime.lastError) {
					return reject(chrome.runtime.lastError);
				}
				if (!tabs || tabs.length === 0) {
					return reject(new Error("No active tab found"));
				}
				resolve(tabs[0]);
			});
		} else {
			reject(new Error("Unknown browser"));
		}
	});
}

function handleLinearIssueCopy(container, url) {
	const urlParts = url.split("/");
	const issueId = urlParts[5];
	const markdownText = `[${issueId}](${url})`;

	// Slight delay to ensure popup has focus
	setTimeout(() => {
		navigator.clipboard
			.writeText(markdownText)
			.then(() => {
				container.innerHTML = "<p>The Issue copied!</p>";
				console.log("Issue ID copied to clipboard:", issueId);
			})
			.catch((err) => {
				container.innerHTML = "<p>Oops, something went wrong!</p>";
				console.error("Failed to copy issue ID:", err);
			});
	}, 200);
}

document.addEventListener("DOMContentLoaded", async function () {
	const container = document.getElementById("popup-container");
	const browserName = getBrowserName();

	try {
		const currentTab = await getCurrentTab(browserName);
		const currentURL = currentTab.url;

		if (currentURL.includes("linear.app")) {
			handleLinearIssueCopy(container, currentURL);
		} else {
			container.innerHTML = "<p>This extension only works on Linear.app</p>";
		}
	} catch (err) {
		console.error("Failed to get current tab or browser context:", err);
		container.innerHTML = "<p>Failed to get tab info.</p>";
	}
});
