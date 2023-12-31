//Autor: Merlin Burbach, Sajiel Ahmad
const jwt = require('jsonwebtoken');

//Teilt einen Token zu
function getUserResponse(call) {
    const email = call.email; // Speichert die email
    const token = jwt.sign(
        { user_id: toString(call.password[0].user_id), email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
    let res = {
        'status': 200,
        'name': call.user,
        'userid': call.password[0].user_id,
        'userStatus': call.status,
        'rolle': call.rolle,
        'idToken': token
    };

    return res;
}
module.exports = { getUserResponse };
