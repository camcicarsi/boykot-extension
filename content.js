const warningImageUrl = chrome.runtime.getURL("images/warning.svg");
console.log("warningImageUrl", warningImageUrl);
// Uyarı div'ini oluştur
const warningDiv = document.createElement("div");
warningDiv.id = "extension-warning";
warningDiv.style.backgroundColor = "#fde047";
warningDiv.style.color = "#212121";
warningDiv.style.padding = "10px";
warningDiv.style.textAlign = "center";
warningDiv.style.position = "fixed";
warningDiv.style.top = "0";
warningDiv.style.left = "0";
warningDiv.style.width = "100%";
warningDiv.style.zIndex = "9999";
warningDiv.style.display = "flex";
warningDiv.style.justifyContent = "center";
warningDiv.style.alignItems = "center";
warningDiv.style.gap = "10px";

// Uyarı görselini oluştur
const warningImage = document.createElement("img");
warningImage.src = warningImageUrl;
warningImage.style.maxWidth = "100px";
warningImage.style.height = "auto";

// Uyarı metnini oluştur (isteğe bağlı)
const warningText = document.createElement("span");
warningText.textContent =
  "Dikkat! Bu site, uyarı verilen URL listesinde bulunmaktadır.";

// Div'e görseli ve metni ekle
warningDiv.appendChild(warningImage);
// warningDiv.appendChild(warningText);

// Body'nin en başına ekle
document.body.insertBefore(warningDiv, document.body.firstChild);
