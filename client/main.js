const table = document.querySelector("table");
const form = document.querySelector("form");
const reset = document.querySelector("#reset");
const searchBtn = document.querySelector("#search_btn");
const btnAddCar = document.querySelector("#add_car");
const searchResultOutput = document.querySelector(".searchResultOutput");

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

function renderSearchResult(car, licNum) {
  let html;
  // removing the last search result from the display
  searchResultOutput.innerHTML = "";
  // if licence nuber found, a car object will be retured else car will be undefined
  if (car) {
    const oldPrice = Number(car.carPrice);
    const discountAmount = oldPrice - car.carOfferPrice;
    const discount = ((discountAmount / oldPrice) * 100).toFixed(0);
    html = `<ul>
      <li>Brand: ${car.carMaker}</li>
      <li>Model: ${car.carModel}</li>
      <li>Owner: ${car.carOwner}</li>
      <li>Old price: <span id ="old_price">${car.carPrice}€</span></li>
      <li>New price: <span id ="new_price">${car.carOfferPrice}€</span></li>
      <li>Discounte: ${discount}%</li>
      <li>Discounte: ${discountAmount}€ </li>
    </ul>`;
  } else {
    html = `<p>Car with licence number "${licNum} " does not exits in this database.</p>`;
  }
  searchResultOutput.insertAdjacentHTML("beforeend", html);
}

function getCarByLicence() {
  const licNum = document.querySelector("#searchLicence").value;
  getCarbyKeyValue("http://localhost:3000", "licence", licNum);
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
  renderSearchResult(data.car, value);
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
  const postUrl = "http://localhost:3000/addNew";
  // res will be alart to the user.
  sendNewData(postUrl, newCar).then((res) => alert(res.status));
}

// Event listener and hander
btnAddCar.addEventListener("click", addCar);
reset.addEventListener("click", () => form.reset());
searchBtn.addEventListener("click", getCarByLicence);
