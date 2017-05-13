const db = require('./database/db.js');

module.exports = {
  new_file : function(username_in, key_to_encrypt, secret, file) {
    const nonsense = key_generator.encrypt(key_to_encrypt, secret);
    db.get().query("INSERT INTO files VALUES ($1)", ["test"]);
    db.get().query("SELECT * FROM users WHERE username IS username_in");
    db.get().query("INSET INTO relations VALUES ($1, $2, $3, $4)", [db.get().]);
  }
}
