function createFileCard() {

}

window.addEventListener('load', function () {
  var root = document.getElementById("folder_list");

  function listView(result) {
    result.result.folders.forEach(function (f) {
        var li = document.createElement("li");
        li.setAttribute("class", "mc-list-item");
        var img = document.createElement("img");
        img.src = "/material-icons/folder.png";
        img.setAttribute("class", "mc-bg-darkgreen");
        li.appendChild(img);
        var h1 = document.createElement("h1");
        h1.setAttribute("class", "mc-title");
        h1.textContent = f.name;
        li.appendChild(h1);
        var p = document.createElement("p");
        p.setAttribute("class", "mc-text | mc-note");
        p.textContent = f.id;
        li.appendChild(p);
        li.addEventListener('click', function (e) {
          fileStatus(f.id, function (result) {
            
          })
        });
        root.appendChild(li);
      }
    );
    result.result.files.forEach(function (f) {
        var li = document.createElement("li");
        li.setAttribute("class", "mc-list-item");
        var img = document.createElement("img");
        img.src = "/material-icons/file.png";
        img.setAttribute("class", "mc-bg-darkgreen");
        li.appendChild(img);
        var h1 = document.createElement("h1");
        h1.setAttribute("class", "mc-title");
        h1.textContent = f.name;
        li.appendChild(h1);
        var p = document.createElement("p");
        p.setAttribute("class", "mc-text | mc-note");
        p.textContent = f.id;
        li.appendChild(p);
        root.appendChild(li);
      }
    );
  }

  getFolder(null, listView);
});
