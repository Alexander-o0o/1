/* eslint-disable require-jsdoc */
(function() {
  window.util = {
    mapType: {
      PROPERTY: 1,
      ATTRIBUTE: 2,
      STYLE: 3,
      ADD_STYLE: 4,
    },
    getRandomArrayElement: function(a) {
      return a[Math.floor(Math.random() * a.length)]
    },
    loopOverArray: function(array, currentItem) {
      let result
      const i = array.indexOf(currentItem)
      if (i === array.length - 1) {
        result = array[0]
      } else {
        result = array[i + 1]
      }
      return result
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
    appendChilds: function(element, childs) {
      const fragment = document.createDocumentFragment()
      childs.forEach((i) => {fragment.appendChild(i)})
      element.appendChild(fragment)
    },
  }
}())
