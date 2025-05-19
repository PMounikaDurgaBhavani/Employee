import { Employee } from "../models/employee.model";
import { Manager } from "../models/manager.model";
import express from "express";
const router = express.Router();

router.post("/manager", async (req, res) => {
  try {
    const inputfields = ["username", "task"];
    const fields = Object.keys(Manager.getAttributes());
    const invalid = Object.keys(req.body).filter((f) => !fields.includes(f));
    if (invalid.length > 0) {
      res.status(401).json("Invalid Fields");
      return;
    }
    const result = await Manager.create(req.body, { fields: inputfields });
    res.status(201).json("Added Task succesfully");
  } catch (error) {
    res.status(401).json("Error Occurred");
  }
});

router.get("/manager", async (req, res) => {
  try {
    const result = await Manager.findAll();
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json("Error Occured");
  }
});

router.get("/manager/:id", async (req, res) => {
  try {
    const result = await Manager.findByPk(req.params.id);
    if (!result) {
      res.status(401).json("User not found");
      return;
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json("Error Occurred");
  }
});

router.put("/manager/:id", async (req, res) => {
  try {
    const result = await Manager.findByPk(req.params.id);
    if (!result) {
      res.status(401).json("User not found");
      return;
    }
    await result?.update(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json("Error Occured");
  }
});

router.delete("/manager/:id", async (req, res) => {
  try {
    const result = await Manager.findByPk(req.params.id);
    if (!result) {
      res.status(401).json("User not found");
      return;
    }
    await result?.destroy();
    res.status(201).json("Deleted Successfully");
  } catch (error) {
    res.status(401).json("Error Occured");
  }
});

router.get("/allmanager", async (req, res) => {
  try {
    const result = await Manager.findAll({
      include: {
        model: Employee,
        attributes: ["username", "email", "salary"],
      },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json("Error Occured");
  }
});

export default router;
