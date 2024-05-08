/*
* File: app.js
* Author: Berta Péter
* Copyright: 2024, Berta Péter
* Group: Szoft 1-2-N
* Date: 2024-05-08
* Github: https://github.com/bp-ter/
* Licenc: GNU GPL
*/

const doc = {
    compsBody: document.querySelector("#compsBody"),
    saveButton: document.querySelector('#saveButton'),
    complainantInput: document.querySelector('#complainant'),
    descriptionInput: document.querySelector('#description'),
    productsInput: document.querySelector('#products'),
    typeInput: document.querySelector('#type'),
}

const current = {
    host:  'http://localhost:8000',
    endpoint: 'complaints',
    id: 0,
    complainant: '',
    description: '',
    products: 0,
    type: ''
}

doc.saveButton.addEventListener('click', () => {
    setCompCurrent()
    addComp()
    clearBoxes()
    console.log('Sikeres...')
   
})

getComps()

function setCompCurrent(){
    current.complainant = doc.complainantInput.value
    current.description = doc.descriptionInput.value
    current.products = doc.productsInput.value
    current.type = doc.typeInput.value
}

function addComp() {
    let url = current.host + '/' + current.endpoint
    fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
    },
    body: JSON.stringify({
        complainant : current.complainant,
        description : current.description,
        products : current.products,
        type : current.type
    })
   }) 
}

function getComps() {
    let url = current.host + '/' + current.endpoint
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        doc.compsBody.textContent = ''
        renderComps(result)
    })
}

function renderComps(compList) {    
    compList.forEach(comp => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${comp.id}</td>
            <td>${comp.complainant}</td>
            <td>${comp.description}</td>
            <td>${comp.products}</td>
            <td>${comp.type}</td>
        `
        doc.compsBody.appendChild(tr)
    });
}

function clearBoxes(){
    doc.complainantInput.value = ''
    doc.descriptionInput.value = ''
    doc.productsInput.value = ''
    doc.typeInput.value = ''
}
