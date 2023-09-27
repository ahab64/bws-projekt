const { closeDatabaseConnection } = require("../../databaseConnection");

module.exports = { allPendingUsers };

async function allPendingUsers(db) {
    try {
        const sql = "SELECT * FROM User WHERE status = 'Pending' LIMIT 10";
        
        return new Promise((resolve, reject) => {
            db.all(sql, function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);  
                }
            });
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { allPendingUsers };
