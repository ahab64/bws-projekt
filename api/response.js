function getResponse(call){
    let res;
    let rolle = "schwuler"
    if(call == "yes"){
        console.log("------step1-------")
        res = {
            'status': 200,
            'message': 'login was successfull',
            'role': rolle  
        }
    }
    return res
}

module.exports = { getResponse };