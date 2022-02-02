const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contacts");

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");
// Third-Party Middleware
app.use(expressLayouts); // EJS

// Built-in middleware
app.use(express.static("public"));

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
  const contacts = loadContact();

  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Contact",
    contacts,
  });
});

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  console.log(contact);

  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Detail Contact",
    contact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
