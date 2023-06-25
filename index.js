// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-c92a8-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

let notesArray = ""

const formEl = document.getElementById('endorsement-form')
const notesEl = document.getElementById('notes-container')

document.getElementById('submit-form').addEventListener('click', function(event){
    event.preventDefault()
    
    if(formEl.checkValidity()){
        const noteData = [formEl[0].value, formEl[1].value, formEl[2].value, 0] // arrange data
        const item = push(endorsementsInDB, JSON.stringify(noteData))
        pushToMyNotes(item.key) // pushing into a list of author's notes
        refreshEndorsementList()
        clearForm()
    }
    else{
        alert('Please fill out all required fields.')
    }
})

onValue(endorsementsInDB, function(snapshot){
    console.log("changed")
    if(snapshot.exists()){
        notesArray = Object.entries(snapshot.val()) 
        refreshEndorsementList()
    }
    else
        clearNotes()
})

function appendItemToEndorsementListEl(noteData, currentNoteID){
    const noteEl = document.createElement('div')
    noteEl.id = "endorsement-note"
    const isClicked = localStorage.getItem(currentNoteID) === "true" ? true : false
    const likeImage = isClicked ? "./assets/redheart.png" : "./assets/blackheart.png"
    const deleteImage = checkIfAuthor(currentNoteID) ? '<img src="./assets/delete.png"/>' : ""
    
    const noteDataHTML = `
            <div class="note-menu">
                <h6>To ${noteData[2]} </h6>
                ${deleteImage}
            </div>
            <p>${noteData[0]}</p>
            <div class="note-menu">
                <h6>From ${noteData[1]}</h6>
                <img src="${likeImage}"/>
                <p>${noteData[3]}</p>
            </div>
    `
    noteEl.innerHTML = noteDataHTML
    
    // updating likes
    noteEl.children[2].children[1].addEventListener('click', function(event){
        noteData[3] += isClicked ? -1 : 1   
        localStorage.setItem(currentNoteID, !isClicked) 
        updateInDB(currentNoteID, noteData)
    })
    
    // adding delete button to author's notes
    noteEl.children[0].children[1]?.addEventListener('click', () => deleteInDB(currentNoteID))
    
    notesEl.appendChild(noteEl)
}

function refreshEndorsementList(){
    clearNotes()
    for (const [currentNoteID, currentNoteData] of notesArray)
        appendItemToEndorsementListEl(JSON.parse(currentNoteData), currentNoteID)
}

function checkIfAuthor(noteID){
    const notesArr = JSON.parse(localStorage.getItem("myNotes")) || []

    for (const myNote of notesArr)
         if (myNote === noteID)
            return true
            
    return false
}

function updateInDB(currentNoteID, noteData){
    const exactLocationOfNoteInDB = ref(database, `endorsements/${currentNoteID}`)
    set(exactLocationOfNoteInDB, JSON.stringify(noteData))
}

function deleteInDB(currentNoteID){
    const exactLocationOfNoteInDB = ref(database, `endorsements/${currentNoteID}`)
    remove(exactLocationOfNoteInDB)
}

function pushToMyNotes(noteID){
    const notesArr = JSON.parse(localStorage.getItem("myNotes")) || []
    notesArr.push(noteID)
    localStorage.setItem("myNotes", JSON.stringify(notesArr))
}

function removeFromMyNotes(noteID){
    const notesArr = JSON.parse(localStorage.getItem("myNotes")) || []
    const newNotesArr = notesArr.filter(item => item !== value)
    localStorage.setItem("myNotes", JSON.stringify(newNotesArr))
}

function clearForm(){
    formEl[0].value = ""
    formEl[1].value = ""
    formEl[2].value = ""
}
function clearNotes(){ notesEl.innerHTML = "" }