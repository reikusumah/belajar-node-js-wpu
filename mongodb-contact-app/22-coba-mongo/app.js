const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "wpu";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi Gagal!");
  }

  // pilih database
  const db = client.db(dbName);

  // Menambahkan 1 data ke collection mahasiswa
  //   db.collection("mahasiswa").insertOne(
  //     {
  //       nama: "Erik",
  //       email: "erik@gmail.com",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return console.log("gagal menambah data!");
  //       }

  //       console.log(result);
  //     }
  //   );

  // Menambahkan lebih dari 1 data
  //   db.collection("mahasiswa").insertMany(
  //     [
  //       {
  //         nama: "Eriawan",
  //         email: "eriawan@gmail.com",
  //       },
  //       {
  //         nama: "Apip",
  //         email: "apip@gmail.com",
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Data gagal ditambahkan");
  //       }

  //       console.log(result);
  //     }
  //   );

  // Menampilkan semua data yang ada di collection 'mahasiswa'
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find()
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // Menampilkan data berdasarkan kriteria
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find({ nama: "Erik" })
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // Mengubah data
  //   const updatePromise = db.collection("mahasiswa").updateOne(
  //     {
  //       email: "apip@gmail.com",
  //     },
  //     {
  //       $set: {
  //         nama: "Apip Saepuloh",
  //       },
  //     }
  //   );

  //   updatePromise
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // Mengubah data lebihdari 1, sesuai kriteria
  //   db.collection("mahasiswa").updateMany(
  //     {
  //       nama: "Erik",
  //     },
  //     {
  //       $set: {
  //         nama: "Erik Ajah",
  //       },
  //     }
  //   );

  // Menghapus data
  db.collection("mahasiswa")
    .deleteOne({
      email: "apip@gmail.com",
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
