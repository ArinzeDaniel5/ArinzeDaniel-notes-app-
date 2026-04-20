const addNoteBtn=document.getElementById("addNoteBtn");
const notesContainer=document.getElementById("notesContainer");
const searchInput=document.getElementById("searchInput");
let notes=JSON.parse(localStorage.getItem("notes"))||[];
addNoteBtn.addEventListener("click",addNote);
searchInput.addEventListener("input",renderNotes);
function addNote(){
    const title=prompt("Enter note title");
    const content=prompt("Enter note content");
    if(!title||! content) return alert("Enter title and content");
    const note={
        id:Date.now(),
        title,
        content,
        date:new Date().toLocaleString()
    };
    notes.push(note);
    savedNotes();
    renderNotes()
}
function savedNotes(){
    localStorage.setItem("notes",JSON.stringify(notes));
}
function renderNotes(){
    const query=searchInput.value.toLowerCase();
    notesContainer.innerHTML="";
    const filteredNotes=notes.filter(note=>
        (note.title||"").toLowerCase().includes(query)||
        (note.content||"").toLowerCase().includes(query)
        );
        filteredNotes.forEach(note=>{
            const noteEl=document.createElement("div");
            noteEl.classList.add("note");
            noteEl.innerHTML=`
            <div class="note-title">${note.title}</div>
            <div class="note-content">${note.content}</div>
            <div class="note-date">${note.date}</div>
            <button onclick="deleteNote(${note.id})">Delete</button>
            `
            ;
            notesContainer.appendChild(noteEl);
        });
}
renderNotes();
function deleteNote(id){
    const confirmDelete = confirm("Delete this note?");
    if(!confirmDelete) return;

    notes = notes.filter(note => note.id !== id);
    savedNotes();
    renderNotes();
}