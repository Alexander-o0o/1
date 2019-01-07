/* eslint-disable require-jsdoc */
(function() {
  window.backend = {
    loadSettings: function(onLoad, onError) {
      loadToURL('http://localhost/my-sites/load_data.php', onLoad, onError)
    },
    load: function(onLoad, onError) {
      loadToURL('load_similar_wizards.json', onLoad, onError)
    },
    save: function(data, onLoad, onError) {
      const xhr = new XMLHttpRequest()
      const dataURL = 'http://localhost/my-sites/save_json_data.php'
      xhr.responseType = 'text'
      xhr.addEventListener('load', onLoad)
      xhr.addEventListener('error', onError)
      xhr.open('POST', dataURL)
      xhr.send(JSON.stringify(data))
    },
  }
  function loadToURL(dataURL, onLoad, onError) {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'text'
    xhr.addEventListener('load', onLoad)
    xhr.addEventListener('error', onError)
    xhr.open('GET', dataURL)
    xhr.send()
  }
}())
