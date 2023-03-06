const table = document.querySelector("table");
const form = document.querySelector("form");
const reset = document.querySelector("#reset");
const searchBtn = document.querySelector("#search_btn");
const btnAddCar = document.querySelector("#add_car");
const resultTxt = document.querySelector("#result_txt");

function Car(licence, maker, model, owner, price, color) {
  this.carLicence = licence;
  this.carMaker = maker;
  this.carModel = model;
  this.carOwner = owner;
  this.carPrice = price;
  this.carColor = color;
  this.discount = function () {
    const price = Number(this.carPrice);
    if (price > 20000) return price * 0.75;
    else if (price < 5000) return price * 0.9;
    else return price * 0.85;
  };
}

function makeCarObj() {
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
  newCar["carOfferPrice"] = newCar.discount();
  return newCar;
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
    if (data.car) {
      const carMaker = document.querySelector("#carMaker");
      const carModel = document.querySelector("#carModel");
      const carOwner = document.querySelector("#carOwner");
      const carOfferPrice = document.querySelector("#carOfferPrice");
    
      carMaker.textContent = data.car.carMaker;
      carModel.textContent = data.car.carModel;
      carOwner.textContent = data.car.carOwner;
      carOfferPrice.textContent = data.car.carOfferPrice;
    }
  } else {
    resultTxt.textContent = "Did not find the car. Try again!!!!";
  }
}
// fetch post new car objects to server
async function sendNewData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

// all data from database and render
getAllData("http://localhost:3000/all");

// send new car object to server
function addCar() {
  const newCar = makeCarObj();
  console.log("inside addCar:", newCar);
  const postUrl = "http://localhost:3000/addNew";
  sendNewData(postUrl, newCar).then((res) => console.log(res));
}

// Event listener and hander
btnAddCar.addEventListener("click", addCar);
reset.addEventListener("click", () => form.reset());
searchBtn.addEventListener("click", getCarByLicence);
