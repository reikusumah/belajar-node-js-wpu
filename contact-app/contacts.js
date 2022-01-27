// hasil refactoring dari pertemuan 7
// memperbaiki kemungkinan "CALLBACK HELL"
// pada pertanyaan
// maka digunakanlah async-await

const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  // const file = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(file);
  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Contact sudah terdaftar. Gunakan nama lain!")
    );
    return false;
  }

  // cek format email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor hape tidak valid!"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("Terima kasih sudah memasukkan data."));

  // rl.close();
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("-== DAFTAR KONTAK ==-"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.blue.inverse.bold(contact.nama));
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();

  // membuat array baru dengan fungsi "filter"
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(
    chalk.green.inverse.bold(`Data kontak ${nama} berhasil dihapus!`)
  );
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
