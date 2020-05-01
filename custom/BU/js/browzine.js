// add browzine helper to window object
window.browzine = {
  api: "https://public-api.thirdiron.com/public/v1/libraries/426",
  apiKey: "cdeb966a-69cf-4f36-bb37-3d017dd6ee00",

  journalCoverImagesEnabled: true,

  journalBrowZineWebLinkTextEnabled: true,
  journalBrowZineWebLinkText: "Browse current issues",

  articleBrowZineWebLinkTextEnabled: true,
  articleBrowZineWebLinkText: "View issue contents",

  articlePDFDownloadLinkEnabled: true,
  articlePDFDownloadLinkText: "Download PDF",

  printRecordsIntegrationEnabled: true,
};

browzine.script = document.createElement("script");
browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
document.head.appendChild(browzine.script);