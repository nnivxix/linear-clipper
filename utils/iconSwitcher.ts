export const iconSwitcher = () => {
  const GRAYSCALE_ICON_PATH = {
    16: "icon/grayscale/16.png",
    32: "icon/grayscale/32.png",
    48: "icon/grayscale/48.png",
    96: "icon/grayscale/96.png",
    128: "icon/grayscale/128.png",
  };

  const COLOR_ICON_PATH = {
    16: "icon/16.png",
    32: "icon/32.png",
    48: "icon/48.png",
    96: "icon/96.png",
    128: "icon/128.png",
  };

  const TARGET_HOST = "linear.app";

  function updateIcon(tabId: number, url: string) {
    console.log("Updating icon for URL:", url);
    const isTargetSite = url.includes(TARGET_HOST);
    const iconPath = isTargetSite ? COLOR_ICON_PATH : GRAYSCALE_ICON_PATH;
    browser.action.setIcon({ tabId, path: iconPath });
  }

  browser.tabs.onActivated.addListener(async (activeInfo) => {
    console.log("Tab activated:", activeInfo);
    const tab = await browser.tabs.get(activeInfo.tabId);
    updateIcon(tab.id!, tab.url || "");
  });

  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log("Tab updated:", tabId, changeInfo, tab);
    if (changeInfo.status === "complete" && tab.url) {
      updateIcon(tabId, tab.url);
    }
  });
};
