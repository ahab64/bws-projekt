function getResponse(call){
    let Res;
    let rolle = "schwuler"
    if(call){
        Res = {
            'status': 200,
            'message': 'login was successfull',
            'role': rolle  
        }
    }
}

module.exports = { getResponse };