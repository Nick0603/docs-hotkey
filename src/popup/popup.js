const logCommands = () => {
  chrome.storage.sync.get(['commands'], result => {
    console.log(result)
  })
}

window.onload = () => {
  document.getElementById('view-commands-button').addEventListener('click', () => window.location.href = 'viewcommands/viewcommands.html', false)
  document.getElementById('add-command-button').addEventListener('click', () => window.location.href = 'addcommand/addcommand.html', false)
}

