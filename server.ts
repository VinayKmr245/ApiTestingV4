import { createNewUser, signin } from './Handlers/user';
import express from 'express'
import morgan from 'morgan'
import router from './router'
import {secure} from "./modules/Auth"
const app=express();

app.use("/",(req,res,next)=>{
    console.log(req.body);
    req.addparams="Triggered like hell"
    next();
}) 

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    // console.log(req.addedparams)
    res.send({message:"Hello World"})
})
app.use("/api",secure,router)//Router

app.post("/user",createNewUser)

app.post("/signin",signin)
app.listen(3000,()=>{
    console.log("Server Started at 3000")
});

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY1M2Q3MTIyLTI5ODQtNGVjNS1iN2JmLWEwZWFlNDJjMTIzZCIsInVzZXJuYW1lIjoidmluYXkiLCJpYXQiOjE2Njg0MjA4MDd9.OX8WHXPZVkrujjc-QWAnyLIldetzNb72Zo1WKmyx6D4"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY1M2Q3MTIyLTI5ODQtNGVjNS1iN2JmLWEwZWFlNDJjMTIzZCIsInVzZXJuYW1lIjoidmluYXkiLCJpYXQiOjE2Njg0MjA4Mzd9.GtbVFdOeQlsJzSGWEJpzmJsv45D-z1_EcRcIzEfIvzE"