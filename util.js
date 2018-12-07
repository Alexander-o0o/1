/* eslint-disable require-jsdoc */
(function() {
  window.util = {
    mapType: {
      PROPERTY: 1,
      ATTRIBUTE: 2,
      STYLE: 3,
      ADD_STYLE: 4,
    },
    // TODO: change ..Element on ..Item
    getRandomArrayElement: function(a) {
      return a[Math.floor(Math.random() * a.length)]
    },
    loopOverArray: function(a, currentItem) {
      let result
      const i = a.indexOf(currentItem)
      if (i === a.length - 1) {
        result = a[0]
      } else {
        result = a[i + 1]
      }
      return result
    },
    // TODO: change ..Elements on ..Items
    getUniqueElements: function(a) {
      return a.map((i, index) => {
        if (a.indexOf(i, index + 1) === -1) {
          return i
        }
      })
    },
    mapObjectOnElement: function(object, element, map) {
      map.forEach((i) => {
        const e = element.querySelector(i.selector)
        if (i.source in object && e) {
          switch (i.type) {
            case this.mapType.PROPERTY:
              e[i.target] = object[i.source]
              break
            case this.mapType.ATTRIBUTE:
              e.setAttribute(i.target, object[i.source])
              break
            case this.mapType.STYLE:
            case this.mapType.ADD_STYLE:
              let style
              if ((i.type) === this.mapType.ADD_STYLE) {
                style = e.getAttribute('style')
              }
              style = style ? style + '; ' : ''
              e.setAttribute('style',
                  style + i.target + ':' + object[i.source] + ';')
              break
          }
        }
      })
    },
    getAssociatedElements: function(element, map) {
      const result = []
      map.forEach((i) => {
        if (this.isInNodeList(
            element, document.querySelectorAll(i.a))) {
          document.querySelectorAll(i.b).forEach((j) => {
            result.push(j)
          })
        }
      })
      return this.getUniqueElements(result)
    },
    isMyPrecursor: function(element, precursor) {
      let e = element.parentElement
      do {
        if (e === precursor) {
          return true
        }
        e = e.parentElement
      } while (e)
      return false
    },
    appendChilds: function(element, childs) {
      const fragment = document.createDocumentFragment()
      childs.forEach((i) => {fragment.appendChild(i)})
      element.appendChild(fragment)
    },
    classAddNeat: function(element, cssClass) {
      if (!element.classList.contains(cssClass)) {
        element.classList.add(cssClass)
      }
    },
    classRemoveNeat: function(element, cssClass) {
      if (element.classList.contains(cssClass)) {
        element.classList.remove(cssClass)
        if (element.classList.length === 0) {
          element.removeAttribute('class')
        }
      }
    },
    moveElement: function(element, target) {
      if (element !== target) {
        target.appendChild(element)
        // element.parentElement.removeChild(element)
      }
    },
    isInNodeList: function(element, nodeList) {
      return Array.prototype.indexOf.call(nodeList, element) !== -1
    },
  }
}())
