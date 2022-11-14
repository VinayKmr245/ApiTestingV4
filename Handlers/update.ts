import { body } from 'express-validator';
import prisma from "../db";

//get all updates
export const getAllUpdates=async(req,res)=>{
    const updates=await prisma.update.findMany({
        where:{
            id:req.user.id
        }
    });
    res.send({data:updates})
}

//get specific update
export const getSpecificUpdate=async(req,res)=>{
    const update=await prisma.update.findUnique({
     where:{
         id :req.params.id,
     }
    })
    res.json({data:update})
}

//create update
export const createUpdate=async(req,res)=>{
    const update=await prisma.update.create({
        data:{
            title:req.body.title,
            body:req.body.body,
            status:req.body.status,
            version:req.body.version,
            asset:req.body.asset,
        }
    })
    res.json({data:update})
}

//update update

export const UpdateUpdate=async(req,res)=>{
    const id = req.params.id;
    const userId = req.user.id;
    
    const update=await prisma.update.update({
        where:{

        }
    })
    res.json({data:update})
}

//delete update

export const deleteUpdate=async(req,res)=>{
    const id=req.params.id;
    const deleted=await prisma.user.delete({
        where:{
            id:id
        }
    })
    res.json({message:"Deleted"})
}