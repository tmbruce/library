function Book(
  title,
  subtitle,
  author,
  isbn,
  year,
  pages,
  read = false,
  imgSrc,
  snippet
) {
  this.title = title;
  (this.subtitle = subtitle), (this.author = author);
  this.isbn = isbn;
  this.year = year;
  this.pages = pages;
  this.read = read;
  this.imgSrc = imgSrc;
  this.snippet = snippet;
}

export default Book;
