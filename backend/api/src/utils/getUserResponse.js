function getUserResponse(call){
    let res = {
        'status': 200,
        'name': call.user,
        'userid': call.password[0].user_id,
        'userStatus': call.status,
        'rolle': call.rolle,
    };

    return res;
}
module.exports = { getUserResponse };
