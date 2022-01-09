"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var character_1 = require("../controller/character");
var characterRouter = express_1.default.Router();
characterRouter.get("/characters/", character_1.getAllCharacters);
characterRouter.get("/characters/:id", character_1.getCharacterById);
exports.default = characterRouter;
//# sourceMappingURL=character.js.map