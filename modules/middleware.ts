import { validationResult } from 'express-validator';

export const handleErrors = (req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      console.log(errors.array())
      res.status(402).json({errors:errors.array()})
    }
    next();
}