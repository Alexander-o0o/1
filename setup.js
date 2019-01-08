/* eslint-disable require-jsdoc */
(function() {
  const utilModule = window.util
  const backendModule = window.backend
  const dragHighlightClasses = {
    ALLOEWD_TARGET: 'drag-allowed-target',
    CURRENT_TARGET: 'drag-current-target',
  }
  const COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ]
  const EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ]
  const FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ]
  let SETTINGS
  let SIMILAR_WIZARDS = []
  let ARTIFACT_ELEMENT
  window.setup = {
    // ========= drag & drop (start) ===========================
    highlightCurrentDragTarget: function(targetElement) {
      utilModule.classAddNeat(targetElement,
          dragHighlightClasses.CURRENT_TARGET)
    },
    lowlightCurrentDragTarget: function(targetElement) {
      utilModule.classRemoveNeat(targetElement,
          dragHighlightClasses.CURRENT_TARGET)
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
    // ========= drag & drop (end) =============================
    setSettingsWizardName() {
      SETTINGS.WIZARD.name = document.querySelector('.setup-user-name').value
    },
    clearSimilarWizards() {
      SIMILAR_WIZARDS = []
    },
    isSettingsLoaded: function() {
      return SETTINGS !== undefined
    },
    asyncLoadSettings: function(onLoadCallback) {
      // Remember: statements in onLoad run one after another immediately
      function onLoad(e) {
        checkXHRStatus(e)
        SETTINGS = JSON.parse(e.target.responseText) || randomSettings()
        onLoadCallback()
      }
      function onError(e) {
        SETTINGS = randomSettings()
        onLoadCallback()
        onXHRError(e)
      }
      try {
        backendModule.loadSettings(
            utilModule.safeInvoke.bind(null, onLoad),
            utilModule.safeInvoke.bind(null, onError))
      } catch (e) {
        console.error(e.message)
      }
    },
    asyncSaveSettings: function(onSaveCallback) {
      this.setSettingsWizardName()
      function onSave(e) {
        onSaveCallback()
        checkXHRStatus(e)
      }
      function onError(e) {
        onSaveCallback()
        onXHRError(e)
      }
      try {
        backendModule.save(SETTINGS,
            utilModule.safeInvoke.bind(null, onSave),
            utilModule.safeInvoke.bind(null, onError))
      } catch (e) {
        console.error(e.message)
      }
    },
    asyncShowSimilarWizards() {
      function onLoad(e) {
        loadSimilarWizards(e)
        renderSimilarWizards()
        checkXHRStatus(e)
      }
      function onError(e) {
        onXHRError(e)
      }
      try {
        backendModule.load(
            utilModule.safeInvoke.bind(null, onLoad),
            utilModule.safeInvoke.bind(null, onError))
      } catch (e) {
        console.error(e.message)
      }
    },
    hideSimilarWizards: function() {
      document.querySelector('.setup-similar').classList.remove('hidden')
      const setupSimilarList = document.querySelector('.setup-similar-list')
      utilModule.removeChildNodes(setupSimilarList, 1)
    },
    changeWizardCoatColor: function() {
      SETTINGS.WIZARD.coatColor = utilModule.loopOverArray(
          COAT_COLORS, SETTINGS.WIZARD.coatColor)
      this.renderWizard()
      utilModule.debounce(500, renderSimilarWizards)
    },
    changeWizardEyesColor: function() {
      SETTINGS.WIZARD.eyesColor = utilModule.loopOverArray(
          EYES_COLORS, SETTINGS.WIZARD.eyesColor)
      this.renderWizard()
      utilModule.debounce(500, renderSimilarWizards)
    },
    changeFifeballColor: function() {
      SETTINGS.FIREBALL.color = utilModule.loopOverArray(
          FIREBALL_COLORS, SETTINGS.FIREBALL.color)
      this.renderFireball()
    },
    // ========= render (start) ================================
    fillTextData: function() {
      document.querySelector('.setup-user-name').value = SETTINGS.WIZARD.name
    },
    renderWizard: function() {
      const ObjectElementMap = [
        {
          source: 'coatColor',
          selector: '.wizard-coat',
          target: 'fill',
          type: utilModule.mapType.STYLE,
        },
        {
          source: 'eyesColor',
          selector: '.wizard-eyes',
          target: 'fill',
          type: utilModule.mapType.STYLE,
        },
      ]
      const container = document.querySelector('.setup-wizard')
      utilModule.mapObjectOnElement(
          SETTINGS.WIZARD, container, ObjectElementMap)
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
          SETTINGS.FIREBALL, container, ObjectElementMap)
    },
    // ========= render (end) ==================================
  }
  function onXHRError(e) {
    const out = e.message || e.error || e.target.statusText || 'unknown error'
    throw new Error(out)
  }
  function checkXHRStatus(e) {
    if (e.target.status > 299) {
      throw new Error(e.target.statusText)
    }
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
  function loadSimilarWizards(e) {
    // const data = JSON.parse(e.target.responseText)
    // const randomUniqueInt = utilModule.randomUniqueInt(data.length)
    // const wizardsMax = 4
    // for (let i = 0; i < wizardsMax; i++) {
    //   SIMILAR_WIZARDS.push(data[randomUniqueInt()])
    // }
    SIMILAR_WIZARDS = JSON.parse(e.target.responseText)
  }
  function sortSimilarWizards(eyesColor, coatColor) {
    SIMILAR_WIZARDS.sort(function(a, b) {
      return calculateWizardsSimilarity(SETTINGS.WIZARD, b) -
          calculateWizardsSimilarity(SETTINGS.WIZARD, a)
    })
  }
  function calculateWizardsSimilarity(wizardA, wizardB) {
    let result = 0
    for (const key in wizardA) {
      if (wizardA[key] === wizardB[key]) {
        result++
      }
    }
    return result
  }
  function showSimilarWizards() {
    const wizardsMax = 4
    const setupSimilarList = document.querySelector('.setup-similar-list')
    const wizards = SIMILAR_WIZARDS.slice(0, wizardsMax)
    let wizardsElements
    // может быть так только хуже и я всё лишь усложняю.
    // может быть лучше по простому - всё удалить и создать занова,
    // а не обновлять.
    if (setupSimilarList.children.length === 0) {
      wizardsElements = wizards.map((i) => createWizardElement(i))
      utilModule.appendChilds(setupSimilarList, wizardsElements)
      document.querySelector('.setup-similar').classList.remove('hidden')
    } else {
      wizardsElements =
          Array.from(document.querySelectorAll('.setup-similar-item'))
      wizards.forEach((item, index) => {
        updateWizardElement(item, wizardsElements[index])
      })
    }
  }
  // eslint-disable-next-line no-unused-vars
  function readSettings() {
    return {
      WIZARD: {
        name: document.querySelector('.setup-user-name').value,
        coatColor: document.querySelector('.wizard-coat').style.fill,
        eyesColor: document.querySelector('.wizard-eyes').style.fill,
      },
      FIREBALL: { color: document.querySelector('.setup-fireball')
          .style.background },
    }
  }
  function randomSettings() {
    return {
      WIZARD: {
        name: document.querySelector('.setup-user-name').value,
        coatColor: randomCoatColor(),
        eyesColor: randomEyesColor(),
      },
      FIREBALL: { color: utilModule.getRandomArrayElement(FIREBALL_COLORS) },
    }
  }
  function renderSimilarWizards() {
    sortSimilarWizards()
    showSimilarWizards()
  }
  // =========== random generation (start) =====================
  // eslint-disable-next-line no-unused-vars
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
    return utilModule.getRandomArrayElement(COAT_COLORS)
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
  function updateWizardElement(wizard, element) {
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
    utilModule.mapObjectOnElement(wizard, element, ObjectElementMap)
  }
}())
