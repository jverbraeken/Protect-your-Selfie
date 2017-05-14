const db = require('./db.js');
const key_generator = require('../keys.js');

module.exports = {
  new_file : function(username_in, key_to_encrypt, secret, file) {
    const nonsense = key_generator.encrypt(key_to_encrypt, secret);
    console.log("1");
    const query1 = db.get().query("INSERT INTO files(amazon_path) VALUES ($1) RETURNING id", ["test"], function(err, result) {
      const query2 = db.get().query("SELECT * FROM users WHERE username = 'joost'");
      query2.on('row', (row) => {
        console.log("3");
        db.get().query("INSERT INTO relations VALUES ($1, $2, $3, $4)", [row.id, row.id, nonsense, result.rows[0].id]);
      });
    });
  },

  get_files : function(username_in, password_in) {
    return new Promise((resolve, reject) => {
      const query1 = db.get().query("SELECT * FROM users WHERE username = $1", [username_in]);
      query1.on('row', (row) => {
        if (row.password === password_in) {
          const results = [];
          const query2 = db.get().query("SELECT file_name FROM files WHERE id IN (SELECT associated_file FROM relations WHERE granted_user = $1)", [username_in]);
          query2.on('row', (row2) => {
            results.push(row);
          });
          query2.on('end', () => {
            resolve(results);
          });
        } else {
          // OOPS
        }
      });
    });
  }
}
