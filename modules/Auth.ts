import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt';

dotenv.config();
export const comparePasswords=(password ,hash)=>{
 return bcrypt.compare(password,hash);
}

export const hashPassword=(password)=>{
    return bcrypt.hash(password,10);
}

export const generate=(user)=>{
const token=jwt.sign(
    {
        id:user.id,
        username:user.username
    },
    process.env.SALT)
return token;
}

export const secure =(req,res,next)=>{
    const bearer=req.headers.authorization;
    if(!bearer){
        res.status(401).send({message:"No Access Bro... Tarvatha raa"})
    return;
    }
    const [ ,token]=bearer.split(' ')
    if(!token)
    {
        res.status(401).send("Entry ledu bro token lekunda..")
        return ;
    }
    try{
        const valid=jwt.verify(token,process.env.SALT);
        req.user=valid;
        next();
    }
    catch(e){
        console.log(e)
        res.status(401).send("No Entry without token")
        return
    }

}