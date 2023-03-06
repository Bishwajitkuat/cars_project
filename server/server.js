const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

// USE
app.use(cors());
app.use(express.json());
app.use(express.static("client"));

// GET REQUEST
// send all data from json file as list
app.get("/all", (req, res) => {
  res.send(allData);
});

// filtered data by a licenc number and send the first item as an object
app.get("/licence/:licenceNum", (req, res) => {
  const licenc = req.params.licenceNum;
  const searchResult = allData.filter((item) => {
    return item.carLicence === licenc;
  });
  res.send({ status: 200, car: searchResult[0] });
});

// POST REQUEST
// receive new object add to corrent list and rewrite jsone file
app.post("/addNew", (req, res) => {
  const licence = req.body.carLicence;
  const alreadyExist = allData.filter((item) => item.carLicence === licence);
  if (alreadyExist.length) {
    res.send({
      status: `Licence number ${licence} already exits in the database! New data has not been added!`,
    });
  } else {
    allData.push(req.body);
    writeToJson("./cars.json", allData);
    res.send({ status: "Car data successfully stored in the database" });
  }
});

//Listening
app.listen(3000, () => console.log("Listening at port 3000"));

//STORAGE
const allData = readFromJson("./cars.json");
// read data from json file
function readFromJson(address) {
  try {
    let rawData = fs.readFileSync(address, "utf-8");
    const data = JSON.parse(rawData);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// write data to json file
function writeToJson(address, obj) {
  fs.writeFileSync(address, JSON.stringify(obj, null, 2), (err) => {
    if (err) console.log(err);
    else console.log("data writting successfull");
  });
}
