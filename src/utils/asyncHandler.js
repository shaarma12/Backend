const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => {
            next(err)
        })
    }
}

export { asyncHandler };

// this is second way to use that wrapper function
    
// const asyncHandler = (fn) => {
//     async (req,res,next) => {
//         try {
//             await fn(req, res, next);
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 success: false,
//                 message:error.message
//             })
//         }
//     }
// }