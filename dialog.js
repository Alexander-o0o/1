/* eslint-disable require-jsdoc */
(function() {
  const setupModule = window.setup
  const key = {
    ESC: 27,
    ENTER: 13,
  }
  let DRAGGED_ELEMENT
  let CURSOR_ATTACHED_ELEMENT
  const SETUP_INITIAL_INLINE_STYLES = document.querySelector('.setup').style
  function init() {
    addEventListeners()
    document.querySelectorAll('.setup-artifacts-cell img').forEach((i) => {
      i.setAttribute('draggable', 'true')
    })
  }
  function addEventListeners() {
    document.querySelector('.setup-open')
        .addEventListener('click', setupOpenClickHandler)

    document.querySelector('.setup-open-icon')
        .addEventListener('keydown', setupOpenIconKeydownHandler)
    // ========= drag & drop (start) ===========================
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
    // ========= drag & drop (end) =============================
    document.querySelector('.setup')
        .addEventListener('submit', setupSubmitHandler)

    document.querySelector('.setup-user-pic')
        .addEventListener('mousedown', setupUserPicMousedownHandler)

    document.querySelector('.setup-user-name')
        .addEventListener('change', setupUserNameChangeHandler)

    document.querySelector('.setup-close')
        .addEventListener('click', setupCloseClickHandler)

    document.querySelector('.setup-close')
        .addEventListener('keydown', setupCloseKeydownkHandler)

    document.querySelector('.setup-wizard .wizard-coat')
        .addEventListener('click', wizardCoatClickHandler)

    document.querySelector('.setup-wizard .wizard-eyes')
        .addEventListener('click', wizardEyesClickHandler)

    document.querySelector('.setup-fireball-wrap')
        .addEventListener('click', setupFireballWrapClickHandler)

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
    // ========= drag & drop (start) ===========================
    function setupDragstartHandler(e) {
      DRAGGED_ELEMENT = e.target
      if (setupModule.isArtifact(e.target)) {
        setupModule.startArtifactDragging(e.target)

        document.querySelectorAll('.setup-artifacts-cell').forEach((i) => {
          i.addEventListener('dragover', setupArtifactsCellDragoverHandler)
        })
      }
    }
    function setupDragenterHandler(e) {
      if (setupModule.isArtifact(DRAGGED_ELEMENT) &&
          setupModule.isArtifactsCell(e.target)) {
        setupModule.highlightCurrentDragTarget(e.target)
      }
    }
    function setupDragleaveHandler(e) {
      if (setupModule.isArtifact(DRAGGED_ELEMENT) &&
      setupModule.isArtifactsCell(e.target)) {
        setupModule.lowlightCurrentDragTarget(e.target)
      }
    }
    function setupDragendHandler(e) {
      if (setupModule.isArtifact(e.target)) {
        setupModule.endArtifactDragging()

        document.querySelectorAll('.setup-artifacts-cell').forEach((i) => {
          i.removeEventListener('dragover', setupArtifactsCellDragoverHandler)
        })
      }
      DRAGGED_ELEMENT = null
    }
    function setupDropHandler(e) {
      if (setupModule.isArtifactsCell(e.target)) {
        setupModule.completeArtifactDragging(e.target)
        setupModule.endArtifactDragging()

        document.querySelectorAll('.setup-artifacts-cell').forEach((i) => {
          i.removeEventListener('dragover', setupArtifactsCellDragoverHandler)
        })
      }
    }
    // ========= drag & drop (end) =============================
    function setupSubmitHandler(e) {
      e.preventDefault()
      setupDataSubmit(e)
    }
    // move window
    function setupUserPicMousedownHandler(e) {
      attachToCursor(document.querySelector('.setup'))
    }
    function setupUserNameChangeHandler(e) {
      setupModule.setSettingsWizardName()
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
    // additional drag & drop
    function setupArtifactsCellDragoverHandler(e) {
      e.preventDefault()
    }
    function wizardCoatClickHandler(e) {
      setupModule.changeWizardCoatColor()
    }
    function wizardEyesClickHandler(e) {
      setupModule.changeWizardEyesColor()
    }
    function setupFireballWrapClickHandler(e) {
      setupModule.changeFifeballColor()
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
    document.querySelector('.setup').classList.remove('hidden')
    document.addEventListener('keydown', documentKeydownHandler)
    setupModule.asyncLoadSettings(fillSetup)
  }
  function setupHide() {
    const setupElement = document.querySelector('.setup')
    setupElement.classList.add('hidden')
    setupElement.style = SETUP_INITIAL_INLINE_STYLES
    document.querySelector('.setup-open-icon').focus()
    document.removeEventListener('keydown', documentKeydownHandler)
    setupModule.hideSimilarWizards()
    setupModule.clearSimilarWizards()
  }
  // =========== move window (start) ===========================
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
  // =========== move window (end) =============================
  function setupDataSubmit(e) {
    setupModule.asyncSaveSettings(setupHide)
  }
  function fillSetup() {
    setupModule.fillTextData()
    setupModule.renderWizard()
    setupModule.renderFireball()
    setupModule.asyncShowSimilarWizards()
  }
  init()
}())
