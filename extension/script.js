document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabUrl = tabs[0]?.url || "";
    const iframe = document.getElementById("gist-iframe");
    iframe?.contentWindow?.postMessage({ url: tabUrl }, "*");
  });
});
