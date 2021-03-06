console.log('App.js');
showNotes();
//If user add a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(e){
    let addTxt = document.getElementById('addTxt');
    // console.log(addTxt.value);
    let addTitle = document.getElementById('noteTitle');

    //Fetching title from localStorage and adding the new title in the end and putting it back in storage
    let title = localStorage.getItem("title");
    if(title == null){
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }
    titleObj.push(addTitle.value);
    localStorage.setItem("title", JSON.stringify(titleObj));
    addTitle.value = "";

    //Fetching the notes from localStorage and adding the new note in the end and putting it back in storage
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
});


//Function to show notes from localStorage
function showNotes(){
    let title = localStorage.getItem("title");
    if(title == null){
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }


    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }


    let html = "";
    notesObj.forEach(function(element, index){
        html += `
        <div class="noteCard mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${titleObj[index]}</h5>
                  <p class="card-text">${element}</p>
                  <button id = "${index}" onclick="deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
                </div>
              </div>
        `
    });

    let notesElem = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = `Nothing to show here. Use "Add a note" section to add a note`;
    }
};

//function to delete a note
function deleteNote(index){
    // console.log('I am deleting', index);
    let title = localStorage.getItem("title");
    if(title == null){
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }
    titleObj.splice(index, 1);
    localStorage.setItem('title', JSON.stringify(titleObj));

    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);//deletin in local variable
    localStorage.setItem('notes', JSON.stringify(notesObj));// updating the local storage
    showNotes();
};


//Searching

let search = document.getElementById('searchTxt');

search.addEventListener("input", function(){
    let inputVal  = search.value;
    // console.log('input event fired');

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;


        //Check if it include the searched word and change the css of the notes
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
});


/*
Further features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
*/