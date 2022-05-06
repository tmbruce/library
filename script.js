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

let api_url =
  "https://www.googleapis.com/books/v1/volumes?q=How+to+change+your+mind&maxResults=5";

async function getBook() {
  const response = await fetch(api_url);
  const data = await response.json();
  let img = new Image();
  img.src = data.items[0].volumeInfo.imageLinks.thumbnail;
  imgContainer = document.createElement("div");
  imgContainer.append(img);
  imgContainer.className = "book";
  document.querySelector(".container").append(imgContainer);
}

const createHtmlElement = (html) => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

const showModal = (book) => {
  document
    .getElementById(`container-${book.isbn}`)
    .addEventListener("click", () => {
      let modal = document.getElementById(`${book.isbn}`);
      modal.showModal();
    });
};

const closeModal = (book) => {
  document.getElementById(`btn-${book.isbn}`).addEventListener("click", () => {
    document.getElementById(book.isbn).close();
  });
};

const removeBook = (book) => {
  document
    .getElementById(`delete-${book.isbn}`)
    .addEventListener("click", () => {
      books = books.filter((val) => val.isbn != book.isbn);
      render(books);
    });
};

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

const bookElement = (book) => {
  const newBook = createHtmlElement(`
        <div id="container-${book.isbn}" class="book">
            <img src="${book.imgSrc}"/>
        </div>
    `);
  document.querySelector(".container").append(newBook);
};

const render = (arr) => {
  let container = document.querySelector(".container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  arr.forEach((book) => {
    bookElement(book);
    modalElement(book);
  });
};

render(books);
