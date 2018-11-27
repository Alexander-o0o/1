/* eslint-disable require-jsdoc */
const key = {
  ESC: 27,
  ENTER: 13,
}
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
}
// реакции (начало)
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
  switch (e.keyCode) {
    case key.ESC:
      if (document.activeElement !==
          document.querySelector('.setup-user-name')) {
        setupHide()
      }
      break
  }
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
  // setupDataSubmit()
}

function setupSubmitKeydownkHandler(e) {
  switch (e.keyCode) {
    case key.ENTER:
      // setupDataSubmit()
      break
  }
}
// реакции (конец)

// действия (начало)
function setupShow() {
  document.querySelector('.setup').classList.remove('hidden')
  document.querySelector('.setup-user-name').focus()
}

function setupHide() {
  document.querySelector('.setup').classList.add('hidden')
  document.querySelector('.setup-open-icon').focus()
}

function setupDataSubmit() {
  console.log('setupDataSubmit')
}
// действия (конец)

function main0() {
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
  const mapType = {
    PROPERTY: 1,
    ATTRIBUTE: 2,
    STYLE: 3,
  }
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
            e.style += ' ' + i.target + ':' + object[i.source] + ';'
            break
          default:
            break
        }
      }
    })
  }
  return template
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
  const colors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ]
  return getRandomArrayElement(colors)
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
