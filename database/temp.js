

get_files: function(username_in, password_in) {
  return new Promise((resolve, reject) => {
    const query1 = db.get().query("SELECT * FROM users WHERE username = $1", [username_in]);
    query1.on('row', (row) => {
      if (row.password === password_in) {
        const results = [];
        const query2 = db.get().query("SELECT file_name FROM files WHERE id IN (SELECT associated_file FROM relations WHERE granted_user = $1)", [row.id]);
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
},
