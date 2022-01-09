import axios from "axios";
import connect from "../database/connect";

const connection = connect();

const myList = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const functionLoadData = async () => {
  const deleteQuery = "DELETE FROM Characters";
  await connection.query(deleteQuery);
  myList.forEach(async (item) => {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${item}`);
    const { id, name, location_area_encounters, weight } = data.data;
    const query = `INSERT INTO Characters (id, name, species, image) VALUES (${id}, '${name}', '${weight}', '${location_area_encounters}');`;
    await connection.query(query);
  });
};

export default functionLoadData;
