const express = require('express');

const upload = require('../services/upload')
const  {ResponseBody} = require('../util/responseHandler');
const  {RES_MSG,RES_CODE } = require('../constants/responseMsg');
const  HTTP_STATUS  = require('../constants/httpStatusCodes');
const list = require('../controller/list');
const fileDelete = require('../controller/delete')
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const {ResponseHandler, MastersResponseBody }= require('../util/responseHandler');
const responseHandler = new ResponseHandler();
const fileRouter = express.Router();


fileRouter.post('/upload',upload.single('file'), (req, res, next) => {
    

    if(req.file){
    const responseBody = new ResponseBody(HTTP_STATUS.OK, RES_MSG.COMMON.FILE_UPLOAD_SUCCESFULLY)
    res.status(responseBody.code).json(responseBody)
    }else{
        return responseHandler.MasterHandleBody(
            new MastersResponseBody(RES_CODE[500], RES_MSG.COMMON.INTERNAL_SERVER_ERROR, {}),
            res
        )
    }
});
fileRouter.get('/list',asyncMiddleware(list));
fileRouter.delete('/delete/:filename',asyncMiddleware(fileDelete))






module.exports =   fileRouter 