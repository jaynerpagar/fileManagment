const fs = require('fs');
const {ResponseHandler, MastersResponseBody }= require('../util/responseHandler');
const responseHandler = new ResponseHandler();

let {RES_MSG , RES_CODE} = require('../constants/responseMsg');





const list = async(req,res) =>{
    try {
        const file = fs.readdirSync('./uploads');
        if(file.length>0){
        return responseHandler.MasterHandleBody(
            new MastersResponseBody(RES_CODE[200], RES_MSG.COMMON.OK, {file}),
            res
        )
        }else{
             return responseHandler.MasterHandleBody(
            new MastersResponseBody(RES_CODE[200], RES_MSG.COMMON.NO_FILE_FOUND, {file}),
            res
        )
        }
    } catch (error) {
        console.error('Error reading directory:', error.message);
        return responseHandler.MasterHandleBody(
            new MastersResponseBody(RES_CODE[500], RES_MSG.COMMON.INTERNAL_SERVER_ERROR, {}),
            res
        )
    }
}

module.exports =  list;