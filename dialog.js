/* eslint-disable require-jsdoc */
(function() {
  const setupModule = window.setup
  const utilModule = window.util
  const key = {
    ESC: 27,
    ENTER: 13,
  }
  const dragHighlightClasses = {
    ALLOEWD_TARGET: 'drag-allowed-target',
    CURRENT_TARGET: 'drag-current-target',
  }
  let DRAGGED_ELEMENT
  function addEventListeners() {
    document.addEventListener('visibilitychange', function(e) {
      if (e.target.defaultView === null &&
          e.target.hidden === true &&
          e.target.location === null &&
          e.target.mozFullScreenEnabled === false &&
          e.target.visibilityState === 'hidden') {
        e.preventDefault()
      }
    })

    document.querySelector('.setup-open')
        .addEventListener('click', setupOpenClickHandler)

    document.querySelector('.setup-open-icon')
        .addEventListener('keydown', setupOpenIconKeydownHandler)

    document.querySelector('.setup')
        .addEventListener('keydown', setupKeydownHandler)
    // =========== setup drag & drop (start) ===================
    document.querySelector('.setup')
        .addEventListener('dragstart', setupDragstartHandler)

    document.querySelector('.setup')
        .addEventListener('dragenter', setupDragenterHandler)

    document.querySelector('.setup')
        .addEventListener('dragleave', setupDragleaveHandler)

    document.querySelector('.setup')
        .addEventListener('dragend', setupDragendHandler)

    document.querySelector('.setup')
        .addEventListener('drop', setupDropHandler)
    // =========== setup drag & drop (start) ===================
    document.querySelector('.setup-close')
        .addEventListener('click', setupCloseClickHandler)

    document.querySelector('.setup-close')
        .addEventListener('keydown', setupCloseKeydownkHandler)

    document.querySelectorAll('.setup-artifacts-cell').forEach((i) => {
      i.addEventListener('dragover', setupArtifactsCellDragoverHandler)
    })

    document.querySelector('.setup-wizard .wizard-eyes')
        .addEventListener('click', wizardEyesClickHandler)

    document.querySelector('.setup-fireball-wrap')
        .addEventListener('click', setupFireballWrapClickHandler)

    document.querySelector('.setup-submit')
        .addEventListener('click', setupSubmitClickHandler)

    document.querySelector('.setup-submit')
        .addEventListener('keydown', setupSubmitKeydownkHandler)

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
    }
    // =========== setup drag & drop (start) ===================
    function setupDragstartHandler(e) {
      DRAGGED_ELEMENT = e.target
      highlightAllowedDragTargets(getAllowedDragContainers())
    }

    function setupDragenterHandler(e) {
      highlightCurrentDragTarget(e.target)
    }

    function setupDragleaveHandler(e) {
      lowlightCurrentDragTarget(e.target)
    }

    function setupDragendHandler(e) {
      lowlightAllowedDragTargets()
    }

    function setupDropHandler(e) {
      lowlightCurrentDragTarget(e.target)
      if (isAllowedDragTarget(e.target,
          getAllowedDragContainers(DRAGGED_ELEMENT))) {
        moveDraggedElement(e.target)
      }
    }
    // =========== setup drag & drop (start) ===================
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

    function setupArtifactsCellDragoverHandler(e) {
      e.preventDefault()
    }

    function wizardEyesClickHandler(e) {
      setupModule.changeWizardEyesColor()
    }

    function setupFireballWrapClickHandler(e) {
      setupModule.changeFifeballColor()
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
  }
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
  // =========== drag & drop (start) ===========================
  function getAllowedDragContainers() {
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
    return utilModule.getAssociatedElements(DRAGGED_ELEMENT, highlightRules)
  }
  function isAllowedDragTarget(targetElement, allowedContainers) {
    for (let i = 0; i < allowedContainers.length; i++) {
      if (utilModule.isMyPrecursor(targetElement, allowedContainers[i])) {
        return true
      }
    }
    return false
  }
  function highlightAllowedDragTargets(targetElements) {
    targetElements.forEach((i) => {
      highlightAllowedDragTarget(i)
    })
  }
  function highlightAllowedDragTarget(targetElement) {
    utilModule.classAddNeat(targetElement, dragHighlightClasses.ALLOEWD_TARGET)
  }
  function lowlightAllowedDragTargets() {
    document.querySelectorAll('.' + dragHighlightClasses.ALLOEWD_TARGET)
        .forEach((i) => {
          utilModule.classRemoveNeat(i, dragHighlightClasses.ALLOEWD_TARGET)
        })
  }
  function highlightCurrentDragTarget(targetElement) {
    utilModule.classAddNeat(targetElement,
        dragHighlightClasses.CURRENT_TARGET)
  }
  function lowlightCurrentDragTarget(targetElement) {
    utilModule.classRemoveNeat(targetElement,
        dragHighlightClasses.CURRENT_TARGET)
  }
  function moveDraggedElement(targetElement) {
    utilModule.moveElement(DRAGGED_ELEMENT, targetElement)
  }
  // =========== drag & drop (end) =============================
  function setupDataSubmit() {
  }
  function fillSetup() {
    setupModule.renderWizard()
    setupModule.renderFireball()
  }
  addEventListeners()
}())
