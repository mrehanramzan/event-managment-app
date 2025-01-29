const errorHandler = (error,request,response,next)=>{

    error.statusCode = error.status || 500;
    error.message = error.message || error;

    return response.status(error.statusCode).json({
        message:error.message,
        success:false
    })


}

export default errorHandler;