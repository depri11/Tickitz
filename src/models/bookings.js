const db = require("../configs/db");
const models = {};

models.getAll = function () {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM booking ORDER BY id `)
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

models.addData = function ({ date_time, seat, movie_id, total_payment }) {
  return new Promise(function (resolve, reject) {
    db.query(`INSERT INTO booking (date_time, seat, movie_id, total_payment) VALUES ($1, $2, $3, $4) returning *`, [date_time, seat, movie_id, total_payment])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

models.getData = function ({ id }) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM booking WHERE id = ${id}`)
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

models.updateData = function ({ id, premier_id, date_time, seat, total_payment, movie_id }) {
  return new Promise(function (resolve, reject) {
    db.query(`UPDATE booking SET premier_id=$1, date_time=$2, seat=$3, total_payment=$4, movie_id=$5, updated_at=now() WHERE id = $6 returning *`, [premier_id, date_time, seat, total_payment, movie_id, id])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

models.deleteData = function ({ id }) {
  return new Promise(function (resolve, reject) {
    db.query(`DELETE FROM booking WHERE id = $1`, [id])
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// models.searchData = function ({ lowercase }) {
//   return new Promise(function (resolve, reject) {
//     db.query(`SELECT * FROM movie WHERE LOWER(title) LIKE '${lowercase}%'`)
//       // db.query("SELECT * FROM movie ORDER BY id ASC")
//       .then((data) => {
//         resolve(data.rows);
//       })
//       .catch((err) => reject(err));
//   });
// };

module.exports = models;
