// We can't initiate downloads from the devtools panel, so pass a message to this background script which initiates the download... Doh!

var platform, options;

chrome.runtime.getPlatformInfo(function(info) {
  platform = info;
});

chrome.storage.sync.get({
  reverse_list: false
}, function(items) {
  options = items;
});

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};


function getOption(v){
	if(typeof(v)=="undefined"){ 
		return "";
	} else if (v == null)
	{
		return "";
	}
	return v;
}
function upload(link, headers){
    var svr = "https://api.openload.co/1/remotedl/add?login={login}&key={key}&url={url}";

	if (!isLogin())
	{
		return false;
	}

	if (!isValid(link))
	{
		alert("url link empty!");
		return;
	}else if (!isLink(link.toLowerCase()))
	{
		alert("url link invalid!");
		return;
	}
	var url = svr.format({login: localStorage.login, key: localStorage.token, url: link});
	if (isValid(headers))
	{
		url = url + "&headers={headers}".format({headers: headers})
	}
	console.log(url);
	var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = function () {
      if (this.status == 200) {
        alert(this.responseText);
      }else {
        alert("faild" + this.status);
      }
    };
	xhr.send();
}
function createContextMenu(){
	//["normal",  "Save %s to Openload", "selection"
  chrome.contextMenus.create({
	  "type": "normal",
	  "title": "Save %s to Openload", 
	  "contexts": ["link", "image", "audio", "video"],
	  "onclick": function(info, tab){
	if (getOption(info.mediaType) == "")
	{
		upload(getOption(info.linkUrl), getOption(info.pageUrl));
	}else{
		var headers = "";
		headers += "User-Agent: {ua}".format({ua: navigator.userAgent});
		headers += "\r\n" + "Referer: {referer};".format({referer: info.pageUrl});
		upload(getOption(info.srcUrl), headers);
	}
	console.log(getOption(info.linkUrl));
	console.log(getOption(info.srcUrl));
	console.log(getOption(info.pageUrl));
	console.log(getOption(info.frameUrl));
	console.log(getOption(info.selectionText));
	console.log(getOption(info.editable));
	console.log(tab.url);

  }}, function(){
	
  });

}
createContextMenu();

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log('received message: ', message, sender);
    if (message.action == 'download') {
      chrome.downloads.download(message.opts);
    }
    else if (message.action == 'open-tab') {
      chrome.tabs.create(message.opts);
    }
    else if (message.action == 'open-downloads-folder') {
      chrome.downloads.showDefaultFolder();
    }
    else if (message.action == 'get-platform') {
      sendResponse({ platform: platform });
    }
    else if (message.action == 'get-lang') {
      sendResponse(chrome.i18n.getUILanguage());
    }
    else if (message.action == 'open-options') {
      chrome.runtime.openOptionsPage();
    }
    else if (message.action == 'get-options') {
      sendResponse(options);
    }
    else if (message.action == 'update-options') {
      options = message.options;
    }
  }
);
