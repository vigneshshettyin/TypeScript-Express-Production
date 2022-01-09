import express from "express";
import { getAllCharacters, getCharacterById } from "../controller/character";
const characterRouter = express.Router();

characterRouter.get("/characters/", getAllCharacters);
characterRouter.get("/characters/:id", getCharacterById);

export default characterRouter;
