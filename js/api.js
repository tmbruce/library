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
