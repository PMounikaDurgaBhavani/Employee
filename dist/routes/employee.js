"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_model_1 = require("../models/employee.model");
const express_1 = __importDefault(require("express"));
const manager_model_1 = require("../models/manager.model");
const router = express_1.default.Router();
router.post("/employee", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield employee_model_1.Employee.create(req.body);
        res.status(201).send("Employee added succesfully");
    }
    catch (error) {
        console.log(error);
        res.status(401).send("Error Occurred");
    }
}));
router.get("/employee", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield employee_model_1.Employee.findAll();
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Error Occured" });
    }
}));
router.get("/employee/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield employee_model_1.Employee.findByPk(req.params.username);
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(401).json("Error Occurred");
    }
}));
router.put("/employee/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield employee_model_1.Employee.findByPk(req.params.username);
        if (!result) {
            res.status(401).json("User not found");
        }
        yield (result === null || result === void 0 ? void 0 : result.update(req.body));
        res.json(result);
    }
    catch (error) {
        console.log(error);
        res.status(401).send("Error Occurred");
    }
}));
router.delete("/employee/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield employee_model_1.Employee.findByPk(req.params.username);
        if (!result) {
            res.status(401).json("user not found");
        }
        yield (result === null || result === void 0 ? void 0 : result.destroy());
        res.json("Deleted Successfully");
    }
    catch (error) {
        console.log(error);
        res.status(401).json("Error Occured");
    }
}));
router.get("/oneemployee/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield employee_model_1.Employee.findOne({
            where: { username: req.params.username },
            include: {
                model: manager_model_1.Manager,
                attributes: ["task"]
            }
        });
        if (!result) {
            res.status(401).json("User not found");
        }
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        res.status(401).json("Error Occurred");
    }
}));
exports.default = router;
