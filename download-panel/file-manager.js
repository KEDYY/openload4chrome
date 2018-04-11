window.addEventListener('load', function () {

  function listView(result) {
    var root = $('#folder_list');
    root.empty();
    result.result.folders.forEach(function (folder) {
        var li = document.createElement("li");
        li.setAttribute("class", "mc-list-item");
        var img = document.createElement("img");
        img.src = "/material-icons/folder.png";
        img.setAttribute("class", "mc-bg-darkgreen");
        li.appendChild(img);
        var h1 = document.createElement("h1");
        h1.setAttribute("class", "mc-title");
        h1.textContent = folder.name;
        li.appendChild(h1);
        li.addEventListener('click', function (e) {
          getFolder(folder.id, listView);
        });
        root.append(li);
      }
    );
    result.result.files.forEach(function (file) {
        var li = document.createElement("li");
        li.setAttribute("class", "mc-list-item");
        var img = document.createElement("img");
        img.src = "/material-icons/file.png";
        img.setAttribute("class", "mc-bg-darkgreen");
        li.appendChild(img);
        var h1 = document.createElement("h1");
        h1.setAttribute("class", "mc-title");
        h1.textContent = file.name;
        li.appendChild(h1);
        var p = document.createElement("p");
        p.setAttribute("class", "mc-text | mc-note");
        p.textContent = file.id;
        li.appendChild(p);
        li.addEventListener("click", function (e) {
          var p = {
            "name": "170413APNH-002.1080p.mp4",
            "cblock": null,
            "sha1": "ec4850827d03e2fbadcdc5a32600d1ecdbaf9c04",
            "folderid": "2522553",
            "upload_at": "1493054047",
            "status": "active",
            "size": "1146005887",
            "content_type": "video\/mp4",
            "download_count": "0",
            "cstatus": "ok",
            "link": "https:\/\/openload.co\/f\/4B6SG7-4qA8\/170413APNH-002.1080p.mp4",
            "linkextid": "4B6SG7-4qA8"
          };
          console.log(li);

          if(!li.lastElementChild.classList.contains("mc-footer")){
            li.setAttribute("class", "mc-card");
            $(li).siblings().removeClass("mc-card");
            var footer = document.createElement("div");
            footer.setAttribute("class", "mc-footer");
            var extern = document.createElement("a");
            extern.setAttribute("class", "mc-button mc-button-icon mc-clickable");
            extern.setAttribute("mc-action", "download");
            footer.appendChild(extern);
            extern = document.createElement("a");
            extern.setAttribute("class", "mc-button mc-button-icon mc-clickable");
            extern.setAttribute("mc-action", "external");
            extern.href=file.link;
            footer.appendChild(extern);
            extern = document.createElement("a");
            extern.setAttribute("class", "mc-button mc-button-icon mc-clickable");
            extern.setAttribute("mc-action", "refresh");
            footer.appendChild(extern);
            extern = document.createElement("a");
            extern.setAttribute("class", "mc-button mc-button-icon mc-clickable");
            extern.setAttribute("mc-action", "delete");
            footer.appendChild(extern);
            li.appendChild(footer);
          }

        });
        root.append(li);
      }
    );
    if (root.childElementCount == 0) {
      root.text("There is no files here");
    }
  }

  getFolder(null, listView);
});
