/* eslint-disable require-jsdoc */
main()

function main() {
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
