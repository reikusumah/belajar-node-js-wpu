const validator = require("validator");
const chalk = require("chalk");

console.log(validator.isEmail("mohfachrei@gmail.com"));
console.log(validator.isMobilePhone("085886576163", "id-ID"));

// console.log(chalk.white.bgBlue("Hello World!"));
const nama = chalk`{bgGreen.black Fachreiza}`;
const pesan = chalk`lorem ipsum dolor {bgGreen.italic.black.bold sit amet} consectetur adipisicing elit. Nama saya : ${nama}`;
console.log(pesan);
