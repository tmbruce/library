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

const api_url =
  "https://www.googleapis.com/books/v1/volumes?q=this+is+your+mind+on+plants&maxResults=5";

async function getBook() {
  const response = await fetch(api_url);
  const data = await response.json();
  let img = new Image();
  img.src = data.items[0].volumeInfo.imageLinks.thumbnail;
  console.log(img.src);
  document.body.append(img);
}

data = getBook();
