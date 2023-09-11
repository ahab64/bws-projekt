function getUserResponse(call){
    let res = {
        'status': 200,
        'name': call.user,
        'userid': call.passwort[0].user_id,
        'rolle': call.rolle,
    };

    return res;
}
module.exports = { getUserResponse };
