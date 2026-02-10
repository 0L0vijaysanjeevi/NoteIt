let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
let isitlink=false
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    try {
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads();
    } catch (error) {
        console.error(error);
    }
});


function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        isitlink=validateLink(myLeads[i])
        if (isitlink === true){
            listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
        }
        else{
            listItems += `
            <li>
                ${myLeads[i]}
            </li>
        `
        }
    }
    ulEl.innerHTML = listItems  
}
function validateLink(inputValue) {
    const httpRegex = /^(http:\/\/|https:\/\/)/i; 
    const tldRegex = /\.[a-z]{2,}$/i; 
    return (httpRegex.test(inputValue) && tldRegex.test(inputValue)) || tldRegex.test(inputValue);
}

