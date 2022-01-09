const axios = require("axios");
const cheerio = require("cheerio");

const getFacultyData = async () => {
  const url = `https://scholar.google.com/citations?hl=en&user=UErW458AAAAJYU`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  //   const hindex = $("#gsc_rsb_st").text();
  const hindex = $(".gsc_rsb_sc1").text();
  console.log(hindex);
  let facultyData = [];
  $(".gsc_rsb_std").each(function (i, elem) {
    let value = $(this).text();
    console.log(value);
    facultyData.push(value);
  });
  console.log(facultyData);
};

getFacultyData();
