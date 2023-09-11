async function insertIntoUser(name, email, rolle, db) {

    try {
        // Annahme: Du führst die INSERT-Abfrage für den neuen Studenten durch
        const qryInsertNewUser = "INSERT INTO User (name, email, rolle) VALUES (?, ?, ?)";
        return userId = await new Promise((resolve, reject) => {
            db.run(qryInsertNewUser, [name, email, rolle], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Diese Zeile gibt die zuletzt eingefügte ID zurück
                }
                console.log("Added User");
            });
        });

    } catch (error) {
        console.error('InsertIntoUser Error:' ,error.message);
    }
}

module.exports = { insertIntoUser };