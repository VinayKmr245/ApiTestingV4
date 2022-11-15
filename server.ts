import { createNewUser, signin } from './Handlers/user';
import express from 'express'
import morgan from 'morgan'
import router from './router'
import {secure} from "./modules/Auth"
import { error } from 'console';
const app=express();

app.use("/",(req,res,next)=>{
    console.log(req.body);
    req.addparams="Triggered like hell"
    next();
}) 

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Handling synchronous errors
app.get("/",(req,res)=>{
    // console.log(req.addedparams)
    res.send({message:"Hello World"})
})

//Handling Asynchronous errors

//testing errors

// app.get("/error",(req,res,next)=>{
//     setTimeout(()=>{next(new Error("This is asynchronous error over here"))},1000)
// })

// app.use("/",(err,req,res,next)=>{
//     res.json({message:"Synchronous error raa babu"})
// })

// app.use("/error",(err,req,res,next)=>{
//     res.json({message:"Asynchronous error raa babu"})
// })


app.use("/api",secure,router)//Router

app.post("/user",createNewUser)

app.post("/signin",signin)
app.listen(3000,()=>{
    console.log("Server Started at 3000")
});
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxN2IzZTY2LTgyOWEtNDE3My05ZmM0LTU0NjEyMjg0N2YxOCIsInVzZXJuYW1lIjoiVmluYXkiLCJpYXQiOjE2Njg0OTUzNzV9.2ilGcu_zmA86W2bjrfHzoT09DKG_4ek-8dqpu3Vz-fQ
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxN2IzZTY2LTgyOWEtNDE3My05ZmM0LTU0NjEyMjg0N2YxOCIsInVzZXJuYW1lIjoiVmluYXkiLCJpYXQiOjE2Njg0OTU0OTZ9.WZAKkwVNWbfrTC6ijLpYofKuHyPQpzSYW9vnajRNh6c