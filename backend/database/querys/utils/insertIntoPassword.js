async function insertIntoPassword(password, userId, db) {
    const qryInsertPassword = "INSERT INTO Password ('user_id', 'password') VALUES (?, ?)";
    return new Promise((resolve, reject) => {
      db.run(qryInsertPassword, [userId, password], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(); // Erfolg, keine Daten zur Rückgabe
        }
        console.log("Inserted password in table for user id:" + userId);
      });
    }); 
}

module.exports = { insertIntoPassword };