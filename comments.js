// Create web server
// Create a web server that listens on port 3000 and serves the comments.html file. Use the fs module to read the file and send it to the client.

// The comments.html file contains a form that allows users to submit comments. When a user submits a comment, the form sends a POST request to the server with the comment data. Create a route that listens for POST requests to the /comments endpoint. When the server receives a POST request to the /comments endpoint, parse the comment data from the request body and log it to the console.

// comments.html
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Comments</title>
// </head>
// <body>
//   <h1>Comments</h1>
//   <form action="/comments" method="post">
//     <textarea name="comment"></textarea>
//     <button type="submit">Submit</button>
//   </form>
// </body>
// </html>
// Example

// When a user submits a comment in the form, the server should log the comment data to the console:

// $ node comments.js
// Server is running on http://localhost:3000
// { comment: 'This is a comment.' }
// { comment: 'This is another comment.' }
// { comment: 'This is a third comment.' }
// ...
// To test the server, open comments.html in your browser and submit comments through the form.

// Use the provided comments.html file to create a form that allows users to submit comments.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    fs.readFile('comments.html', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/comments') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const comment = new URLSearchParams(body).get('comment');
      console.log({ comment });
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});