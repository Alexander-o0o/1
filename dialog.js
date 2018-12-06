/* eslint-disable require-jsdoc */
(function() {
  const setup = window.setup
  const key = {
    ESC: 27,
    ENTER: 13,
  }
  function addEventListeners() {
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

    function wizardEyesClickHandler(e) {
      setup.changeWizardEyesColor()
    }

    function setupFireballWrapClickHandler(e) {
      setup.changeFifeballColor()
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
  function setupDataSubmit() {
  }
  function fillSetup() {
    setup.renderWizard()
    setup.renderFireball()
  }
  addEventListeners()
}())
