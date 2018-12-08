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
  let DRAGGED_ARTIFACT
  let CURSOR_ATTACHED_ELEMENT
  const SETUP_INITIAL_INLINE_STYLES = document.querySelector('.setup').style
  function addEventListeners() {
    document.querySelector('.setup-open')
        .addEventListener('click', setupOpenClickHandler)

    document.querySelector('.setup-open-icon')
        .addEventListener('keydown', setupOpenIconKeydownHandler)
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
    // =========== setup drag & drop (end) =====================
    document.querySelector('.setup-user-pic')
        .addEventListener('mousedown', setupUserPicMousedownHandler)

    document.querySelector('.setup-close')
        .addEventListener('click', setupCloseClickHandler)

    document.querySelector('.setup-close')
        .addEventListener('keydown', setupCloseKeydownkHandler)

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

    // =========== setup drag & drop (start) ===================
    function setupDragstartHandler(e) {
      startArtifactDragging(e.target)
      function startArtifactDragging(artifactElement) {
        if (isArtifact(artifactElement)) {
          DRAGGED_ARTIFACT = artifactElement
          highlightAllowedTargetsContainers(getAllowedArtifactsContainers())

          document.querySelectorAll('.setup-artifacts-cell').forEach((i) => {
            i.addEventListener('dragover', setupArtifactsCellDragoverHandler)
          })
        }
      }
    }
    function setupDragenterHandler(e) {
      if (isArtifact(DRAGGED_ARTIFACT)) {
        highlightCurrentDragTarget(e.target)
      }
    }

    function setupDragleaveHandler(e) {
      if (isArtifact(DRAGGED_ARTIFACT)) {
        lowlightCurrentDragTarget(e.target)
      }
    }

    function setupDragendHandler(e) {
      if (isArtifact(e.target)) {
        endArtifactDragging()
      }
    }

    function setupDropHandler(e) {
      if (isArtifactsCell(e.target)) {
        if (isAllowedDragTarget(e.target,
            getAllowedArtifactsContainers(DRAGGED_ARTIFACT))) {
          moveDraggedElement(e.target)
        }
        endArtifactDragging()
      }
    }
    function endArtifactDragging() {
      lowlightAllowedTargetsContainers()

      document.querySelectorAll('.setup-artifacts-cell').forEach((i) => {
        i.removeEventListener('dragover', setupArtifactsCellDragoverHandler)
      })
      DRAGGED_ARTIFACT = null
    }
    // =========== setup drag & drop (end) =====================
    function setupUserPicMousedownHandler(e) {
      attachToCursor(document.querySelector('.setup'))
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
    // additional setup drag & drop
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
  function documentMousemoveHandler(e) {
    // console.log('m')
    if (CURSOR_ATTACHED_ELEMENT) {
      moveAttachedElement(e.movementX, e.movementY)
    }
  }
  function documentMouseupHandler() {
    if (CURSOR_ATTACHED_ELEMENT) {
      detachFromCursor()
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
    const setupElement = document.querySelector('.setup')
    setupElement.style = SETUP_INITIAL_INLINE_STYLES
    setupElement.classList.remove('hidden')
    document.addEventListener('keydown', documentKeydownHandler)
    fillSetup()
  }
  function setupHide() {
    document.querySelector('.setup').classList.add('hidden')
    document.querySelector('.setup-open-icon').focus()
    document.removeEventListener('keydown', documentKeydownHandler)
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
    return utilModule.getAssociatedElements(DRAGGED_ARTIFACT, highlightRules)
  }
  function isAllowedDragTarget(targetElement, allowedContainers) {
    for (let i = 0; i < allowedContainers.length; i++) {
      if (utilModule.isMyPrecursor(targetElement, allowedContainers[i])) {
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
  function highlightCurrentDragTarget(targetElement) {
    utilModule.classAddNeat(targetElement,
        dragHighlightClasses.CURRENT_TARGET)
  }
  function lowlightCurrentDragTarget(targetElement) {
    utilModule.classRemoveNeat(targetElement,
        dragHighlightClasses.CURRENT_TARGET)
  }
  function moveDraggedElement(targetElement) {
    utilModule.moveElement(DRAGGED_ARTIFACT, targetElement)
  }
  function isArtifact(element) {
    return utilModule.isInNodeList(element,
        document.querySelectorAll('.setup-artifacts-cell img'))
  }
  function isArtifactsCell(element) {
    return element.classList.contains('setup-artifacts-cell')
  }
  // =========== drag & drop (end) =============================
  function attachToCursor(element) {
    CURSOR_ATTACHED_ELEMENT = element

    element.style.setProperty('position', 'absolute')
    element.style.setProperty('transtorm', 'none')
    element.style.setProperty('left', element.offsetLeft + 'px')
    element.style.setProperty('top', element.offsetTop + 'px')

    document.addEventListener('mousemove', documentMousemoveHandler)
    document.addEventListener('mouseup', documentMouseupHandler)
  }
  function moveAttachedElement(movementX, movementY) {
    CURSOR_ATTACHED_ELEMENT.style.setProperty('left',
        CURSOR_ATTACHED_ELEMENT.offsetLeft + movementX + 'px')
    CURSOR_ATTACHED_ELEMENT.style.setProperty('top',
        CURSOR_ATTACHED_ELEMENT.offsetTop + movementY + 'px')
  }
  function detachFromCursor() {
    CURSOR_ATTACHED_ELEMENT = null
    document.removeEventListener('mousemove', documentMousemoveHandler)
    document.removeEventListener('mouseup', documentMouseupHandler)
  }
  function setupDataSubmit() {
  }
  function fillSetup() {
    setupModule.renderWizard()
    setupModule.renderFireball()
  }
  addEventListeners()
}())
