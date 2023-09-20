const jwt = require('jsonwebtoken');
const fs = require('fs');

function getUserResponse(call) {
    const RSA_PRIVATE_KEY = fs.readFileSync('/Users/merlinburbach/Public/bws-projekt/backend/api/security/private.key')
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: toString(call.password[0].user_id) ,
    })

    let res = {
        'status': 200,
        'name': call.user,
        'userid': call.password[0].user_id,
        'userStatus': call.status,
        'rolle': call.rolle,
        'idToke': jwtBearerToken
    };

    return res;
}
module.exports = { getUserResponse };
