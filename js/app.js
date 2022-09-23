const cardHolderElement = document.querySelector('.card-holder')

class DrinkFactory{
    constructor(drinkName, drinkId, drinkImg, drinkAlcoholic){
        this.drinkName = drinkName; 
        this.drinkId = drinkId; 
        this.drinkImgUrl = drinkImg; 
        this.drinkAlcoholic = drinkAlcoholic;
    }
    createCard(){
        const cardHolder = document.createElement('div')

        cardHolder.classList.add('card')

        const drinkNameHeading = document.createElement('h3')
        drinkNameHeading.textContent = String(this.drinkName);
        cardHolder.appendChild(drinkNameHeading)

        const drinkImage = document.createElement('img')
        drinkImage.src = this.drinkImgUrl;
        cardHolder.appendChild(drinkImage)

        const drinkType = document.createElement('span')
        drinkType.classList.add('drink-type')
        drinkType.textContent = String(this.drinkAlcoholic);
        cardHolder.appendChild(drinkType) 

        return cardHolder;
    }
}


fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
.then(res => res.json())
.then(obj => {
    for(let i = 0; i < 4; i++){
        
        const randOffset = Math.floor(Math.random() * 20)
        const drink = obj.drinks[i + randOffset]
        const drinkObj = new DrinkFactory(drink.strDrink, drink.idDrink, drink.strDrinkThumb, drink.strAlcoholic)

        const cardElement = drinkObj.createCard();

        cardHolderElement.appendChild(cardElement)
    }
})