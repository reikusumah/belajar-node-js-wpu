// console.log("Hello WPU");

// const nama = "Fachreiza";
// console.log(nama);

// const cetakNama = (nama) => `Hi, nama saya ${nama}`;
// console.log(cetakNama("Fachreiza"));

// const fs = require("fs"); //core module
// const cetakNama = require("./coba"); //local module
// const moment = require("moment"); //third party module

// const cetakNama = require("./coba");

// console.log(coba.cetakNama("Fachreiza"), coba.PI);
// console.log(cetakNama("Fachreiza"));
const coba = require("./coba");

console.log(
  coba.cetakNama("Fachreiza"),
  coba.PI,
  coba.mahasiswa.cetakMhs(),
  new coba.Orang()
);
