const db = require('./db.js');
const key_generator = require('../keys.js');

module.exports = {
  new_file : function(username_in, password_in, key_to_encrypt, secret, file) {
    return new Promise((resolve, reject) => {
      const query1 = db.get().query("SELECT * FROM users WHERE username = $1", [username_in]);
      query1.on('row', (row) => {
        if (row.password === password_in) {
          const nonsense = key_generator.encrypt(key_to_encrypt, secret);
          console.log("1");
          db.get().query("INSERT INTO files(amazon_path) VALUES ($1) RETURNING id", ["test"], function(err, result) {
            const query2 = db.get().query("SELECT * FROM users WHERE username = 'joost'");
            query2.on('row', (row) => {
              console.log("3");
              db.get().query("INSERT INTO relations VALUES ($1, $2, $3, $4)", [row.id, row.id, nonsense, result.rows[0].id]);
            });
          });
        }
      });
    });
  },

  get_file : function(username_in, password_in, nonsense, secret, file) {
    return new Promise((resolve, reject) => {
      const query1 = db.get().query("SELECT * FROM users WHERE username = $1", [username_in]);
      query1.on('row', (row) => {
        if (row.password === password_in) {
          const decrypted_key = key_generator.decrypt(nonsense, secret);
          console.log("1");
          const query2 = db.get().query("SELECT amazon_path FROM files WHERE file_name = $1", [file]);
          resolve("replace this by the amazon file");
        }
      });
    });
  }
}
