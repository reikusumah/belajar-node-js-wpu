// objek disctractoring pada inisiasi require module
const { tulisPertanyaan, simpanContact } = require("./contacts");

const main = async () => {
  const nama = await tulisPertanyaan("Masukkan nama anda : ");
  const email = await tulisPertanyaan("Masukkan email anda : ");
  const noHP = await tulisPertanyaan("Masukkan nomor hanphone anda : ");

  simpanContact(nama, email, noHP);
};

main();
