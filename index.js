let myNotes = [];
const inputEl = document.getElementById("note-input");
const inputBtn = document.getElementById("save-note-btn");
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

function delfunc(){
    localStorage.clear();
    myNotes = [];
    ulEl.innerHTML = "";
}

function renderNotes() {
    let listItems = "";
    for (let i = 0; i < myNotes.length; i++) {
        let isitlink = validateLink(myNotes[i]);
        if (isitlink) {
            listItems += `
            <li>
                <a target='_blank' href='https://${myNotes[i]}'>
                    ${myNotes[i]}
                </a>
            </li>
            `;
        } else {
            listItems += `
            <li>
                ${myNotes[i]}
            </li>
            `;
        }
    }
    ulEl.innerHTML = listItems;
}

function validateLink(inputValue) {
    const httpRegex = /^(http:\/\/|https:\/\/)/i;
    const tldRegex = /\.[a-z]{2,}$/i;
    return (httpRegex.test(inputValue) && tldRegex.test(inputValue)) || tldRegex.test(inputValue);
}

deleteBtn.addEventListener("click", delfunc);
inputEl.addEventListener('keypress', function (event) {
    if (event.key === 'Delete') {
        delfunc();
    }
});
