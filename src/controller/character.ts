import { Request, Response } from "express";
import customLogger from "../log/log";
import connect from "../database/connect";
import Character from "../interface/interface";

const connection = connect();

const getAllCharacters = async (req: Request, res: Response) => {
  const query = "SELECT * FROM Characters";
  connection.query(query, (error: Error, results: [Character]) => {
    if (!!error) {
      customLogger.error(error.message, {
        timestamp: new Date().toISOString(),
        level: "error",
        message: error.message,
        stack: error.stack,
      });
    } else {
      const returnResult = {
        data: !!results ? results : null,
        message: results.length > 0 ? "Success" : "No data found",
      };
      res.status(200).send(returnResult);
    }
  });
};

const getCharacterById = async (req: Request, res: Response) => {
  const query = `SELECT * FROM Characters WHERE id =${req.params.id} LIMIT 1`;
  connection.query(query, (error: Error, results: Character) => {
    if (!!error) {
      customLogger.error(error.message, {
        timestamp: new Date().toISOString(),
        level: "error",
        message: error.message,
        stack: error.stack,
      });
    } else {
      const returnResult = {
        data: !!results ? results : null,
        message: !!results ? "Success" : "No data found",
      };
      customLogger.info(returnResult);
      res.status(200).send(returnResult);
    }
  });
};

export { getAllCharacters, getCharacterById };
