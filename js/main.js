document.querySelector('button').addEventListener('click', getFetch)
const sliderSection = document.querySelector('.slider')



function getFetch(){
  // Cleaning slider section by deleting old elements
  let drinkDivs = document.querySelectorAll('.slider div')
  drinkDivs.forEach(divChilde => sliderSection.removeChild(divChilde))

  const choice = document.querySelector('input').value.split(' ').join(' ')
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + choice
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    const drinkImages = data.drinks.map(drink => {

      const drinkSection = document.createElement('div'); 
      
      const drinkName = drink.strDrink; 
      const drinkHeader = document.createElement('h1')
      drinkHeader.innerText = drinkName; 

      const imgUrl = drink.strDrinkThumb;
      const imgElement = document.createElement('img')
      imgElement.src = imgUrl; 

      const instructionText = drink.strInstructions; 
      const instructionElement = document.createElement('p');
      instructionElement.innerText = instructionText;

      sliderSection.appendChild(drinkSection)
      drinkSection.appendChild(drinkHeader)
      drinkSection.appendChild(imgElement)
      drinkSection.appendChild(instructionElement)
    })
})
.catch(err => {
    console.log(`error ${err}: Drink not found`)
    alert('Drink not found')
});
}


