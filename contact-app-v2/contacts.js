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

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

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

module.exports = { simpanContact };
