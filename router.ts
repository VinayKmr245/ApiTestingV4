import { getUserProducts,getOneProduct,createProduct,updateProduct,deleteproduct} from './Handlers/product';
import {getAllUpdates,getSpecificUpdate} from './Handlers/update'
import express from 'express'
import { body ,oneOf,validationResult } from 'express-validator';
import { handleErrors } from './modules/middleware';
const router=express.Router()

router.get("/product", getUserProducts);

router.get("/product/:id",getUserProducts);
  
  router.post("/product",body('name').isString(),handleErrors,createProduct);
  
  router.put("/product/:id", [body('name').isString(),handleErrors],updateProduct);
  
  router.delete("/product/:id",[body('name').isString(),handleErrors], deleteproduct);
  
 
  router.get("/update", getAllUpdates);
  
  router.get("/update/:id", getSpecificUpdate);
  
  router.post("/update",createProduct);
  
  router.put("/update/:id", updateProduct);
  
  router.delete("/update/:id", deleteproduct);
  
  
  router.get("/updatepoint", (req, res) => {});
  
  router.get("/updatepoint/:id", (req, res) => {});
  
  router.post("/updatepoint", [body('name').exists().isString(),
  body('description').exists().isString(),
  body('updateId').exists().isString()],
  (req, res) => {});
  
  router.put("/updatepoint/:id",[body('name').optional().isString(),
  body('description').optional().isString()], (req, res) => {});
  
  router.delete("/updatepoint/:id", (req, res) => {});
  
  export default router;