let myLibrary = [
    {
        title: "A Game of Thrones",
        author: "George R. R. Martin",
        pages: 694,
        read: false
      }
];


class Book {
    constructor(
        title = "Unknown",
        author = "Unknown",
        pages = "0",
        isRead = false
    ){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead; 
    }
}

function displayModal(){
    overlay.classList.add("active");
    modal.classList.add("active");

}
function hideModal(){
    overlay.classList.remove("active");
    modal.classList.remove("active");
}
function addBookToLibrary(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    newBook = new Book(title, author, `${pages}pg`, read);
    myLibrary.push(newBook);
    hideModal();
}

const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const addBook = document.getElementById("addBook");
const submitBook = document.getElementById("submit");

addBook.addEventListener('click', () => displayModal());
overlay.addEventListener('click', () => hideModal());
submitBook.addEventListener('click', () => addBookToLibrary());

