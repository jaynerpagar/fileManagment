const fs = require('fs');


const {ResponseHandler, MastersResponseBody }= require('../util/responseHandler');
const responseHandler = new ResponseHandler();
let  {RES_MSG,RES_CODE } = require('../constants/responseMsg');


const fileDelete =async (req,res)=>{
  try {
    

    let filename = req.params.filename;
    const filePath = `./uploads/${filename}`;
    fs.unlinkSync(filePath);


    return responseHandler.MasterHandleBody(
        new MastersResponseBody(RES_CODE[200], RES_MSG.COMMON.FILE_DELETED_SUCCESFULLY,{}),
        res
    )



  } catch (error) {
     console.error('Error reading directory:', error.message);
        return responseHandler.MasterHandleBody(
            new MastersResponseBody(RES_CODE[500], RES_MSG.COMMON.INTERNAL_SERVER_ERROR, {}),
            res
        )
  }
}

module.exports = fileDelete


