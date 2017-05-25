/**
 * This is the openload file api
 *
 * 1. getAccountInfo(id, key); vaild the user input api info
 * 2. upload(link_address, headers);  `headers` may include `cookies` `referer` and so on;
 * 3. listFloder(current_floder)
 * 4. uploadLocalFile();
 */

function exchange(url, callback) {
  console.log(url);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status == 200) {
      console.log(this.responseText);
      callback(JSON.parse(this.responseText));
    } else {
      console.error(this.responseText);
      notification.notify("Error:: " + this.status);
      notification.notify("Error:: " + this.responseText);
    }
  };
  xhr.send();
}

function isConfigLogin() {
  var uid = localStorage.login;
  var key = localStorage.token;

  if (!isValid(uid)) {
    window.location = "/options.html";
    return false;
  }
  if (!isValid(key)) {
    window.location = "/options.html";
    return false;
  }
  return true;
}

function getAccountInfo(callback) {
  var svr = "https://api.openload.co/1/account/info?login={login}&key={key}";
  if (!isConfigLogin()) {
    return false;
  }
  var url = svr.format({login: localStorage.login, key: localStorage.token});
  exchange(url, callback);
}

function addRemoteUpload(link, folderId, headers, callback) {
  var svr = "https://api.openload.co/1/remotedl/add?login={login}&key={key}&url={url}";

  if (!isConfigLogin()) {
    notification.notify("Set Login first");
    return;
  }

  var url = svr.format({login: localStorage.login, key: localStorage.token, url: link});
  if (isValid(folderId)) {
    url = url + "&folder={folder}".format({folder: folderId})
  }
  if (isValid(headers)) {
    url = url + "&headers={headers}".format({headers: headers})
  }
  console.log(url);
  exchange(url, callback);
}


function getFolder(dir, callback) {
  var svr = "https://api.openload.co/1/file/listfolder?login={login}&key={key}";
  if (!isConfigLogin()) {
    return false;
  }
  var url = svr.format({login: localStorage.login, key: localStorage.token});
  if (isValid(dir)) {
    url = url + "&folder={folder}".format({folder: dir});
  }
  exchange(url, callback);
}

function fileStatus(fileId) {
  var svr = "https://api.openload.co/1/file/info?file={file}&login={login}&key={key}";
  if (!isConfigLogin()) {
    return false;
  }
  if (!isValid(fileId)) {
    notification.notify("Error, fileId invalid!");
    return;
  }
  var url = svr.format({login: localStorage.login, key: localStorage.token, file: fileId});
  exchange(url, callback);
}
/**
 * 判断是否是直接支持远程下载的域名
 * @param link
 */
function isSupportHost(link) {
  var support = ["Allmyvideos.net",
    "Cloudtime.to",
    "Cloudyvideos.com",
    "Dailymotion.com",
    "Dropbox.com",
    "Facebook.com",
    "Filehoot.com",
    "Flashx.tv",
    "Google Drive",
    "Gfycat.com",
    "Imgur.com",
    "Letwatch.us",
    "Movshare.net",
    "Mp4upload.com",
    "Mrfile.me",
    "Neodrive.co",
    "Novamov.com",
    "Nowvideo.sx",
    "Ok.ru",
    "Played.to",
    "Realvid.net",
    "Shared.sx",
    "Sharerepo.com",
    "Sharesix.com",
    "Stream.moe",
    "Streamable.com",
    "Streamin.to",
    "Thevideo.me",
    "Thefile.me",
    "Turbodrive.net",
    "Uptostream.com/Uptobox.com",
    "Vid.ag",
    "Vid.gg",
    "Vidbull.com",
    "Videomega.tv",
    "Videoweed.es",
    "Videowood.tv",
    "Vidspot.net",
    "Vidto.me",
    "Vidup.me",
    "Vidzi.tv",
    "Vivo.sx",
    "Vk.com",
    "Vodlocker.me",
    "Vshare.eu",
    "Watchvideo.us",
    "Youtube.com",
    "Youwatch.org",
    "Zettahost.tv",
    "Zstream.to"];
  var result = false;
  support.forEach(function (host) {
    if ((host.toUpperCase()) == (parseDomain(link).split("/")[0].toUpperCase())) {
      result = true;
      return result;
    }
  });
  return result;
}