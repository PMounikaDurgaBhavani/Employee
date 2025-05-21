import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const checkEmployee = [
  body("username")
    .notEmpty()
    .withMessage("Username should not be empty")
    .isAlphanumeric()
    .withMessage("Username should be in alphanumeric"),
  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 6 })
    .withMessage("Min length is 6"),
  body("email")
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Should be valid email"),
  body("salary")
    .notEmpty()
    .withMessage("Should not be empty")
    .isNumeric()
    .withMessage("Enter only numbers"),
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
      return;
    }
    next();
  },
];



export default checkEmployee;
