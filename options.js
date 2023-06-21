// Saves options to chrome.storage
const saveOptions = () => {
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const url = document.getElementById('url').value;

    fetch(`${url}/api/v2/auth/login`, {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9,nl-BE;q=0.8,nl;q=0.7,fr;q=0.6,sd;q=0.5",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        "body": `username=${userName}&password=${password}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
      })
      .then(response => {
        if(response.status === 200){
            localStorage.setItem('config', JSON.stringify({userName, password, url}));
            window.close();
        }
      })
      .catch(err => alert('cannot connect to server'));
  };
  
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    let config = JSON.parse(localStorage.getItem('config'));
    if(!config){
        return;
    }
    document.getElementById('userName').value = config.userName;
    document.getElementById('password').value = config.password;
    document.getElementById('url').value = config.url;
  };
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);