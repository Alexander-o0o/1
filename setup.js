/* eslint-disable require-jsdoc */
const key = {
  ESC: 27,
  ENTER: 13,
}

const EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
]

const mapType = {
  PROPERTY: 1,
  ATTRIBUTE: 2,
  STYLE: 3,
  ADD_STYLE: 4,
}

const SETUP_WIZADR = createRandomWizard()
const SETUP_FIREBALL = { color: '#ee4830' }

main1()

function main1() {
  document.querySelector('.setup-open')
      .addEventListener('click', setupOpenClickHandler)

  document.querySelector('.setup-open-icon')
      .addEventListener('keydown', setupOpenIconKeydownHandler)

  document.querySelector('.setup')
      .addEventListener('keydown', setupKeydownHandler)

  document.querySelector('.setup-close')
      .addEventListener('click', setupCloseClickHandler)

  document.querySelector('.setup-close')
      .addEventListener('keydown', setupCloseKeydownkHandler)

  document.querySelector('.setup-submit')
      .addEventListener('click', setupSubmitClickHandler)

  document.querySelector('.setup-submit')
      .addEventListener('keydown', setupSubmitKeydownkHandler)

  document.querySelector('.setup-wizard .wizard-eyes')
      .addEventListener('click', wizardEyesClickHandler)

  document.querySelector('.setup-fireball-wrap')
      .addEventListener('click', setupFireballWrapClickHandler)
}
// реакции (начало)
function documentKeydownHandler(e) {
  switch (e.keyCode) {
    case key.ESC:
      if (document.activeElement !==
          document.querySelector('.setup-user-name')) {
        setupHide()
      }
      break
  }
}

function setupOpenClickHandler(e) {
  setupShow()
}

function setupOpenIconKeydownHandler(e) {
  switch (e.keyCode) {
    case key.ENTER:
      setupShow()
      break
  }
}

function setupKeydownHandler(e) {
  console.log('setupKeydownHandler')
}

function setupCloseClickHandler(e) {
  setupHide()
}

function setupCloseKeydownkHandler(e) {
  switch (e.keyCode) {
    case key.ENTER:
      setupHide()
      break
  }
}

function setupSubmitClickHandler(e) {
  setupDataSubmit()
}

function setupSubmitKeydownkHandler(e) {
  switch (e.keyCode) {
    case key.ENTER:
      setupDataSubmit()
      break
  }
}

function wizardEyesClickHandler(e) {
  changeWizardEyesColor()
}

function setupFireballWrapClickHandler(e) {
  changeFifeballColor()
}
// реакции (конец)

// действия (начало)
function setupShow() {
  document.querySelector('.setup').classList.remove('hidden')
  document.addEventListener('keydown', documentKeydownHandler)
  fillSetup()
}

function setupHide() {
  document.querySelector('.setup').classList.add('hidden')
  document.querySelector('.setup-open-icon').focus()
  document.removeEventListener('keydown', documentKeydownHandler)
}

function fillSetup() {
  renderWizard()
  renderFireball()
}

function changeWizardEyesColor() {
  SETUP_WIZADR.eyesColor = loopOverArray(EYES_COLORS, SETUP_WIZADR.eyesColor)
  renderWizard()
}

function renderWizard() {
  const ObjectElementMap = [
    {
      source: 'coatColor',
      selector: '.wizard-coat',
      target: 'fill',
      type: mapType.ATTRIBUTE,
    },
    {
      source: 'eyesColor',
      selector: '.wizard-eyes',
      target: 'fill',
      type: mapType.ATTRIBUTE,
    },
  ]
  const container = document.querySelector('.setup-wizard')
  mapObjectOnElement(SETUP_WIZADR, container, ObjectElementMap)
}

function changeFifeballColor() {
  const colors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ]
  SETUP_FIREBALL.color = loopOverArray(colors, SETUP_FIREBALL.color)
  renderFireball()
}

function renderFireball() {
  const ObjectElementMap = [
    {
      source: 'color',
      selector: '.setup-fireball',
      target: 'background',
      type: mapType.STYLE,
    },
  ]
  const container = document.querySelector('.setup-fireball-wrap')
  mapObjectOnElement(SETUP_FIREBALL, container, ObjectElementMap)
}

function setupDataSubmit() {
  console.log('setupDataSubmit')
}
// действия (конец)

function module3task1() {
  // create and show random similar wizards
  document.querySelector('.setup').classList.remove('hidden')
  const wizards = createRandomWizards(4)
  const wizardElements = []
  wizards.forEach((i) => {
    wizardElements.push(createWizardElement(i))
  })
  const setupSimilarList = document.querySelector('.setup-similar-list')
  appendChilds(setupSimilarList, wizardElements)
  document.querySelector('.setup-similar').classList.remove('hidden')
}

function appendChilds(element, childs) {
  const fragment = document.createDocumentFragment()
  childs.forEach((i) => {fragment.appendChild(i)})
  element.appendChild(fragment)
}

function createWizardElement(wizard) {
  const ObjectElementMap = [
    {
      source: 'name',
      selector: '.setup-similar-label',
      target: 'textContent',
      type: mapType.PROPERTY,
    },
    {
      source: 'coatColor',
      selector: '.wizard-coat',
      target: 'fill',
      type: mapType.ATTRIBUTE,
    },
    {
      source: 'eyesColor',
      selector: '.wizard-eyes',
      target: 'fill',
      type: mapType.ATTRIBUTE,
    },
  ]
  const template = document.querySelector('#similar-wizard-template')
      .content.querySelector('div').cloneNode(true)
  mapObjectOnElement(wizard, template, ObjectElementMap)
  return template
}

function mapObjectOnElement(object, element, map) {
  map.forEach((i) => {
    const e = element.querySelector(i.selector)
    if (i.source in object && e) {
      switch (i.type) {
        case mapType.PROPERTY:
          e[i.target] = object[i.source]
          break
        case mapType.ATTRIBUTE:
          e.setAttribute(i.target, object[i.source])
          break
        case mapType.STYLE:
        case mapType.ADD_STYLE:
          let style
          if ((i.type) === mapType.ADD_STYLE) {
            style = e.getAttribute('style')
          }
          style = style ? style + '; ' : ''
          e.setAttribute('style',
              style + i.target + ':' + object[i.source] + ';')
          break
      }
    }
  })
}

function createRandomWizards(wizarsCount) {
  const result = []
  for (let i = 0; i < wizarsCount; i++) {
    result.push(createRandomWizard())
  }
  return result
}

function createRandomWizard() {
  return {
    name: randomWizardName(),
    coatColor: randomCoatColor(),
    eyesColor: randomEyesColor(),
  }
}

function randomEyesColor() {
  return getRandomArrayElement(EYES_COLORS)
}

function randomCoatColor() {
  const colors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ]
  return getRandomArrayElement(colors)
}

function randomWizardName() {
  const firstNames = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ]
  const surnames = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ]
  const name =
      getRandomArrayElement(firstNames) + ' ' + getRandomArrayElement(surnames)
  return name
}

function getRandomArrayElement(a) {
  return a[Math.floor(Math.random() * a.length)]
}

function loopOverArray(array, currentItem) {
  let result
  const i = array.indexOf(currentItem)
  if (i === array.length - 1) {
    result = array[0]
  } else {
    result = array[i + 1]
  }
  return result
}
