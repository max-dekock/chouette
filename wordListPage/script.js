const downloadCsvButton = document.getElementById("download_csv_button");
const cloudSyncButton = document.getElementById("cloud_sync_button");
const wordsTable = document.getElementById("words_table");

function updateWordsTable(wordList) {
    // clear table
    wordsTable.innerHTML = "";

    // add rows
    for (word of wordList) {
        let new_row = wordsTable.insertRow();

        let word_cell = new_row.insertCell();
        word_cell.innerText = word;

        let remove_cell = new_row.insertCell();
        remove_cell.innerHTML = `<button type="button">X</button>`;
        remove_cell.addEventListener("click", (event) => {
            removeWord(word);
        })
    }
}

function removeWord(word) {
    alert(`Remove word button clicked for "${word}"`);
}

browser.storage.local.get("wordList").then((result) => updateWordsTable(result.wordList));

browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local" || !("wordList" in changes)) {
        return;
    }
    updateWordsTable(changes.wordList.newValue);
})

cloudSyncButton.addEventListener("click", (event) => {
    window.prompt("Please enter your username:");
    window.prompt("Please enter your password:");
    alert("Login successful, cloud sync enabled");
    cloudSyncButton.innerText = "Disable Cloud Sync";
})