// Belajar membuat Local Module

function cetakNama(nama) {
  return `Hello, nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
  nama: "Rei Kusumah",
  umur: 20,
  cetakMhs() {
    return `Halo, nama saya ${this.nama} dan saya ${this.umur} tahun`;
  },
};

class Orang {
  constructor() {
    console.log("Objek Orang telah dibuat!");
  }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// // module.exports.Orang = Orang;

// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mahasiswa: mahasiswa,
//   Orang: Orang,
// };

// Karena ES6 akan langsung mengerti antara nama Properti
// dan nama Value, maka dapat ditulis seperti ini
module.exports = { cetakNama, PI, mahasiswa, Orang };
