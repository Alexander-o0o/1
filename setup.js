/* eslint-disable require-jsdoc */
(function() {
  const utilModule = window.util
  const dragHighlightClasses = {
    ALLOEWD_TARGET: 'drag-allowed-target',
    CURRENT_TARGET: 'drag-current-target',
  }
  const EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ]
  const SETUP_WIZADR = createRandomWizard()
  const SETUP_FIREBALL = { color: '#ee4830' }
  let ARTIFACT_ELEMENT
  window.setup = {
    highlightCurrentDragTarget: function(targetElement) {
      if (isInsideAllowedContainer(targetElement,
          getAllowedArtifactsContainers())) {
        utilModule.classAddNeat(targetElement,
            dragHighlightClasses.CURRENT_TARGET)
      }
    },
    lowlightCurrentDragTarget: function(targetElement) {
      if (isInsideAllowedContainer(targetElement,
          getAllowedArtifactsContainers())) {
        utilModule.classRemoveNeat(targetElement,
            dragHighlightClasses.CURRENT_TARGET)
      }
    },
    isArtifact: function(element) {
      return utilModule.isInNodeList(element,
          document.querySelectorAll('.setup-artifacts-cell img'))
    },
    isArtifactsCell: function(element) {
      return element.classList.contains('setup-artifacts-cell')
    },
    startArtifactDragging: function(artifactElement) {
      ARTIFACT_ELEMENT = artifactElement
      highlightAllowedTargetsContainers(getAllowedArtifactsContainers())
    },
    endArtifactDragging: function(targetElement) {
      lowlightAllowedTargetsContainers()
      ARTIFACT_ELEMENT = null
    },
    completeArtifactDragging: function(targetElement) {
      if (isInsideAllowedContainer(targetElement,
          getAllowedArtifactsContainers())) {
        if (ARTIFACT_ELEMENT.parentNode.parentNode
            .classList.contains('setup-artifacts-shop') &&
        targetElement.parentNode
            .classList.contains('setup-artifacts')) {
          utilModule.cloneElement(ARTIFACT_ELEMENT, targetElement)
        } else {
          utilModule.moveElement(ARTIFACT_ELEMENT, targetElement)
        }
        utilModule.classRemoveNeat(targetElement,
            dragHighlightClasses.CURRENT_TARGET)
      }
    },
    changeWizardEyesColor: function() {
      SETUP_WIZADR.eyesColor = utilModule.loopOverArray(
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
      SETUP_FIREBALL.color = utilModule.loopOverArray(
          colors, SETUP_FIREBALL.color)
      this.renderFireball()
    },
    renderWizard: function() {
      const ObjectElementMap = [
        {
          source: 'coatColor',
          selector: '.wizard-coat',
          target: 'fill',
          type: utilModule.mapType.ATTRIBUTE,
        },
        {
          source: 'eyesColor',
          selector: '.wizard-eyes',
          target: 'fill',
          type: utilModule.mapType.ATTRIBUTE,
        },
      ]
      const container = document.querySelector('.setup-wizard')
      utilModule.mapObjectOnElement(
          SETUP_WIZADR, container, ObjectElementMap)
    },
    renderFireball: function() {
      const ObjectElementMap = [
        {
          source: 'color',
          selector: '.setup-fireball',
          target: 'background',
          type: utilModule.mapType.STYLE,
        },
      ]
      const container = document.querySelector('.setup-fireball-wrap')
      utilModule.mapObjectOnElement(
          SETUP_FIREBALL, container, ObjectElementMap)
    },
  }
  // =========== drag & drop (start) ===========================
  function getAllowedArtifactsContainers() {
    const highlightRules = [
      {
        // if we dragged in this list
        a: '.setup-artifacts-shop img',
        // then add that list to return
        b: '.setup-artifacts',
      },
      {
        a: '.setup-artifacts-shop img',
        b: '.setup-artifacts-shop',
      },
      {
        a: '.setup-artifacts img',
        b: '.setup-artifacts-shop',
      },
      {
        a: '.setup-artifacts img',
        b: '.setup-artifacts',
      },
    ]
    return utilModule.getAssociatedElements(ARTIFACT_ELEMENT, highlightRules)
  }
  function isInsideAllowedContainer(targetElement, allowedContainers) {
    for (let i = 0; i < allowedContainers.length; i++) {
      if (targetElement.children.length > 0) {
        return false
      }
      if (utilModule.getDistanceToPrecursor(targetElement,
          allowedContainers[i]) === 1) {
        return true
      }
    }
    return false
  }
  function highlightAllowedTargetsContainers(containersElements) {
    containersElements.forEach((i) => {
      highlightAllowedTargetsContainer(i)
    })
  }
  function highlightAllowedTargetsContainer(containerElement) {
    utilModule.classAddNeat(containerElement,
        dragHighlightClasses.ALLOEWD_TARGET)
  }
  function lowlightAllowedTargetsContainers() {
    document.querySelectorAll('.' + dragHighlightClasses.ALLOEWD_TARGET)
        .forEach((i) => {
          utilModule.classRemoveNeat(i, dragHighlightClasses.ALLOEWD_TARGET)
        })
  }
  // =========== drag & drop (end) =============================
  // eslint-disable-next-line no-unused-vars
  function module3task1() {
    // create and show random similar wizards
    document.querySelector('.setup').classList.remove('hidden')
    const wizards = createRandomWizards(4)
    const wizardElements = []
    wizards.forEach((i) => {
      wizardElements.push(createWizardElement(i))
    })
    const setupSimilarList = document.querySelector('.setup-similar-list')
    utilModule.appendChilds(setupSimilarList, wizardElements)
    document.querySelector('.setup-similar').classList.remove('hidden')
  }
  // =========== random generation (start) =====================
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
    return utilModule.getRandomArrayElement(EYES_COLORS)
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
    return utilModule.getRandomArrayElement(colors)
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
    const name = utilModule.getRandomArrayElement(firstNames) +
      ' ' + utilModule.getRandomArrayElement(surnames)
    return name
  }
  function createWizardElement(wizard) {
    const ObjectElementMap = [
      {
        source: 'name',
        selector: '.setup-similar-label',
        target: 'textContent',
        type: utilModule.mapType.PROPERTY,
      },
      {
        source: 'coatColor',
        selector: '.wizard-coat',
        target: 'fill',
        type: utilModule.mapType.ATTRIBUTE,
      },
      {
        source: 'eyesColor',
        selector: '.wizard-eyes',
        target: 'fill',
        type: utilModule.mapType.ATTRIBUTE,
      },
    ]
    const template = document.querySelector('#similar-wizard-template')
        .content.querySelector('div').cloneNode(true)
    utilModule.mapObjectOnElement(wizard, template, ObjectElementMap)
    return template
  }
  // =========== random generation (end) =======================
  // module3task1()
}())
