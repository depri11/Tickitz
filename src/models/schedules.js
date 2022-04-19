const db = require("../configs/db");
const models = {};

models.getAll = function () {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM schedule ORDER BY id ASC")
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

models.getData = function ({ id }) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM schedule WHERE id = ${id}`)
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

models.addData = function ({ booking_id, date_start, date_end, time }) {
  return new Promise(function (resolve, reject) {
    db.query(`INSERT INTO schedule (booking_id, date_start, date_end, time) VALUES($1, $2, $3, $4) returning *`, [booking_id, date_start, date_end, time])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

models.deleteData = function ({ id }) {
  return new Promise(function (resolve, reject) {
    db.query(`DELETE FROM schedule WHERE id=${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};

models.updateData = function ({ booking_id, date_start, date_end, time, id }) {
  return new Promise(function (resolve, reject) {
    db.query(`UPDATE schedule SET booking_id=$1, date_start=$2, date_end=$3, time=$4, updated_at=now() WHERE id=${id} returning *`, [booking_id, date_start, date_end, time])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

module.exports = models;
