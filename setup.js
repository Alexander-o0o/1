/* eslint-disable require-jsdoc */
(function() {
  const util = window.util
  const EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ]
  const SETUP_WIZADR = createRandomWizard()
  const SETUP_FIREBALL = { color: '#ee4830' }
  window.setup = {
    changeWizardEyesColor: function() {
      SETUP_WIZADR.eyesColor = util.loopOverArray(
          EYES_COLORS, SETUP_WIZADR.eyesColor)
      this.renderWizard()
    },
    changeFifeballColor: function() {
      const colors = [
        '#ee4830',
        '#30a8ee',
        '#5ce6c0',
        '#e848d5',
        '#e6e848',
      ]
      SETUP_FIREBALL.color = util.loopOverArray(
          colors, SETUP_FIREBALL.color)
      this.renderFireball()
    },
    renderWizard: function() {
      const ObjectElementMap = [
        {
          source: 'coatColor',
          selector: '.wizard-coat',
          target: 'fill',
          type: util.mapType.ATTRIBUTE,
        },
        {
          source: 'eyesColor',
          selector: '.wizard-eyes',
          target: 'fill',
          type: util.mapType.ATTRIBUTE,
        },
      ]
      const container = document.querySelector('.setup-wizard')
      util.mapObjectOnElement(
          SETUP_WIZADR, container, ObjectElementMap)
    },
    renderFireball: function() {
      const ObjectElementMap = [
        {
          source: 'color',
          selector: '.setup-fireball',
          target: 'background',
          type: util.mapType.STYLE,
        },
      ]
      const container = document.querySelector('.setup-fireball-wrap')
      util.mapObjectOnElement(
          SETUP_FIREBALL, container, ObjectElementMap)
    },
  }
  function module3task1() {
    // create and show random similar wizards
    document.querySelector('.setup').classList.remove('hidden')
    const wizards = createRandomWizards(4)
    const wizardElements = []
    wizards.forEach((i) => {
      wizardElements.push(createWizardElement(i))
    })
    const setupSimilarList = document.querySelector('.setup-similar-list')
    util.appendChilds(setupSimilarList, wizardElements)
    document.querySelector('.setup-similar').classList.remove('hidden')
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
    return util.getRandomArrayElement(EYES_COLORS)
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
    return util.getRandomArrayElement(colors)
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
    const name = util.getRandomArrayElement(firstNames) +
    ' ' + util.getRandomArrayElement(surnames)
    return name
  }
  function createWizardElement(wizard) {
    const ObjectElementMap = [
      {
        source: 'name',
        selector: '.setup-similar-label',
        target: 'textContent',
        type: util.mapType.PROPERTY,
      },
      {
        source: 'coatColor',
        selector: '.wizard-coat',
        target: 'fill',
        type: util.mapType.ATTRIBUTE,
      },
      {
        source: 'eyesColor',
        selector: '.wizard-eyes',
        target: 'fill',
        type: util.mapType.ATTRIBUTE,
      },
    ]
    const template = document.querySelector('#similar-wizard-template')
        .content.querySelector('div').cloneNode(true)
    util.mapObjectOnElement(wizard, template, ObjectElementMap)
    return template
  }
  // module3task1()
}())
