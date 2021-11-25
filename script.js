const cardsContainer = document.getElementById('cards-container');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const current = document.getElementById('current');
const show = document.getElementById('show');
const hide = document.getElementById('hide');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const addCard = document.getElementById('add-card');
const clear = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const cardsArray = [];
const cardsData = getCardsData();
let currentActiveCard = 0;
function createCards() {
     cardsData.forEach((data,index) => createCard(data,index));
}
function createCard(data,index){
     const card = document.createElement('div');
     card.classList.add('card');
     if (index === 0) {
          card.classList.add('active');
     }
     card.innerHTML = `
          <div class="inner-card">
               <div class="inner-card-front"><p>${data.questionElement}</p></div>
               <div class="inner-card-back"><p>${data.answerElement}</p></div>
          </div>
     `;
     card.addEventListener('click',() => card.classList.toggle('show-answer'));
     cardsArray.push(card);
     cardsContainer.appendChild(card);
     updateCurrentText();
}
function updateCurrentText(){
     current.innerText = `${currentActiveCard + 1} / ${cardsArray.length}`;
}
function getCardsData(){
     const cards = JSON.parse(localStorage.getItem('cards'));
     return cards === null ? [] : cards;
}
function setCardsData(cards){
     localStorage.setItem('cards',JSON.stringify(cards));
     window.location.reload();
}
createCards();
previous.addEventListener('click',() => {
     cardsArray[currentActiveCard].className = 'card right';
     currentActiveCard = currentActiveCard - 1;
     if(currentActiveCard < 0){
          currentActiveCard = 0;
     }
     cardsArray[currentActiveCard].className = 'card active';
     updateCurrentText();
});
next.addEventListener('click',() => {
     cardsArray[currentActiveCard].className = 'card left';
     currentActiveCard = currentActiveCard + 1;
     if(currentActiveCard > cardsArray.length - 1){
          currentActiveCard = cardsArray.length - 1;
     }
     cardsArray[currentActiveCard].className = 'card active';
     updateCurrentText();
});
show.addEventListener('click',() => addContainer.classList.add('show'));
hide.addEventListener('click',() => addContainer.classList.remove('show'));
addCard.addEventListener('click', () => {
     const questionElement = question.value;
     const answerElement = answer.value;
     if(questionElement.trim() && answerElement.trim()){
          const newCard = {questionElement,answerElement};
          createCard(newCard);
          question.value = "";
          answer.value = "";
          addContainer.classList.remove('show');
          cardsData.push(newCard);
          setCardsData(cardsData);
     }
});
clear.addEventListener('click',() => {
     localStorage.clear();
     cardsContainer.innerHTML = '';
     window.location.reload();
});