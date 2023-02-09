require("dotenv").config();

// API Project !

// this will take express
const express = require("express");

// install Mongoose

const mongoose = require("mongoose");

// we need body parse to use post request
var bodyParser = require("body-parser");

// initialize : noddy gets the instance of the express
const booky = express();

// this will use json format of json
booky.use(express.json());

// now we have tp initialize body parser as well
booky.use(bodyParser.urlencoded({ extended: true }));
booky.use(bodyParser.json()); // body parser only use json() format of documents

// connecting mongo db
const connectDB = async () => {
  const conn = await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected.."));
};
module.exports = connectDB;

// DATABASE
const database = require("./Database");
const { urlencoded } = require("express");
// console.log(database);

/*
    ROUTE : /
    Description : get all the books
    Access : PUBLIC  
    parameter : None
    Method : GET
*/

booky.get("/", (request, response) => {
  return response.json({ books: database.books });
  //   return response.json({ data: "data fetched" });
});

// after getting the book the URL will be this.
/*
    ROUTE : /is
    Description : get specific book on ISBN
    Access : PUBLIC  
    parameter : isbn
    Method : GET
*/

booky.get("/is/:isbn", (request, response) => {
  const getSpecificBook = database.books.filter((book) => {
    return book.ISBN === request.params.isbn;
  });

  if (getSpecificBook.length == 0)
    return response.json({ error: `${request.params.isbn} Not Found` });

  return response.json({ book: getSpecificBook });
});

// after getting category the book the URL will be this.
/*
    ROUTE : /c
    Description : get specific book on category
    Access : PUBLIC  
    parameter : category
    Method : GET
*/

booky.get("/c/:category", (request, response) => {
  const getSpecificBook = database.books.filter((book) => {
    return book.category.includes(request.params.category); // basically it iterate through the array of categories.
  });

  if (getSpecificBook.length === 0)
    return response.json({
      error: `No book of category ${request.params.category} are not found in database `,
    });

  return response.json({ book: getSpecificBook });
});

// after getting language the book the URL will be this.
/*
    ROUTE : /lan
    Description : get specific book on language
    Access : PUBLIC  
    parameter : language
    Method : GET
*/

booky.get("/lan/:language", (request, response) => {
  const getSpecificBook = database.books.filter((book) => {
    return book.language === request.params.language; // basically it iterate through the array of categories.
  });

  if (getSpecificBook.length === 0)
    return response.json({
      error: `No book of language ${request.params.categlanguageory} are not found in database `,
    });

  return response.json({ book: getSpecificBook });
});

// now for the author

booky.get("/author", (request, response) => {
  return response.json({ author: database.author });
});

// To get a list of authors based on books.
// after getting language the book the URL will be this.
/*
    ROUTE : /author/book
    Description : get all authors on book
    Access : PUBLIC  
    parameter : isbn
    Method : GET
*/

booky.get("/author/book/:isbn", (request, response) => {
  const getSpecificAuthor = database.author.filter((author) => {
    return author.books.includes(request.params.isbn); // basically it iterate through the array of categories.
  });

  if (getSpecificAuthor.length === 0)
    return response.json({
      error: `No author of book of ${request.params.isbn}  `,
    });

  return response.json({ author: getSpecificAuthor });
});

// now for the publications

booky.get("/publication", (request, response) => {
  return response.json({ publication: database.publication });
});

// now we are making the server on port 3000

// -------------------------------------------------------------------
// ---------POST REQUEST THROUGH API----------------------------------

/*
ROUTE : /book/new
Description : add new books
Access : PUBLIC  
parameter : NONE
Method : POST
*/

booky.post("/book/new", (request, response) => {
  const newBook = request.body;
  database.books.push(newBook);
  return response.json({ updatedBook: database.books });
});

/*
ROUTE : /book/new
Description : add new books
Access : PUBLIC  
parameter : NONE
Method : POST
*/

booky.post("/author/new", (request, response) => {
  const newAuthor = request.body;
  database.author.push(newAuthor);
  return response.json(database.author);
});

// starting the server
booky.listen(4000, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server is up and running", 4000);
});
