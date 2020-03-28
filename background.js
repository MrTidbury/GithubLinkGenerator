function onMenuClick(info, tab) {
    //Called from clicking the context menu, 
    // sends a message to the frontend to paste the link..
    chrome.tabs.query({
        "active": true,
        "currentWindow": true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            "functiontoInvoke": "pasteGithubLink"
        });
    });
}

var context = 'editable';
var title = "Paste Github Link";
var id = chrome.contextMenus.create({
    "title": title,
    "contexts": [context],
    "onclick": onMenuClick
});