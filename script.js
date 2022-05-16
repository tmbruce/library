import Book from "./js/book.js";
import defaultBooks from "./js/defaultBooks.js";
import getBook from "./js/api.js";

let searchResults = [];
let books = [];
let localBooks = localStorage.getItem("books");
localBooks
  ? (books = JSON.parse(localBooks))
  : defaultBooks.map((defaultBook) => {
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
      localStorage.setItem("books", JSON.stringify(books));
      render(books);
    });
};

const addBook = (book) => {
  document.getElementById(`add-${book.isbn}`).addEventListener("click", () => {
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    render(books);
    searchResults = [];
  });
};

const addButton = (book) => {
  return `<button id=add-${book.isbn}>Add to library</button>`;
};
const removeButton = (book) => {
  return `<button id=delete-${book.isbn}>Remove from library</button>`;
};
//Creates modal element for book details
const modalElement = (book, destination) => {
  let addNewBook;
  destination == ".container" ? (addNewBook = false) : (addNewBook = true);
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
              ${
                addNewBook
                  ? `<div></div>`
                  : `<li>
              <label class="checkbox__container">Read
              <input id="read__checkbox__${book.isbn}" type="checkbox">
              </label>
            </li>`
              }
            </ul>
          </div>
        </div>
        <div class="book__snippet">${book.snippet}</div>
        ${addNewBook ? addButton(book) : removeButton(book)}
    </dialog>
    `);
  document.querySelector(destination).append(newModal);
  if (destination == ".container") {
    let checkbox = document.querySelector(`#read__checkbox__${book.isbn}`);
    book.read ? (checkbox.checked = true) : (checkbox.checked = false);
    checkbox.addEventListener("click", () => {
      let checkbox = document.querySelector(
        `#read__checkbox__${book.isbn}`
      ).checked;
      books.forEach((b) => {
        if (b.isbn == book.isbn) {
          book.read = checkbox;
        }
      });
      localStorage.setItem("books", JSON.stringify(books));
    });
  }
  showModal(book);
  closeModal(book);
  addNewBook ? addBook(book) : removeBook(book);
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
            ${
              searchResults.length == 0
                ? `<div id="search__results"><h1>Find something new!</h1></div>`
                : `<div id="search__results"></div>`
            }
            
        </dialog>
    `);
  document.querySelector(".container").append(searchModal);
  let searchBox = document.querySelector("#search__term");
  document.querySelector("#modal__search").addEventListener("click", (e) => {
    e.preventDefault();
    const showSearch = async () => {
      searchResults = [];
      let rawResults = await search(searchBox.value);
      searchBox.value = "";
      searchResults = rawResults.map((result) => {
        let imgLink;
        let identifier;
        //let thumbnail = result.volumeInfo.imageLinks.thumbnail;
        try {
          imgLink = result.volumeInfo.imageLinks.thumbnail;
          identifier = result.volumeInfo.industryIdentifiers[0].identifier;
        } catch (e) {
          imgLink = "./img/genericBookCover.jpeg";
          identifier = result.id;
        }

        console.log(result);
        return new Book(
          result.volumeInfo.title,
          result.volumeInfo.subtitle,
          result.volumeInfo.authors[0],
          identifier,
          result.volumeInfo.publishedDate,
          result.volumeInfo.pageCount,
          result.volumeInfo.read,
          imgLink,
          result.volumeInfo.description
        );
      });
      clear("#search__results");
      searchResults.forEach((result) => {
        bookElement(result, "#search__results");
        modalElement(result, "#search__results");
      });
    };
    showSearch();
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
const bookElement = (book, destination) => {
  const newBook = createHtmlElement(`
        <div id="container-${book.isbn}" class="book">
            <img src="${book.imgSrc}" loading="lazy" alt="${book.title}"/>
        </div>
    `);
  document.querySelector(destination).append(newBook);
};

const clear = (element) => {
  let container = document.querySelector(element);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};
//Rendering method to display books
const render = (arr) => {
  console.log(books);
  clear(".container");
  arr.length == 0
    ? document
        .querySelector(".container")
        .append(
          books.length > 0
            ? createHtmlElement(`<div>No search results</div>`)
            : createHtmlElement(`<div>Add some books to your library!</div>`)
        )
    : arr.forEach((book) => {
        bookElement(book, ".container");
        modalElement(book, ".container");
      });
};

render(books);

const search = async (searchTerm) => {
  let res = await getBook(searchTerm);
  return res.items;
};
