const table = document.querySelector("table");
const form = document.querySelector("form");
const reset = document.querySelector("#reset");
const searchBtn = document.querySelector("#search_btn");
const resultTxt = document.querySelector("#result_txt");

const cars = [];

function Car(licence, maker, model, owner, price, color) {
  this.carLicence = licence;
  this.carMaker = maker;
  this.carModel = model;
  this.carOwner = owner;
  this.carPrice = price;
  this.carColor = color;
}

const car1 = new Car("li", "mk", "mode", "ow", "pri", "col");

function addCar() {
  const licenceInput = document.querySelector("#licence").value;
  const makerInput = document.querySelector("#maker").value;
  const modelInput = document.querySelector("#model").value;
  const ownerInput = document.querySelector("#owner").value;
  const priceInput = document.querySelector("#price").value;
  const colorInput = document.querySelector("#color").value;
  const newCar = new Car(
    licenceInput,
    makerInput,
    modelInput,
    ownerInput,
    priceInput,
    colorInput
  );
}
function renderCar(car) {
  const html = `        
<tr>
<td>${car.carLicence}</td>
<td>${car.carMaker}</td>
<td>${car.carModel}</td>
<td>${car.carOwner}</td>
<td>${car.carPrice}</td>
<td>${car.carColor}</td>
</tr>`;
  table.insertAdjacentHTML("beforeend", html);
}

function getCarByLicence() {
  const licNum = document.querySelector("#searchLicence").value;
  getCarbyKeyValue("http://localhost:3000", "licence", licNum);
  // for (const car of cars) {
  //   if (car.carLicence === searchLicence) {
  //     const txt = `Brand: ${car.carMaker}, Model: ${car.carModel}, Owner: ${car.carOwner}`;
  //     resultTxt.textContent = txt;
  //     return;
  //   } else {
  //     resultTxt.textContent = "Did not find the car. Try again!!!!";
  //   }
  // }
}

// fetch functions
// fetch all data from json via server and render data
async function getAllData(url) {
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  data.forEach((car) => renderCar(car));
}
// search car by key valu pair
async function getCarbyKeyValue(url, key, value) {
  const postUrl = `${url}/${key}/${value}`;
  const response = await fetch(postUrl, { mode: "cors" });
  const data = await response.json();
  if (data.car) {
    const txt = `Brand: ${data.car.carMaker}, Model: ${data.car.carModel}, Owner: ${data.car.carOwner}`;
    resultTxt.textContent = txt;
  } else {
    resultTxt.textContent = "Did not find the car. Try again!!!!";
  }
}

// all data from database and render
getAllData("http://localhost:3000/all");

document.querySelector("#add_car").addEventListener("click", addCar);
reset.addEventListener("click", () => form.reset());
searchBtn.addEventListener("click", getCarByLicence);
