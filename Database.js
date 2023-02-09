// This is dummy database as we have not learned the databases yet.

// books data
const books = [
  {
    ISBN: "12345Book",
    title: "Tesla!!",
    pubDate: "2023-02-06", // yyyy-mm-dd
    language: "en",
    numPage: 250,
    author: [1, 2], // id's of authors since two or more book can have same author
    publications: [1],
    category: ["tech", "space", "education"],
  },
];

// authors data

const author = [
  {
    id: 1,
    name: "Roshan",
    books: ["12345Book", "secretBook"],
  },

  {
    id: 2,
    name: "Elon Musk",
    books: ["12345Book"],
    category: "space",
  },
];

// publications data

const publication = [
  {
    id: 1,
    name: "writex",
    books: ["12345Book"],
  },
];

// but we wnt to use it in another js file
// to export it to use in another files we can do following

module.exports = { books, author, publication };
// it will get exported
