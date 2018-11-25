/* eslint-disable require-jsdoc */
console.log('stat')
window.renderStatistics = function(ctx, names, times) {
  // var canvas = this.document.getElementsByTagName('canvas')[0];
  // var ctx = canvas.getContext('2d');
  drawStatisticsBG(drawCloud, ctx)
  drawMultiLineText(220, 100, '16px PT Mono', 24, ctx,
      'Ура вы победили!\nСписок результатов:')
  if (times.length > 0) {
    drawColumnChart(120, 270, 385, 100, ctx, times, names)
  }
}
function drawStatisticsBG(draw, ctx) {
  draw(150, 290, 'rgba(0, 0, 0, 0.7)', ctx)
  draw(140, 280, 'white', ctx)
}
function drawCloud(x, y, color, ctx) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.bezierCurveTo(x - 40, y - 20, x - 20, y - 140, x + 60, y - 110)
  ctx.bezierCurveTo(x + 20, y - 200, x + 140, y - 230, x + 170, y - 180)
  ctx.bezierCurveTo(x + 240, y - 240, x + 310, y - 160, x + 280, y - 110)
  ctx.bezierCurveTo(x + 380, y - 130, x + 380, y - 20, x + 340, y)
  ctx.closePath()
  ctx.fill()
}

function drawMultiLineText(x, y, font, lineHeight, ctx, text) {
  ctx.fillStyle = 'black'
  ctx.font = font
  const nlChar = '\n'
  let lastNl
  let nl = -1
  let i = 0
  while (nl < text.length) {
    lastNl = nl
    nl = text.indexOf(nlChar, nl + 1)
    if (nl === -1) {
      nl = text.length
    }
    ctx.fillText(text.substring(lastNl + 1, nl), x, y + (lineHeight * ++i))
  }
}
function drawColumnChart(x, y, width, height, ctx, values, lables) {
  let columnColor
  const itemWidth = width / (values.length || 1)
  const maxValue = values.length && values.sort((a, b) => a < b)[0]
  let iX = x
  for (let i = 0; i < values.length; i++) {
    columnColor = 'hsl(' +
          (lables[i] === 'Вы'
            ? '0, 100'
            : ('240, ' + Math.floor(Math.random() * 100))) +
        '%, 50%)'
    columnChartDrawItem(iX, y, ctx, itemWidth, height,
        columnColor, Math.floor(values[i]), maxValue, lables[i])
    iX = iX + itemWidth
  }
}
function columnChartDrawItem(x, y, ctx, itemWidth, itemHeight,
    columnColor, value, maxValue, lable) {
  const topLableHeight = 30
  const bottomLableHeight = 30
  const underLableGap = 5
  const columnMaxHeight = itemHeight - topLableHeight - bottomLableHeight
  const columnHeight = columnMaxHeight * (value / maxValue)
  const cY = y - bottomLableHeight - columnHeight
  const columnWidth = 40
  const cX = x + (itemWidth - columnWidth) / 2
  const lableFont = '16px PT Mono'
  const tLy = cY - underLableGap
  const tLx = cX
  const bLy = y - underLableGap
  const bLx = cX
  ctx.font = lableFont
  ctx.fillStyle = 'black'
  ctx.fillText(value, tLx, tLy)
  ctx.fillStyle = columnColor
  ctx.fillRect(cX, cY, columnWidth, columnHeight)
  ctx.fillStyle = 'black'
  ctx.fillText(lable, bLx, bLy)
}
