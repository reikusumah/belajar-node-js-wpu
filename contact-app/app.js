const yargs = require("yargs");
const contacts = require("./contacts");

// mengambil argumen dari command line
// console.log(yargs.argv);

yargs.command({
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
});

yargs.parse();
