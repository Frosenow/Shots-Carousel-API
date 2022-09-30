const cardHolderElement = document.querySelector('.card-holder')
const formElement = document.querySelector('form')


const Observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }    
    })
})

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
        cardHolder.classList.add('hidden')

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
        Observer.observe(cardHolder) 

        return cardHolder;
    }
}

function getAllDrinks(){
    const drinksArr = []; 

    const alcoholicEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
    const nonAlcoholicEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';

    Promise.all([fetch(alcoholicEndpoint), fetch(nonAlcoholicEndpoint)])
    .then(res => Promise.all(res.map(promise => promise.json())))
    .then(data => {
        drinksArr.push(...data[0].drinks)
        drinksArr.push(...data[1].drinks)
    })

    return drinksArr
}

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
.then(res => res.json())
.then(obj => {
    const randOffsetArr = [];
    for(let i = 0; i < 4; i++){
        let randomOffset = Math.floor(Math.random() * 20)
        while(randOffsetArr.includes(randomOffset)){
            randomOffset = Math.floor(Math.random() * 20)
        }
        randOffsetArr.push(randomOffset);
        const drink = obj.drinks[i + randomOffset]
        const drinkObj = new DrinkFactory(drink.strDrink, drink.idDrink, drink.strDrinkThumb, drink.strAlcoholic)

        const cardElement = drinkObj.createCard();

        cardHolderElement.appendChild(cardElement)
    }
})

formElement.addEventListener('submit', formValidation)
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const messageInput = document.querySelector('#message')
const successInfo = document.querySelector('#success-btn')
const errorNodes = document.querySelectorAll('.error')


function formValidation(){

    clearErrorMessage();
    let errorFlag = false; 

    if(nameInput.value.length < 1){
        errorNodes[0].innerText = 'Name cannot be blank'
        errorFlag = true; 
    }

    if(!emailIsValid(emailInput.value)){
        errorNodes[1].innerText = 'Invalid email address'
        errorFlag = true; 
    }

    if(messageInput.value.length < 1){
        errorNodes[2].innerText = 'Please enter message'
        errorFlag = true; 
    }

    if(!errorFlag){
        successInfo.innerText = 'Thank you!'
    }
}

function clearErrorMessage(){
    errorNodes.forEach(errorMsg => errorMsg.innerText = '')
}

function emailIsValid(email){
    const regexEmailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regexEmailPattern.test(email);
}

