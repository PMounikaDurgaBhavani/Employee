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
const manager_model_1 = require("../models/manager.model");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/manager", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield manager_model_1.Manager.create(req.body);
        res.status(201).json("Added Task succesfully");
    }
    catch (error) {
        res.status(401).json("Error Occurred");
    }
}));
router.get("/manager", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield manager_model_1.Manager.findAll();
        res.status(201).json(result);
    }
    catch (error) {
        res.status(401).json("Error Occured");
    }
}));
router.get("/manager/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield manager_model_1.Manager.findByPk(req.params.id);
        if (!result) {
            res.status(401).json("User not found");
        }
        res.status(201).json(result);
    }
    catch (error) {
        res.status(401).json("Error Occurred");
    }
}));
router.put("/manager/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield manager_model_1.Manager.findByPk(req.params.id);
        if (!result) {
            res.status(401).json("User not found");
        }
        yield (result === null || result === void 0 ? void 0 : result.update(req.body));
        res.status(201).json(result);
    }
    catch (error) {
        res.status(401).json("Error Occured");
    }
}));
router.delete("/manager/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield manager_model_1.Manager.findByPk(req.params.id);
        if (!result) {
            res.status(401).json("User not found");
        }
        yield (result === null || result === void 0 ? void 0 : result.destroy());
        res.status(201).json("Deleted Successfully");
    }
    catch (error) {
        res.status(401).json("Error Occured");
    }
}));
exports.default = router;
