import express, { Request, Response } from "express";
import { Employee, Manager } from "../models";
import checkEmployee from "../middleware/employeeauth";
import {checkemail,checkusername} from "../controllers/checkEmail";

const router = express.Router();

router.post("/employee",checkEmployee,checkemail,checkusername, async (req: Request, res: Response) => {
  try {
    await Employee.create(req.body);
    res.status(201).send("Employee added succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Occurred");
  }
});

router.get("/employee", async (req, res) => {
  try {
    const result = await Employee.findAll();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Error Occured" });
  }
});

router.get("/employee/:username", async (req, res) => {
  try {
    const result = await Employee.findByPk(req.params.username);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(401).json("Error Occurred");
  }
});

router.put("/employee/:username",checkemail, async (req, res) => {
  try {
    const result = await Employee.findByPk(req.params.username);
    if (!result) {
      res.status(401).json("User not found");
      return;
    }
    await result?.update(req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(401).send("Error Occurred");
  }
});

router.delete("/employee/:username", async (req, res) => {
  try {
    const result = await Employee.findByPk(req.params.username);
    if (!result) {
      res.status(401).json("user not found");
      return;
    }
    await result?.destroy();
    res.json("Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(401).json("Error Occured");
  }
});

router.get("/oneemployee/:username", async (req, res) => {
  try {
    const result = await Employee.findOne({
      where: { username: req.params.username },
      include: {
        model: Manager,
        attributes: ["task"],
      },
    });
    if (!result) {
      res.status(401).json("User not found");
      return;
    }
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(401).json("Error Occurred");
  }
});
export default router;
