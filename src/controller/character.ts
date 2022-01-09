import { Request, Response } from "express";
import connect from "../database/connect";
import Character from "../interface/interface";

const connection = connect();

const getAllCharacters = async (req: Request, res: Response) => {
  const query = "SELECT * FROM Characters";
  connection.query(query, (error: Error, results: [Character]) => {
    if (!!error) throw error;
    else {
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
    if (!!error) throw error;
    else {
      const returnResult = {
        data: !!results ? results : null,
        message: !!results ? "Success" : "No data found",
      };
      res.status(200).send(returnResult);
    }
  });
};

export { getAllCharacters, getCharacterById };
