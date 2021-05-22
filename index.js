let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function startGame() {
  score = 0
  setGameTime()
  disable($gameTime)
  show($timeHeader)
  hide($resultHeader)
  hide($start)
  $game.style.backgroundColor = '#fff'
  isGameStarted = true

  let interval = setInterval(function() {
    let time = parseFloat($time.textContent)
  
    if (time <= 0) {
      endGame()
      clearInterval(interval)
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }

  }, 100)

  renderBox() 
}

function endGame() {
  isGameStarted = false
  show($start)
  hide($timeHeader)
  show($resultHeader)
  active($gameTime)
  $game.style.backgroundColor = '#ccc'
  $game.innerHTML = ''

  $result.textContent = score
}

function disable($el) {
  $el.setAttribute('disabled', 'true')
}

function active($el) {
  $el.removeAttribute('disabled')
}

function setGameTime() {
  let time = +$gameTime.value
  
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return 
  }

  if(event.target.dataset.box) {
    renderBox()
    score++
  }
}

function renderBox() {
  let box = document.createElement('div')
  let boxSize = getRandom(30, 100)
  let gameSize = $game.getBoundingClientRect()
  let maxTop = gameSize.height - boxSize
  let maxLeft = gameSize.width - boxSize
  let randomColor = getRandomColor()

  $game.innerHTML = ''

  box.style.width = box.style.height = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.backgroundColor = randomColor
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', true)

  $game.insertAdjacentElement("afterbegin", box)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max-min) + min)
}

function getRandomColor() {
  let color = 'rgb('+ getRandom(0, 255)+', '+ getRandom(0, 255)+', '+ getRandom(0, 255)+')'
  return color
}