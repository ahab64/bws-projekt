const { openDatabase, getUser, closeDatabaseConnection } = require('../database/databaseConnection');



function getResponse(call){
    let res = {
        'status': 200,
        'name': call.user,
        'userid': call.passwort[0].id_user,
        'rolle': call.rolle,
    };

    return res;
}

module.exports = { getResponse };