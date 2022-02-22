const mongoose = require("mongoose");

// Membuat schema atau struktur database/collection Contact
const Contact = mongoose.model("Contact", {
  nama: {
    type: String,
    require: true,
  },
  nohp: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
});

module.exports = Contact;
