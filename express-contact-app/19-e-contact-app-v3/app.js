const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");
// Third-Party Middleware
app.use(expressLayouts); // EJS
// Built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
    msg: req.flash("msg"),
  });
});

// Halaman form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main-layout",
    title: "Form Tambah Data Contact",
  });
});

// Proses Tambah Data Contact
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplicate = cekDuplikat(value);

      if (duplicate) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "Nomor Handphone tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        layout: "layouts/main-layout",
        title: "Form Tambah Data Contact",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // Kirimkan flash message
      req.flash("msg", "Data contact berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data contact berhasil dihapus!");
    res.redirect("/contact");
  }
});

// halaman form ubah data contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("edit-contact", {
    layout: "layouts/main-layout",
    title: "Form Ubah Data Contact",
    contact,
  });
});

app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplicate = cekDuplikat(value);

      if (value !== req.body.oldNama && duplicate) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "Nomor Handphone tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        layout: "layouts/main-layout",
        title: "Form Ubah Data Contact",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      // res.send(req.body); //debug
      updateContacts(req.body);
      req.flash("msg", "Data contact berhasil diubah!"); // Kirimkan flash message
      res.redirect("/contact");
    }
  }
);

// Halaman detail contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  // console.log(contact);

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
