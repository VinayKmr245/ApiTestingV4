import { body } from 'express-validator';
import { connect } from 'http2';
import prisma from "../db";

//get all updates
export const getAllUpdates=async(req,res)=>{
    const products=await prisma.product.findMany({
        where:{
            belongsToId:req.user.id
        },
        include:{
            updates:true
        }
    });
    const updates =products.reduce((allUpdates,product)=>{return [...allUpdates,...product.updates]},[])
    res.json({data:updates})
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
    const product=await prisma.product.findUnique({
        where:{
            id:req.body.productId
        }
    })
    if(!product)
    {
        res.json({message:"Invalid User"})
    }
    const update=await prisma.update.create({
        data: {
            title:req.body.title,
            body:req.body.body,
            product:{connect:{id:product.id}},
            asset:req.body.asset
        }
    })
    res.json({data:update})
}

//update update

export const UpdateUpdate=async(req,res)=>{
    const products=await prisma.product.findMany({
        where:{
            id:req.body.id
        },
        include:{
            updates:true
        }
    })
    const updates=products.reduce((allUpdates,product)=>{
        return [...allUpdates,...product.updates]
    },[])
    const match=updates.find(update => update.id===req.params.id)

    if(!match){
        res.json({message:"No you cant update Update"})
    }
    const updatedUpdate= await prisma.update.update({
        where:{
            id:req.params.id
        },
        data:req.body
    })
     res.json({data:updatedUpdate})
}

//delete update

export const deleteUpdate=async(req,res)=>{
    const id=req.params.id;
    const deleted=await prisma.update.delete({
        where:{
            id:id
        }
    })
    res.json({message:"Deleted"})
}