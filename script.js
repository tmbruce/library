const handleResponse = (response) => {
  console.log(response);
};

// const api_url =
//   "https://itunes.apple.com/search?media=ebook&term=bible&limit=10";
const api_url =
  "http://openlibrary.org/search.json?title=how+to+change+your+mind";

async function getBook() {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data.docs[0]);
  let img = new Image();
  img.src = `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
  document.body.append(img);
}

data = getBook();

// curl 'https://itunes.apple.com/search?media=ebook&term=how+to+change+your+mind&limit=2'

// {
//     "resultCount":1,
//     "results": [
//    {
//        "artworkUrl60":"https://is4-ssl.mzstatic.com/image/thumb/Publication113/v4/c3/d9/65/c3d96524-4945-5c67-b0ed-2f66aeae5bf3/9780525558941.d.jpg/60x60bb.jpg",
//        "artworkUrl100":"https://is4-ssl.mzstatic.com/image/thumb/Publication113/v4/c3/d9/65/c3d96524-4945-5c67-b0ed-2f66aeae5bf3/9780525558941.d.jpg/225x225bb.jpg",
//        "artistViewUrl":"https://books.apple.com/us/artist/michael-pollan/156594380?uo=4",
//        "trackCensoredName":"How to Change Your Mind",
//        "fileSizeBytes":3958356, "formattedPrice":"$14.99",
//        "trackViewUrl":"https://books.apple.com/us/book/how-to-change-your-mind/id1296650291?uo=4",
//        "currency":"USD",
//        "trackId":1296650291,
//        "trackName":"How to Change Your Mind",
//        "releaseDate":"2018-05-15T07:00:00Z",
//        "genreIds":["9025", "38", "9029", "10086", "9008"],
//        "artistIds":[156594380], "artistId":156594380,
//        "artistName":"Michael Pollan",
//        "genres":["Health, Mind & Body", "Books", "Professional & Technical", "Medical", "Biographies & Memoirs"],
//        "price":14.99,
//        "description":"<b><b><b><b>“Pollan keeps you turning the pages . . . cleareyed and assured.” —<b><i>New York Times<\/i><\/b><br /><br /><b>A #1&#xa0;<i>New York Times<\/i>&#xa0;Bestseller, <\/b><i>New York Times Book Review<\/i>&#xa0;10 Best Books of 2018, and<\/b><\/b><i>&#xa0;New York Times <\/i>Notable Book&#xa0;<br /><br />A brilliant and brave investigation&#xa0;into the medical and scientific revolution taking place around psychedelic drugs--and the spellbinding story of his own life-changing psychedelic experiences <\/b><\/b><br /><br />When Michael Pollan set out to research how LSD and psilocybin (the active ingredient in magic mushrooms) are being used to provide relief to people suffering from difficult-to-treat conditions such as depression, addiction and anxiety, he did not intend to write what is undoubtedly his most personal book. But upon discovering how these remarkable substances are improving the lives not only of the mentally ill but also of healthy people coming to grips with the challenges of everyday life, he decided to explore the landscape of the mind in the first person as well as the third. Thus began a singular adventure into various altered states of consciousness, along with a dive deep into both the latest brain science and the thriving underground community of psychedelic therapists.  Pollan sifts the historical record to separate the truth about these mysterious drugs from the myths that have surrounded them since the 1960s, when a handful of psychedelic evangelists inadvertently catalyzed a powerful backlash against what was then a promising field of research.<br /><br />A unique and elegant blend of science, memoir, travel writing, history, and medicine, <i>How to Change Your Mind<\/i> is a triumph of participatory journalism. By turns dazzling and edifying, it is the gripping account of a journey to an exciting and unexpected new frontier in our understanding of the mind, the self, and our place in the world. The true subject of Pollan's \"mental travelogue\" is not just psychedelic drugs but also the eternal puzzle of human consciousness and how, in a world that offers us both suffering and joy, we can do our best to be fully present and find meaning in our lives.", "kind":"ebook", "averageUserRating":4.5, "userRatingCount":558}]
//    }
