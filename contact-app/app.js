const yargs = require("yargs");
const contacts = require("./contacts");

// mengambil argumen dari command line
// console.log(yargs.argv);

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  // menambahkan warning ketika tidak ada perintah tambahan
  // pada perintah "node app"
  .demandCommand();

// Menampilkan daftar semua nama $ no. hp
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama & no. HP contact",
  handler() {
    contacts.listContact();
  },
});

// Menampilkan detail sebuah contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

// Menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "menghapus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();
