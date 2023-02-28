const table = document.querySelector('table')
const form = document.querySelector('form')
const reset = document.querySelector('#reset')
const searchBtn = document.querySelector('#search_btn')
const resultTxt = document.querySelector('#result_txt')


const cars = []

function Car(licence, maker, model, owner, price, color){
this.carLicence = licence;
this.carMaker = maker;
this.carModel = model;
this.carOwner = owner;
this.carPrice = price;
this.carColor = color;
}

const car1 = new Car('li', 'mk', 'mode', 'ow', 'pri', 'col')

function addCar(){
  const licenceInput = document.querySelector('#licence').value
  const makerInput = document.querySelector('#maker').value
  const modelInput = document.querySelector('#model').value
  const ownerInput = document.querySelector('#owner').value
  const priceInput = document.querySelector('#price').value
  const colorInput = document.querySelector('#color').value
 const newCar = new Car(licenceInput, makerInput, modelInput, ownerInput, priceInput, colorInput)
cars.push(newCar)
 renderCar(newCar)
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
</tr>`  
table.insertAdjacentHTML('beforeend', html)
}

function getCarByLicence() {
  const searchLicence = document.querySelector('#searchLicence').value
for (const car of cars) {
  if (car.carLicence === searchLicence) {
    const txt = `Brand: ${car.carMaker}, Model: ${car.carModel}, Owner: ${car.carOwner}`
    resultTxt.textContent = txt
    return
   }
   else {
    resultTxt.textContent = 'Did not find the car. Try again!!!!'
   }
}


}

document.querySelector('#add_car').addEventListener('click', addCar)
reset.addEventListener('click', () => form.reset())
searchBtn.addEventListener('click', getCarByLicence)
