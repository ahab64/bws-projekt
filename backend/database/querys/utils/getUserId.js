async function getUserId(email, db) {
    return new Promise((resolve, reject) => {
        const qryGetUserId = "SELECT User.id FROM User WHERE email like ?";
        db.get(qryGetUserId, [email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    resolve(row.id);
                } else {
                    resolve(null);
                }
            }
        })
    })
}

module.exports = { getUserId };