import Book from "./js/book.js";
import defaultBooks from "./js/defaultBooks.js";
import getBook from "./js/api.js";

let searchResults = [];
let books = [];
defaultBooks.map((defaultBook) => {
  let book = new Book(
    defaultBook.title,
    defaultBook.subtitle,
    defaultBook.author,
    defaultBook.isbn,
    defaultBook.year,
    defaultBook.pages,
    defaultBook.read,
    defaultBook.imgSrc,
    defaultBook.snippet
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
        <button id=btn-${book.isbn}>✕</button>
        <div class="book__container">
          <img src=${book.imgSrc} loading='lazy' alt="${book.title}"/>
          <div class="book__info">
            <ul>
              <li class="book__title">${book.title}</li>
              <li class="subtitle">${book.subtitle}</li>
              <li class="book__author">by: ${book.author}</li>
              <li class="book__detail">Published: ${book.year}</li>
              <li class="book__detail">${book.pages} pages</li>
              <li>
                <label class="checkbox__container">Read
                <input id="read__checkbox__${book.isbn}" type="checkbox">
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div class="book__snippet">${book.snippet}</div>
        <button id=delete-${book.isbn}>Remove from library</button>
    </dialog>
    `);
  document.querySelector(".container").append(newModal);
  let checkbox = document.querySelector(`#read__checkbox__${book.isbn}`);
  book.read ? (checkbox.checked = true) : (checkbox.checked = false);
  checkbox.addEventListener("click", () => {
    let checkbox = document.querySelector(
      `#read__checkbox__${book.isbn}`
    ).checked;
    books.forEach((b) => {
      if (b.isbn == book.isbn) {
        book.read = checkbox;
        console.log(books);
      }
    });
  });
  showModal(book);
  closeModal(book);
  removeBook(book);
};

//Creates modal for new book search
const searchModal = () => {
  const searchModal = createHtmlElement(`
        <dialog id="search__modal">
          <form method="dialog">
            <input autocomplete='off' id="search__term" type="text" placeholder="Search by author, title, or isbn">
            <button id="modal__search">Search</button>
          </form>
            <button id="search__modal__close">✕</button>
            <div id="search__results"></div>
        </dialog>
    `);
  document.querySelector(".container").append(searchModal);
  let searchBox = document.querySelector("#search__term");
  document.querySelector("#modal__search").addEventListener("click", (e) => {
    e.preventDefault();
    search(searchBox.value);
    searchBox.value = "";
  });
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
            <img src="${book.imgSrc}" loading="lazy" alt="${book.title}"/>
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

let localBooks = localStorage.getItem("books");
localBooks ? render(localBooks) : render(books);

//Initial rendering
//render(books);

const search = async (searchTerm) => {
  let res = await getBook(searchTerm);
  console.log(res.items);
};
