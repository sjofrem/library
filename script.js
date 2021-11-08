let myLibrary = [];


class Book {
    constructor(
        title = "Unknown",
        author = "Unknown",
        pages = "0",
        read = false
    ){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read; 
    }
}

function displayModal(){
    overlay.classList.add("active");
    modal.classList.add("active");
    addBookForm.reset();

}
function hideModal(){
    overlay.classList.remove("active");
    modal.classList.remove("active");
}
function addBookToLibrary(){
    event.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    newBook = new Book(`"${title}"`, author, `${pages} Pages`, read);
    myLibrary.push(newBook);
    saveData();
    hideModal();
    renderLibrary();
}

function renderLibrary(){
    libraryContainer.innerHTML='';

    for (let i=0; i<myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}

function createBook(item){
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    bookDiv.classList.add('book');

    titleDiv.textContent = item.title;
    titleDiv.classList.add('bookTitle');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = item.author;
    authDiv.classList.add('bookAuthor');
    bookDiv.appendChild(authDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('bookPages');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn')    
    bookDiv.appendChild(readBtn);
    if(item.read===false) {
        readBtn.textContent = 'Not Read';
        readBtn.classList.add('incomplete');
    }else {
        readBtn.textContent = 'Read';
        readBtn.classList.add('complete');
    }
    deleteBtn.textContent = 'Delete'; 
    deleteBtn.classList.add('deleteBtn');
    bookDiv.appendChild(readBtn);
    bookDiv.appendChild(deleteBtn);
    
    libraryContainer.appendChild(bookDiv);

    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        saveData();
        renderLibrary();
    });

    readBtn.addEventListener('click', () => {
        item.read = !item.read;
        saveData();
        renderLibrary();
    })
}

function saveData(){
     localStorage.setItem('libraryData', JSON.stringify(myLibrary));
}

function loadData(){
    if(!localStorage.libraryData){
        renderLibrary();
    }
    else{
        let objectsData = localStorage.getItem('libraryData');
        objectsData = JSON.parse(objectsData);
        myLibrary =  objectsData;
        renderLibrary();
    }
}

const libraryContainer = document.getElementById("library");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const addBook = document.getElementById("addBook");
const submitBook = document.getElementById("submitBtn");
const addBookForm = document.getElementById("addBookForm");


addBook.addEventListener('click', () => displayModal());
overlay.addEventListener('click', () => hideModal());
submitBook.addEventListener('click', addBookToLibrary);


loadData();
