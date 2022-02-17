async function initializeStorage() {
    let wordList = await browser.storage.local.get("wordList");
    if (!wordList.length) {
        await browser.storage.local.set({wordList: []});
    }
}

async function getWordList() {
    let result = await browser.storage.local.get("wordList");
    return result.wordList;
}

async function addWordToList(word) {
    let wordList = await getWordList();
    if (!wordList.includes(word)) {
        wordList.push(word);
        await browser.storage.local.set({wordList});
    }
}

async function removeWordFromList(word) {
    let wordList = await getWordList();
    let index = wordList.findIndex(word);
    if (index != -1) {
        wordList.splice(index, 1);
        await browser.storage.local.set({wordList});
    }
}

async function isWordInList(word) {
    let wordList = await getWordList();
    return wordList.includes(word);
}

const METHODS = {
    getWordList,
    addWordToList,
    removeWordFromList,
    isWordInList
}

function handleMessage(data, sender, sendResponse) {
    if (data.method in METHODS) {
        return METHODS[data.method](data.args);
    }
}

initializeStorage();
browser.runtime.onMessage.addListener(handleMessage);