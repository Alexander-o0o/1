/* eslint-disable require-jsdoc */
(function() {
  let FREQUENCY_RESTRICTED_INVOKES = []
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
    /* Самый короткий и простой на мой взгляд вариант. Есть
    конечно ещё вариант без таймера где в массив для каждой ф
    записывается интервал игнорирования (time) и момент последнего
    успешного запуска и если времени с этого момента прошло больше
    чем этот интервал, то ф запускается. У варианта без таймера
    есть небольшое преимущество - отсутствие некоторых ограничений
    связанных с this в таймере. Но т.к. вариант без таймера пришел
    мне в голову последним, принципиальных преимуществ в нём тут
    я не вижу и сейчас его реализовывать мне лень, то будет этот
    вариант:
    */
    debounce: function(time, f) {
      // eslint-disable-next-line prefer-const
      let a = FREQUENCY_RESTRICTED_INVOKES
      if (a.indexOf(f) === -1) {
        a.push(f)
        setTimeout(() => {removeArrayElement(a, f)}, time)
        // eslint-disable-next-line prefer-rest-params
        const args = Array.prototype.slice.call(arguments, 2)
        // eslint-disable-next-line prefer-spread
        f.apply(null, args)
      }
    },
    /* На мой взгляд, в короткой серии нажатий вариант с мгновенным
    реагированием на первое нажатие и полным игнорированием после
    этого воспринимается как более лагучий, чем вариант, когда по
    завершении интервала последнее нажатие всё-таки срабатывает.
    Разумеется пока интервал не слишком большой. Так что вот он:
    */
    // debounce: function(time, f) {
    //   // big ugly alternative with deffered call
    //   // eslint-disable-next-line prefer-const
    //   let a = FREQUENCY_RESTRICTED_INVOKES
    //   if (a.filter((i) => i.call === f).length === 0) {
    //     a.push({ call: f, isDefferred: false, args: undefined })
    //     const that = this
    //     setTimeout(() => {
    //       const aFiltered = a.filter((i) => i.call === f)
    //       if (aFiltered.length > 0) {
    //         removeArrayElement(a, aFiltered[0])
    //         if (aFiltered[0].isDefferred) {
    //           // eslint-disable-next-line prefer-spread
    //           that.debounce.apply(that, aFiltered[0].args)
    //         }
    //       }
    //     }, time)
    //     // eslint-disable-next-line prefer-rest-params
    //     const args = Array.prototype.slice.call(arguments, 2)
    //     // eslint-disable-next-line prefer-spread
    //     f.apply(null, args)
    //     return true
    //   } else {
    //     const aFiltered = a.filter((i) => i.call === f)
    //     if (aFiltered.length > 0) {
    //       aFiltered[0].isDefferred = true
    //       // eslint-disable-next-line prefer-rest-params
    //       aFiltered[0].args = Array.prototype.slice.call(arguments, 0)
    //     }
    //     return false
    //   }
    // },
  }
  function removeArrayElement(a, e) {
    const index = a.indexOf(e)
    if (index !== -1) {
      for (let i = index; i < a.length - 1; i++) {
        a[i] = a[i + 1]
      }
      a.length--
    }
  }
}())
