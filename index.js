let myNotes = [];
const inputEl = document.getElementById("note-input");
const inputBtn = document.getElementById("save-notes-btn");
const tabBtn = document.getElementById("tab-notes-btn");
const deleteBtn = document.getElementById("delete-notes-btn");
const ulEl = document.getElementById("notes-list");

let notesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"));
if (notesFromLocalStorage) {
    myNotes = notesFromLocalStorage;
    renderNotes();
}

inputBtn.addEventListener("click", mainfunc);
inputEl.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        mainfunc();
    }
});

function mainfunc() {
    myNotes.push(inputEl.value);
    inputEl.value = "";
    try {
        localStorage.setItem("myNotes", JSON.stringify(myNotes));
        renderNotes();
    } catch (error) {
        console.error(error);
    }
}

function renderNotes() {
    let listItems = "";
    for (let i = 0; i < myNotes.length; i++) {
        const value = myNotes[i].trim();
        if (validateLink(value)) {
            let href = value;
            if (!/^[a-zA-Z]+:\/\//.test(href)) {
                href = 'https://' + href;
            }
            listItems += `
            <li>
                <a target='_blank' href='${href}'>${myNotes[i]}</a>
            </li>
            `;
        } else {
            listItems += `
            <li>${myNotes[i]}</li>
            `;
        }
    }
    ulEl.innerHTML = listItems;
}

function validateLink(inputValue) {
    try {
        new URL(inputValue.trim());
        return true;
    } catch (e) {
        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
        return domainRegex.test(inputValue.trim());
    }
}

function delfunc() {
    localStorage.clear();
    myNotes = [];
    ulEl.innerHTML = "";
}

deleteBtn.addEventListener("click", delfunc);

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length === 0) return;
        myNotes.push(tabs[0].url);
        localStorage.setItem("myNotes", JSON.stringify(myNotes));
        renderNotes();
    });
});   

document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href) {
        e.preventDefault();
        chrome.tabs.create({ url: link.href });
    }
});   
