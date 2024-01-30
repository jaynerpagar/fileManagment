const express = require('express');
const  ResponseBody = require('../util/responseHandler');
const  RES_MSG  = require('../constants/responseMsg');
const  HTTP_STATUS  = require('../constants/httpStatusCodes');
const fileRouter = require('./file.route');
const  asyncMiddleware = require('../middlewares/asyncMiddleware')


const Router = express.Router();


Router.use('/file', fileRouter);


Router.get('/', (request, response, next) => {
    const responseBody = new ResponseBody(HTTP_STATUS.OK, RES_MSG.COMMON.OK)
    response.status(responseBody.code).json(responseBody)
});
                                                 



module.exports  = Router 