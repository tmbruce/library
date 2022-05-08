import Book from "./js/book.js";
import defaultBooks from "./js/defaultBooks.js";

let books = [];
defaultBooks.map((defaultBook) => {
  let book = new Book(
    defaultBook.title,
    defaultBook.author,
    defaultBook.isbn,
    defaultBook.year,
    defaultBook.pages,
    defaultBook.read,
    defaultBook.imgSrc
  );
  books.push(book);
});

let searchBox = document.querySelector(".header__search__input");
searchBox.addEventListener("input", (e) => {
  let term = e.target.value.toLowerCase();
  let bookResults = [];
  if (term != "") {
    bookResults = books.filter(
      (book) =>
        book.isbn.includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.title.toLowerCase().includes(term)
    );
    render(bookResults);
  } else {
    render(books);
  }
});

//Open modal control for new book search
let searchButton = document.querySelector(".header__search__button");
searchButton.addEventListener("click", () => {
  console.log("search button");
  searchModal();
});

//Generic function to create html element
const createHtmlElement = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

//Open modal control for book details
const showModal = (book) => {
  document
    .getElementById(`container-${book.isbn}`)
    .addEventListener("click", () => {
      let modal = document.getElementById(`${book.isbn}`);
      modal.showModal();
    });
};

//Close modal control for book details
const closeModal = (book) => {
  document.getElementById(`btn-${book.isbn}`).addEventListener("click", () => {
    document.getElementById(book.isbn).close();
  });
};

//Removes book from rendering array
const removeBook = (book) => {
  document
    .getElementById(`delete-${book.isbn}`)
    .addEventListener("click", () => {
      books = books.filter((val) => val.isbn != book.isbn);
      render(books);
    });
};

//Creates modal element for book details
const modalElement = (book) => {
  const newModal = createHtmlElement(`
    <dialog id=${book.isbn}>
        <img src=${book.imgSrc}/>
        <button id=btn-${book.isbn}>Close</button>
        <button id=delete-${book.isbn}>Remove</button>
    </dialog>
    `);
  document.querySelector(".container").append(newModal);
  showModal(book);
  closeModal(book);
  removeBook(book);
};

//Creates modal for new book search
const searchModal = () => {
  const searchModal = createHtmlElement(`
        <dialog id="search__modal">
            <button id="search__modal__close">Close</button>
        </dialog>
    `);
  document.querySelector(".container").append(searchModal);
  document
    .querySelector("#search__modal__close")
    .addEventListener("click", () => {
      let modal = document.querySelector("#search__modal");
      modal.close();
      modal.remove();
    });
  document.querySelector("#search__modal").showModal();
};

//Creates image container for book display
const bookElement = (book) => {
  const newBook = createHtmlElement(`
        <div id="container-${book.isbn}" class="book">
            <img src="${book.imgSrc}"/>
        </div>
    `);
  document.querySelector(".container").append(newBook);
};

//Rendering method to display books
const render = (arr) => {
  let container = document.querySelector(".container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  arr.length == 0
    ? container.append(
        books.length > 0
          ? createHtmlElement(`<div>No search results</div>`)
          : createHtmlElement(`<div>Add some books to your library!</div>`)
      )
    : arr.forEach((book) => {
        bookElement(book);
        modalElement(book);
      });
};

//Initial rendering
render(books);
