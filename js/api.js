//"https://www.googleapis.com/books/v1/volumes?q=How+to+change+your+mind&maxResults=5";

async function getBook(searchTerm) {
  const params = new URLSearchParams({
    q: searchTerm,
    maxResults: "5",
  });
  const api_url = `https://www.googleapis.com/books/v1/volumes?${params}`;

  const response = await fetch(api_url);
  const data = await response.json();
  return data;
}

export default getBook;
