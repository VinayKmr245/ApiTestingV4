import prisma from '../db';
import { hashPassword, generate, comparePasswords } from './../modules/Auth';

export const createNewUser = async (req,res)=>{
    const user=await prisma.user.create({data:{
        username : req.body.username,
        password: await hashPassword(req.body.password)
        
    }})
    const token =generate(user)
    res.json({token:token})
}

export const signin = async (req,res)=>{
    const user= await prisma.user.findUnique({
        where:{
            username:req.body.username
        }
    })
    const isValid = comparePasswords(req.body.password,user.password)

    if(!isValid){
        res.status(401).send("Password Tappu Bro..");
        return;
    }
    const token=generate(user)
    res.json({token:token})
}