const JSON_URL_STORAGE_KEY = "jsonUrl";
const BLOCKED_URLS_STORAGE_KEY = "blockedUrls";
const DEFAULT_BLOCKED_URLS = [
  "https://www.etstur.com",
  "https://www.espressolab.com",
  "https://www.dr.com.tr",
  "https://www.idefix.com",
  "https://www.cnnturk.com",
  "https://www.trt.net.tr",
  "https://www.hurriyet.com.tr",
  "https://www.sabah.com.tr",
  "https://www.milliyet.com.tr",
  "https://www.fanatik.com.tr",
  "https://www.takvim.com.tr",
  "https://www.posta.com.tr",
  "https://www.haberturk.com",
  "https://www.yenisafak.com",
  //ahber
  "https://www.ahaber.com.tr",
  "https://www.haberler.com",
  //atv ve grubu siteler
  "https://www.atv.com.tr",
  "https://www.atvavrupa.tv",
  "https://www.aspor.com.tr",
  "https://www.tgrthaber.com.tr",
  "https://www.kanald.com.tr",
  "https://www.tabii.com",
];

async function getJsonUrl() {
  console.log("getJsonUrl");
  const result = await chrome.storage.local.get([JSON_URL_STORAGE_KEY]);
  return result[JSON_URL_STORAGE_KEY];
}

async function fetchBlockedUrls() {
  const jsonUrl = await getJsonUrl();
  if (jsonUrl) {
    try {
      const response = await fetch(jsonUrl);
      if (!response.ok) {
        console.error("JSON URL alınırken hata oluştu:", response.status);
        return await getDefaultBlockedUrls();
      }
      const data = await response.json();
      return data.blockedUrls || (await getDefaultBlockedUrls());
    } catch (error) {
      console.error("JSON URL alınırken bir hata oluştu:", error);
      return await getDefaultBlockedUrls();
    }
  } else {
    return await getDefaultBlockedUrls();
  }
}

async function getDefaultBlockedUrls() {
  const result = await chrome.storage.local.get([BLOCKED_URLS_STORAGE_KEY]);
  let storedDefaultUrls = result[BLOCKED_URLS_STORAGE_KEY];
  if (!storedDefaultUrls || storedDefaultUrls.length === 0) {
    await chrome.storage.local.set({
      [BLOCKED_URLS_STORAGE_KEY]: DEFAULT_BLOCKED_URLS,
    });
    return DEFAULT_BLOCKED_URLS;
  }
  return storedDefaultUrls;
}

async function updateBlockedUrls() {
  const freshBlockedUrls = await fetchBlockedUrls();
  cachedBlockedUrls = freshBlockedUrls;
}

chrome.runtime.onStartup.addListener(async () => {
  await updateBlockedUrls();
});

chrome.alarms.create("refreshBlockedUrls", {
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "refreshBlockedUrls") {
    await updateBlockedUrls();
  }
});

let cachedBlockedUrls = [...DEFAULT_BLOCKED_URLS];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log("tab url : ", tab.url);
  if (changeInfo.status === "complete" && tab.url) {
    console.log("tab url : ", new URL(tab.url).origin);
    if (cachedBlockedUrls.includes(new URL(tab.url).origin)) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"],
      });
    }
  }
});
