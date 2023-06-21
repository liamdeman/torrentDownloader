chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "add-movie",
    title: "Add Movie",
    contexts: ["link"],
  });
  chrome.contextMenus.create({
    id: "add-serie",
    title: "Add Serie",
    contexts: ["link"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === "add-movie" && info.linkUrl) {
    sendHttpRequest(info.linkUrl, "Movies");
  }
  if (info.menuItemId === "add-serie" && info.linkUrl) {
    sendHttpRequest(info.linkUrl, "Series");
  }
});

function sendHttpRequest(url, category) {
  let config = JSON.parse(localStorage.getItem('config'));
  if(!config){

    chrome.runtime.openOptionsPage();
    return;
  }
  var data = new FormData();
  data.append("urls", url);
  data.append("autoTMM", "true");
  data.append("category", category);
  data.append("paused", "false");
  data.append("root_folder", "true");
  data.append("username", config.userName);
  data.append("password", config.password);

  fetch(`${config.url}/api/v2/torrents/add`, {
    method: "POST",
    headers: {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-US,en;q=0.9,nl-BE;q=0.8,nl;q=0.7,fr;q=0.6,sd;q=0.5",
      "Cache-Control": "max-age=0"
      // WARNING: Cookies will be stripped away by the browser before sending the request.
    },
    credentials: "include",
    body: data
  })
    .then(response => {
      if(response.status === 200){
        alert(category + ' started dowloading');
        return;
      }
      alert('Something went wrong');
    })
    .catch(error => {
      alert('Something went wrong');
    });
}
