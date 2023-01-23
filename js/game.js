const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')
const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy'
]
const createElement = (tag, className) => {
  const element = document.createElement(tag)
  element.className = className
  return element
}
let firstCard = ''
let secondCard = ''
const checkEndGame = () => {
  const disableCards = document.querySelectorAll('.disable-card')
  if(disableCards.length===20){
    alert(`Parabéns, ${spanPlayer}. Você Ganhou! Seu tempo foi de ${timer.innerHTML} segundos`)
    clearInterval(this.loop)
  }
}
const checkCards = () => {
const firstChac = firstCard.getAttribute('data-character')
const secondChac = secondCard.getAttribute('data-character')
if(firstChac===secondChac){
  firstCard.firstChild.classList.add('disable-card')
  secondCard.firstChild.classList.add('disable-card')
  firstCard=''
  secondCard=''
  checkEndGame()
}else{
  setTimeout(()=>{
  firstCard.classList.remove('reveal-card')
  secondCard.classList.remove('reveal-card')
  firstCard=''
  secondCard=''
  },500)
}
}
const revealCard = ({target}) =>{
  if (target.parentNode.className.includes('reveal-card')){
    return
  }

  if(firstCard === ''){
    target.parentNode.classList.add('reveal-card')
    firstCard = target.parentNode
  }
  else if (secondCard === ''){
    target.parentNode.classList.add('reveal-card')
    secondCard = target.parentNode

    checkCards()
  }
  
}

const createCard = (characters) => {
  const card = createElement('div', 'card')
  const front = createElement('div', 'front face')
  const back = createElement('div', 'back face')
  front.style.backgroundImage = `url('../images/${characters}.png')`
  card.appendChild(front)
  card.appendChild(back)
  card.addEventListener('click', revealCard)
  card.setAttribute('data-character', characters)
  return card

}
const loadGame = ()=> {
  const duplicateCharacters = [...characters,...characters]
  const shuffledArray = duplicateCharacters.sort(()=>Math.random()-0.5)
  shuffledArray.forEach((characters) => {
    const card = createCard(characters)
    grid.appendChild(card)
  })
}
const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML
    timer.innerHTML = currentTime+1
  }, 1000)
}
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('name') + ' >>'
  startTimer()
  loadGame()
}

