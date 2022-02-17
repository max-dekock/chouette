function getSelectedWord() {
    let selection = window.getSelection();
    let text = selection.anchorNode.wholeText;
    let offset = selection.anchorOffset;
    for (let match of text.matchAll(/\S+/g)) {
        if (match.index <= offset && match.index + match[0].length >= offset) {
            return match[0];
        }
    }
    return "";
}



document.body.addEventListener("click", (event) => {
    let word = getSelectedWord();
    if (window.confirm(`Add word "${word}" to list?`)) {
        browser.runtime.sendMessage({method: "addWordToList", args: word})
            .then(() => browser.runtime.sendMessage({method: "getWordList"}))
            .then((value) => console.log(value));
    }
})

