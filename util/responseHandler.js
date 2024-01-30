

 class ResponseBody {
    constructor(code, message, data, error) {
        this.code = parseInt(code || 200)
        this.message = message
        this.data = data || undefined
        this.error = error
    }
}
class MastersResponseBody {
  constructor (code ,  message, data) {
    this.status = code
    this.message = message
    this.response = data || undefined
  }
}



 class ResponseHandler {
    constructor () {
      // Method Hard-binding
      this.handleBody = this.handleBody.bind(this)
      this.handleError = this.handleError.bind(this)
      this.handleResponse = this.handleResponse.bind(this)
    }
  
    handleBody (document, options, response) {
      const _defaultOption = { encrypt: true, message: 'OK', code: 200 }
      if (!response) {
        response = options
        options = {}
      }
      const { code, message } = { ..._defaultOption, ...options }
  
      let responseBody = document
      if (document && document.constructor.name !== 'ResponseBody') {
        responseBody = new ResponseBody(code, message, document)
      }
      response.statusMessage = responseBody.message
      response.status(responseBody.code).json(responseBody)
    }
  
    MasterHandleBody (document, options, response) {
      const _defaultOption = {  message: 'OK', code: 200 }
      if (!response) {
        response = options
        options = {}
      }
      const { code, message } = { ..._defaultOption, ...options }
  
      let MastersResponseBody = document
      if (document && document.constructor.name !== 'MastersResponseBody') {
        MastersResponseBody = new MastersResponseBody(code, message, document)
      }
      response.status(200).json(MastersResponseBody)
    }
  
    handleError (error, options, response) {
      const _defaultOption = {
        encrypt: true,
        message: 'Something went wrong',
        code: 500,
        data: undefined
      }
      if (!response) {
        response = options
        options = {}
      }
  
      const { code, data } = { ..._defaultOption, ...options }
      let responseBody = error
      if (error && error.constructor.name !== 'ResponseBody') {
        responseBody = new ResponseBody(code, error.toString(), data)
      }
      response.statusMessage = responseBody.message
      response.status(responseBody.code).json(responseBody)
      return true
    }
  
    handleResponse (response, error, document) {
      if (this.handleError(error, response)) {
        return
      }
      this.handleBody(document, response)
    }
  }


module.exports = {ResponseHandler,MastersResponseBody,ResponseBody};
