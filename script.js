function Book(title, author, isbn, year, pages, read, imgSrc) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  this.year = year;
  this.pages = pages;
  this.read = read;
  this.imgSrc = imgSrc;
}

const addBook = () => {
  //Add book to library
};

const removeBook = () => {
  //Remove book from library
};
//const createCard = (title, author, isbn, year, pages, read, img) => {
const creaetModal = (title, author, imgUrl) => {};

let api_url =
  "https://www.googleapis.com/books/v1/volumes?q=this+is+your+mind+on+plants&maxResults=5";

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

getBook();
api_url =
  "https://www.googleapis.com/books/v1/volumes?q=how+to+change+your+mind&maxResults=5";
getBook();
api_url =
  "https://www.googleapis.com/books/v1/volumes?q=cracking+the+coding+interview&maxResults=5";
getBook();
api_url =
  "https://www.googleapis.com/books/v1/volumes?q=pragmatic+programmer&maxResults=5";
getBook();
