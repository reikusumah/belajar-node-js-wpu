const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br>Product Category : ${req.query.category}`
  );
  // --> access link: http://localhost:3000/product/1?category=Shirt
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const fs = require("fs");
// const http = require("http");

// const port = 3000;

// const renderHtml = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("ERROR: File not found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });

//     const url = req.url;
//     switch (url) {
//       case "/about":
//         renderHtml("./about.html", res);
//         break;
//       case "/contact":
//         renderHtml("./contact.html", res);
//         break;
//       default:
//         renderHtml("./index.html", res);
//         break;
//     }

//     // if (url === "/about") {
//     //   renderHtml("./about.html", res);
//     // } else if (url === "/contact") {
//     //   renderHtml("./contact.html", res);
//     // } else {
//     //   renderHtml("./index.html", res);
//     // }
//   })
//   .listen(port, () => {
//     console.log(`Server is listening on port ${port}...`);
//   });
