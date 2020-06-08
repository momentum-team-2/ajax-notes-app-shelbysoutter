/*globals fetch, moment */
const apiUrl = 'http://localhost:3000/notes'
let noteIsValid

let form = document.querySelector('#notes-form')
let noteInput = document.querySelector('#notes-input')
let noteList = document.querySelector('.notes')


noteIsValid = true
renderNotes()

// 1. Set up an event listener for when the note is submitted
form.addEventListener('submit', function (event) {
    event.preventDefault()
    createNoteItem(noteInput.value)
})

// Function to invalidate note when numbers are entered instead of ''
function markNoteInvalid () {
    noteIsValid = false
}

// 2. Fetch request to POST form data to the server (npm installation)
function createNoteItem (inputText) {
// Validate the input before submitting request
    let parentNote = noteInput.parentElement
    if (noteInput.value, isNaN(noteInput.value)) {
        parentNote.classList.remove('input-invalid')
        parentNote.classList.add('input-valid')
        fetch (apiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ item: inputText, created: moment().format() })
        })
        .then(() => {
            noteInput.value = ''
            renderNotes()
        })
    } else {
        parentNote.classList.remove('input-valid')
        parentNote.classList.add('input-invalid')
        markNoteInvalid ()
    }
}

// 3. Render the notes list using data that has been posted to the server.
function renderNotes() {
    noteList.innerHTML = ''
    fetch (apiUrl, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(function (data) {
        let list = document.createElement('ul')
        list.id = 'note-list'
        for (let item of data) {
            let noteItem = document.createElement('li')
            noteItem.dataset.id = item.id
            noteItem.innerText = item.item

            let deleteIcon = document.createElement('span')
            deleteIcon.id = 'delete'
            deleteIcon.classList.add('fas', 'fa-otter')
            noteItem.appendChild(deleteIcon)
            list.appendChild(noteItem)
        }
        noteList.appendChild(list)
    })
}

// 4. Delete a note item when the icon is clicked
noteList.addEventListener('click', deleteNoteItem)

function deleteNoteItem (event) {
    let targetEl = event.target
    if (targetEl.matches ('#delete')) {
        let itemId = targetEl.parentElement.dataset.id
        let itemToDelete = document.querySelector(`li[data-id='${itemId}']`)
        fetch(`${apiUrl}/${itemId}`, {
            method: 'DELETE'
        })
        .then(function () {
            document.querySelector('#note-list').removeChild(itemToDelete)
        })
    }
}

// 5. Add a way to edit/update the note once it is created. 
// Add event listener for clicking the note to be able to edit it?
// Fetch GET data and return it to the input-field?
// Maybe add another icon to click on for editing?

noteList.addEventListener('click', editNoteItem)

function editNoteItem (event) {
    //if you click on words, fetch GET apiURL
    let targetNote = event.target
    if (targetNote.matches ('#note-list')) {
        let inputField = targetEl.parentElement.dataset.id
        let noteToEdit = document.querySelector(`li[data-id='${inputField}']`)
        fetch (`${apiUrl}/${inputField}`, {
            method: 'GET'
         })
        .then(response => response.json())
        .then(function () {
            document.querySelector('.input-field').add(noteToEdit)
        
        })  
    }

}
