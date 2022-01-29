const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
  const mahasiswa = [
    {
      nama: "Mohamad Fachreiza",
      email: "mohfachrei@gmail.com",
    },
    {
      nama: "Erik",
      email: "erik@gmail.com",
    },
    {
      nama: "Adrian",
      email: "adrian@gmail.com",
    },
  ];

  res.render("index", {
    layout: "layouts/main-layout",
    nama: "Reiza",
    title: "Home",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { layout: "layouts/main-layout", title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: "layouts/main-layout", title: "Contact" });
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
