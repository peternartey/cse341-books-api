CSE341 W01 Assignment: Books Web Service


Student: Peter Kweku Nartey  
Course:** CSE341 – Web Services  
Assignment: W01 Books Web Service

 GitHub Repository

Repository: https://github.com/peternartey/cse341-books-api
 URL https://cse341-books-api-wkag.onrender.com



 Time Reflection

In my own words, I spent three days completing this assignment. The work involved setting up the Node.js and Express application, connecting it to MongoDB, creating the books collection and API routes, testing the endpoints, and deploying the application.

I used an environment variable named MONGODB_URI to keep the MongoDB connection string outside the application code. I also used a .gitignore file to exclude the .env file from Git so that database credentials would not be committed to the repository.

This approach helps protect private connection details while allowing the application to read its database configuration from the environment.

 Implementation Decision

One important implementation decision was to use the book's custom id field to find a single book instead of using MongoDB's automatically generated _id field.

In the single-book controller, the route parameter is converted to a number and used in the database query:

javascript
const bookId = Number(req.params.id);
const book = await db.collection("books").findOne({ id: bookId });


I chose this approach because the assignment's book data uses a simple numeric `id`, making the endpoint `/books/:id` straightforward to test and understand.

Relevant file:  
https://github.com/peternartey/cse341-books-api/blob/main/src/controllers/books.js


If I were to complete this assignment again, I would create a separate Git branch for each task and open a pull request before merging changes into the main branch. I would also test the application locally and on the hosted server after each major change. This would help me identify problems earlier and make the development process easier to track.




