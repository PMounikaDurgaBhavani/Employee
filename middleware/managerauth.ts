import {Request,Response,NextFunction} from "express";
import {body,validationResult} from "express-validator";

const checkManager=[
    body("username")
    .notEmpty().withMessage("Username should not be empty")
    .isAlphanumeric().withMessage("Username should be in alphanumeric"),
    body("task")
    .notEmpty().withMessage("Task should not be empty"),
    (req:Request,res:Response,next:NextFunction)=>{
        const error=validationResult(req);
        if(!error.isEmpty()){
            res.status(400).json({error:error.array()});
        }
        next();
    },
];

export default checkManager;