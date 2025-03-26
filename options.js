const JSON_URL_STORAGE_KEY = "jsonUrl";
const BLOCKED_URLS_STORAGE_KEY = "blockedUrls";
const newUrlInput = document.getElementById("newUrl");
const addUrlButton = document.getElementById("addUrl"); // Butonun ID'sini "submitUrl" yerine "addUrl" olarak değiştirdim
const blockedUrlList = document.getElementById("blockedUrlList");
const jsonUrlInput = document.getElementById("jsonUrlInput");
const saveJsonUrlButton = document.getElementById("saveJsonUrl");
const jsonUrlStatus = document.getElementById("jsonUrlStatus");

document.addEventListener("DOMContentLoaded", loadOptions);
addUrlButton.addEventListener("click", addBlockedUrlToLocal); // Fonksiyon adını değiştirdim
saveJsonUrlButton.addEventListener("click", saveJsonUrl);

async function loadOptions() {
  await loadBlockedUrls();
  const jsonUrl = await getJsonUrl();
  if (jsonUrl) {
    jsonUrlInput.value = jsonUrl;
  }
}

async function getJsonUrl() {
  const result = await chrome.storage.local.get([JSON_URL_STORAGE_KEY]);
  return result[JSON_URL_STORAGE_KEY];
}

async function saveJsonUrl() {
  const newJsonUrl = jsonUrlInput.value.trim();
  await chrome.storage.local.set({ [JSON_URL_STORAGE_KEY]: newJsonUrl });
  jsonUrlStatus.textContent = "JSON URL kaydedildi.";
  await loadBlockedUrls();
}

async function loadBlockedUrls() {
  const blockedUrls = await fetchBlockedUrls();
  renderBlockedUrls(blockedUrls);
}

async function fetchBlockedUrls() {
  const jsonUrl = await getJsonUrl();
  if (jsonUrl) {
    try {
      const response = await fetch(jsonUrl);
      if (!response.ok) {
        console.error("JSON URL alınırken hata oluştu:", response.status);
        jsonUrlStatus.textContent = "JSON URL alınırken hata oluştu.";
        return await getLocalBlockedUrls();
      }
      const data = await response.json();
      return data.blockedUrls || (await getLocalBlockedUrls());
    } catch (error) {
      console.error("JSON URL alınırken bir hata oluştu:", error);
      jsonUrlStatus.textContent = "JSON URL alınırken bir hata oluştu.";
      return await getLocalBlockedUrls();
    }
  } else {
    return await getLocalBlockedUrls();
  }
}

async function getLocalBlockedUrls() {
  const result = await chrome.storage.local.get([BLOCKED_URLS_STORAGE_KEY]);
  return result[BLOCKED_URLS_STORAGE_KEY] || [];
}

async function saveLocalBlockedUrls(urls) {
  await chrome.storage.local.set({ [BLOCKED_URLS_STORAGE_KEY]: urls });
}

async function addBlockedUrlToLocal() {
  const newUrl = newUrlInput.value.trim();
  if (newUrl) {
    const currentBlockedUrls = await getLocalBlockedUrls();
    if (!currentBlockedUrls.includes(newUrl)) {
      currentBlockedUrls.push(newUrl);
      await saveLocalBlockedUrls(currentBlockedUrls);
      await loadBlockedUrls(); // Listeyi yeniden yükle
      newUrlInput.value = "";
    } else {
      alert("Bu URL zaten listede bulunuyor.");
    }
  } else {
    alert("Lütfen bir URL girin.");
  }
}

function renderBlockedUrls(urls) {
  blockedUrlList.innerHTML = "";
  urls.forEach((url) => {
    const listItem = document.createElement("li");
    listItem.textContent = url;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
    deleteButton.addEventListener("click", () => deleteLocalBlockedUrl(url));
    listItem.appendChild(deleteButton);
    blockedUrlList.appendChild(listItem);
  });
}

async function deleteLocalBlockedUrl(urlToDelete) {
  let blockedUrls = await getLocalBlockedUrls();
  blockedUrls = blockedUrls.filter((url) => url !== urlToDelete);
  await saveLocalBlockedUrls(blockedUrls);
  await loadBlockedUrls();
}
