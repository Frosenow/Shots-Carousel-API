document.querySelector('button').addEventListener('click', getFetch)
const sliderSection = document.querySelector('.slider')

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?')
.then(res => res.json())
.then(data => console.log(data))

function getFetch(){
  // Cleaning slider section by deleting old elements
  let drinkDivs = document.querySelectorAll('.slider div')
  drinkDivs.forEach(divChilde => sliderSection.removeChild(divChilde))
  
  const choice = document.querySelector('input').value.split(' ').join(' ') //To use query selector with white spaces
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + choice
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    //Create own section inside slider for each drink
    const drinkImages = data.drinks.map((drink, index) => {
    
    //Creating a container for drink section
    const drinkSection = document.createElement('div'); 
      
    //Creating h1 tag from fetched data
    const drinkName = drink.strDrink; 
    const drinkHeader = document.createElement('h1')
    drinkHeader.innerText = drinkName; 

    //Creating img tag from fetched data
    const imgUrl = drink.strDrinkThumb;
    const imgElement = document.createElement('img')
    imgElement.src = imgUrl; 

    //Getting navbar template from html file
    const navBar = document.querySelector('template')
    const nav = navBar.content.cloneNode(true)

    //Creating paragraph tag from fetched data
    const instructionText = drink.strInstructions; 
    const instructionElement = document.createElement('p');
    instructionElement.innerText = instructionText;
    instructionElement.classList.add('paragraphStyle')

    //Appending all tags as a child of drinkSection element
    sliderSection.appendChild(drinkSection)
    drinkSection.appendChild(drinkHeader)
    drinkSection.appendChild(imgElement)
    drinkSection.appendChild(nav)
    drinkSection.appendChild(instructionElement)
    if(index === 0) //Showing first drink on website
      drinkSection.classList.add('active')
    })
    const navButtons = document.querySelectorAll('[data-carousel-button]');
    navButtons.forEach(button => addEventListener('click', setOffset));   
})
.catch(err => {
    console.log(`error ${err}: Drink not found`)
    alert('Drink not found')
});
}


function setOffset(button){
  //Checking if the clicked target is actually the button 
  if(!(button.target.dataset.carouselButton === 'prev' || button.target.dataset.carouselButton === 'next')) return; 
  
  //Setting offset based on the clicked button
  const offset = button.path[0].dataset.carouselButton === 'next' ? 1 : -1; 
  const slides = button.path[0].closest('[data-carousel]').querySelectorAll('div')
  const activeSlide = button.path[0].closest('[data-carousel').querySelector('div.active')


  let newIndex = [...slides].indexOf(activeSlide) + offset; 
  if(newIndex < 0) newIndex = slides.length - 1; 
  if(newIndex >= slides.length) newIndex = 0; 

  slides[newIndex].classList.add('active')
  activeSlide.classList.remove('active')
}
