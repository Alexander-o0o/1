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
    removeChildNodes: function(element, childIndex) {
      while (element.childNodes[childIndex]) {
        element.removeChild(element.lastChild)
      }
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
    getDistanceToPrecursor: function(element, precursor) {
      let result = 0
      let e = element.parentElement
      do {
        result++
        if (e === precursor) {
          return result
        }
        e = e.parentElement
      } while (e)
      return 0
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
      }
    },
    cloneElement: function(element, target) {
      if (element !== target) {
        target.appendChild(element.cloneNode(true))
      }
    },
    isInNodeList: function(element, nodeList) {
      return Array.prototype.indexOf.call(nodeList, element) !== -1
    },
    randomUniqueInt: function(max) {
      // можно было сделать не функцию, а объект randomUniqueInt,
      // но захотелось так
      let values = []
      for (let i = 0; i < max; i++) {
        values.push(i)
      }
      return function cutRandomArrayElement() {
        const rndI = Math.floor(Math.random() * values.length)
        const result = values[rndI]
        // удаляем этот элемент из массива
        values = values.slice(0, rndI).concat(values.slice(rndI + 1))
        return result
      }
    },
    safeInvoke: function(f) {
      try {
        // eslint-disable-next-line prefer-rest-params
        const args = Array.prototype.slice.call(arguments)
        // eslint-disable-next-line prefer-spread
        f.apply(null, args.slice(1))
      } catch (e) {
        console.error(e.message)
      }
    },
  }
}())
