// Core module
// File System
const fs = require("fs");
const readline = require("readline");

// menuliskan string ke file (synchronus)
// try {
//   fs.writeFileSync("data/test.txt", "Hello World!!!");
// } catch (e) {
//   console.log(e);
// }

// menulliskan file (asynchronus)
//1
// fs.writeFile("data/test.txt", "Hello World secara Asynchronus", (err) => {
//   console.log(err);
// });

// 2
// const data = "Hello Dunia...";
// fs.writeFile("data/messages.txt", data, (err) => {
//   if (err) throw err;
//   console.log("The File has been saved");
// });

// membaca file secara synchronus
// const test = fs.readFileSync("data/test.txt", "utf-8");
// console.log(test);

// membaca file secara asynchronus
// const data = "./data/test.txt";

// fs.readFile(data, "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan nama kamu : ", (nama) => {
  rl.question("Masukkan No. Hp kamu : ", (noHp) => {
    const contact = { nama, noHp };
    const file = fs.readFileSync("data/contact.json", "utf-8");
    const contacts = JSON.parse(file);

    contacts.push(contact);

    fs.writeFileSync("data/contact.json", JSON.stringify(contacts));

    console.log("Terima kasih sudah menmasukkan data.");

    rl.close();
  });
});
