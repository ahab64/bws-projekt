async function insertIntoPassword(passwort, userId, db) {
    const qryInsertPassword = "INSERT INTO Passwort ('user_id', 'passwort') VALUES (?, ?)";
    return new Promise((resolve, reject) => {
      db.run(qryInsertPassword, [userId, passwort], function (err) {
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