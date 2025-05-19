import { Employee } from "../models/employee.model";
import express from 'express';
import { Manager } from "../models/manager.model";
const router=express.Router();

router.post("/employee",async(req,res)=>{
    try{
        const result=await Employee.create(req.body);
        res.status(201).send("Employee added succesfully");
    }catch(error){
        console.log(error);
        res.status(401).send("Error Occurred");
    }
});

router.get("/employee",async(req,res)=>{
    try{
        const result=await Employee.findAll();
        res.status(201).json(result);
    }catch(error){
        console.log(error);
        res.status(401).json({message:"Error Occured"});
    }
});

router.get("/employee/:username",async(req,res)=>{
    try{
        const result=await Employee.findByPk(req.params.username);
        res.status(201).json(result);
    }catch(error){
        console.log(error);
        res.status(401).json("Error Occurred");
    }
});

router.put("/employee/:username",async(req,res)=>{
    try{
        const result=await Employee.findByPk(req.params.username);
        if(!result){
            res.status(401).json("User not found");
        }
        await result?.update(req.body);
        res.json(result);
    }catch(error){
        console.log(error);
        res.status(401).send("Error Occurred");
    }
});

router.delete("/employee/:username",async(req,res)=>{
    try{
        const result=await Employee.findByPk(req.params.username);
        if(!result){
            res.status(401).json("user not found");
        }
        await result?.destroy();
        res.json("Deleted Successfully");
    }catch(error){
        console.log(error);
        res.status(401).json("Error Occured");
    }
});

router.get("/oneemployee/:username",async(req,res)=>{
    try {
        const result=await Employee.findOne({
            where:{username:req.params.username},
            include:{
                model:Manager,
                attributes:["task"]
            }
        });
        if(!result){
            res.status(401).json("User not found");
        }
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(401).json("Error Occurred");
    }
});
export default router;