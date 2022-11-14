import { body } from 'express-validator';
import prisma from "../db";

//Get All Products
export const getUserProducts=async(req,res)=>{
    const user=await prisma.user.findUnique({
        where:{
            id:req.user.id
        },
        include:{
            products:true
        }
    });
    res.send({data:user.products})
}

//Get One Product
export const getOneProduct = async(req,res)=>{
   const id=req.params.id;
   const product=await prisma.product.findFirst({
    where:{
        id :req.user.id,
        belongsTo:req.user.id
    }
   })
   res.json({data:product})
}

//create a product

export const createProduct=async(req,res)=>{
    const product=await prisma.product.create({
        data:{
            name:req.body.name,
            belongsToId: req.user.id
        }
    })
    res.json({data:product})
}

//Update product
export const updateProduct=async(req,res)=>{
    const id = req.params.id;
    const userId = req.user.id;
    
    const update=await prisma.product.update({
        where:{
            id_belongsToId:{
                id:id,
                belongsToId:userId
            }
        },
        data :{
            name:req.body.name
        }
    })
    res.json({data:update})
    // res.json("hey")
}

//delete product
export const deleteproduct=async(req,res)=>{
    const id = req.params.id;
    const deleted=await prisma.user.delete({
        where:{
            id:id
            }
    })
    res.json({message:deleted})
}
    