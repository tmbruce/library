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

const modalElement = (book) => {
  const newModal = createHtmlElement(`
    <dialog id=${book.isbn}>
        <img src=${book.imgSrc}/>
        <button id=btn-${book.isbn}>Close</button>
    </dialog>
    `);
  document.querySelector(".container").append(newModal);
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
  arr.map((book) => {
    bookElement(book);
    showModal(book);
    modalElement(book);
    closeModal(book);
  });
};

render(books);
// api_url =
//   "https://www.googleapis.com/books/v1/volumes?q=how+to+change+your+mind&maxResults=5";
// getBook();
// api_url =
//   "https://www.googleapis.com/books/v1/volumes?q=cracking+the+coding+interview&maxResults=5";
// getBook();
// api_url =
//   "https://www.googleapis.com/books/v1/volumes?q=pragmatic+programmer&maxResults=5";
// getBook();
