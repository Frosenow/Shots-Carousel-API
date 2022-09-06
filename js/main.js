document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){

  const choice = document.querySelector('input').value.split(' ').join(' ')
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + choice
  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    const drinkImages = data.drinks.map(drink => {
      let imgElement = document.createElement('img')
      const imgUrl = drink.strDrinkThumb;
      imgElement.src = imgUrl; 
      document.querySelector('.slider').appendChild(imgElement)
      
    })
})
.catch(err => {
    console.log(`error ${err}`)
});
}


