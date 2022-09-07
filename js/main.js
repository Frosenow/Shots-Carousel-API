document.querySelector('button').addEventListener('click', getFetch)
const sliderSection = document.querySelector('.slider')

const buttons = document.querySelectorAll('[data-carousel-button]')


function getFetch(){
  // Cleaning slider section by deleting old elements
  let drinkDivs = document.querySelectorAll('.slider div')
  drinkDivs.forEach(divChilde => sliderSection.removeChild(divChilde))

  buttons.forEach(button => button.classList.remove('hidden'))

  const choice = document.querySelector('input').value.split(' ').join(' ')
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + choice
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    const drinkImages = data.drinks.map((drink, index) => {

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
      if(index === 0)
        drinkSection.dataset.active = ''

    })
})
.catch(err => {
    console.log(`error ${err}: Drink not found`)
    alert('Drink not found')
});
}

buttons.forEach(button => {addEventListener('click', () => {   
  const offset = button.dataset.carouselButton === 'next' ? 1 : -1; 

  const slides = button.closest('[data-carousel]').querySelectorAll('div')

  const activeSlide = button.closest('[data-carousel]').querySelector('[data-active]')


  let newIndex = [...slides].indexOf(activeSlide) + offset; 
  console.log(offset, 'offset', newIndex, 'newIndex')
  if(newIndex < 0) newIndex = slides.length - 1; 
  if(newIndex >= slides.length) newIndex = 0; 

  slides[newIndex].dataset.active = "";
  delete activeSlide.dataset.active; })})


