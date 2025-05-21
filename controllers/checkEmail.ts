import { Employee,Manager } from "../models";
import {Request,Response,NextFunction} from "express";

const checkemail=async(req:Request,res:Response,next:NextFunction)=>{
    const email=req.body.email;
    try {
        const result=await Employee.findOne({
            where:{email}
        });
        if(result){
            res.status(401).json("Email already Exits");
            return;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json("Error Occured");
    }
}

const checkusername=async(req:Request,res:Response,next:NextFunction)=>{
    const username=req.body.username;
    try {
        const result=await Employee.findOne({
            where:{username}
        });
        if(result){
            res.status(401).json("Username already Exits");
            return;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json("Error Occured");
    }
}

export {checkemail,checkusername};