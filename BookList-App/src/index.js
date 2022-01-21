import "./styles.css";
import availableBooks from "./books.json";

let mainTable = document.getElementById("main-table");
let showButton = document.getElementById("show-hide-button");
let bookshelf = document.getElementById("my-bookshelf");

//Function that renders books on the browser
const renderBooks = (arrayOfBooks) => {
  for (let i = 0; i < arrayOfBooks.length; i++) {
    //Generating table of available books
    let book = mainTable.insertRow();
    let bookCell = book.insertCell();
    bookCell.id = `${arrayOfBooks[i].title} by ${arrayOfBooks[i].author}`;
    bookCell.className = "available-books";
    let bookCellData = document.createTextNode(`${bookCell.id}`);
    bookCell.appendChild(bookCellData);

    //Dynamically create add button and map to each row
    let addButton = document.createElement("button");
    addButton.innerText = "Add";
    addButton.className = "add-button";
    addButton.id = bookCell.id;
    bookCell.appendChild(addButton);

    //Add Button functionality
    addButton.onclick = function () {
      bookCell.removeChild(addButton);
    };
  }
};

//Function that gives add button "Adding" functionality
const addAndDeleteBooks = (arrayOfBooks) => {
  for (let j = 0; j < arrayOfBooks.length; j++) {
    let id = `${arrayOfBooks[j].title} by ${arrayOfBooks[j].author}`;
    let addBookButton = document.getElementById(id);
    addBookButton.onclick = function () {
      //Generating table of books
      let bookshelfRow = bookshelf.insertRow();
      let bookshelfCell = bookshelfRow.insertCell();
      let bookData = document.createTextNode(id);
      bookshelfCell.appendChild(bookData);

      //Dynamically create delete button and map to each row
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.id = `DELETE ${id}`;
      bookshelfCell.appendChild(deleteButton);

      //Delete button functionality
      deleteButton.onclick = function () {
        bookshelfCell.removeChild(bookData);
        bookshelfCell.removeChild(deleteButton);
      };
    };
  }
};

//Function that adds books based on "Enter Key"
let input = document.getElementById("input-book");
input.addEventListener("change", () => {
  let userInput = document.getElementById("input-book").value;
  let bookshelf = document.getElementById("my-bookshelf");
  let bookshelfRow = bookshelf.insertRow();
  let bookshelfCell = bookshelfRow.insertCell();
  let bookData = document.createTextNode(userInput);
  let deleteButton = document.createElement("button");
  deleteButton.id = `DELETE ${userInput}`;
  deleteButton.innerText = "Delete";
  bookshelfCell.appendChild(bookData);
  bookshelfCell.appendChild(deleteButton);
  deleteButton.onclick = function () {
    bookshelfCell.removeChild(bookData);
    bookshelfCell.removeChild(deleteButton);
  };
});

//Function that keeps track of visible state of available books
const bookRenderState = {
  visible: true
};

//Function that handles toggling between showing and hiding available books based on state
const toggle = (cond) => {
  let mainTable = document.getElementById("main-table");
  bookRenderState.visible = cond ?? !bookRenderState.visible;
  if (bookRenderState.visible) {
    mainTable.style.display = "";
    showButton.innerText = "Hide Available Books";
  } else {
    mainTable.style.display = "none";
    showButton.innerText = "Show Available Books";
  }
};

//Calling the above functions
toggle(false);
renderBooks(availableBooks);
addAndDeleteBooks(availableBooks);
window.toggle = toggle;
