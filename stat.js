/* eslint-disable require-jsdoc */
(function() {
  window.renderStatistics = function(ctx, names, times) {
    const x = 100
    const y = 10
    const width = 420
    const height = 270
    const chartWidth = width * 0.80
    const charHeight = height * 0.65
    drawStatisticsBG(ctx, x, y, width, height, drawCloud)
    drawMultilineText(ctx, x + width * 0.25, y + height * 0.10,
        'black', '16px PT Mono', 24,
        'Ура вы победили!\nСписок результатов:')
    if (times.length > 0) {
      drawStatisticsChart(ctx,
          x + (width - chartWidth) / 2,
          y + (height - charHeight) / 2 + width * 0.05,
          chartWidth, charHeight, times, names)
    }
  }
  function drawStatisticsBG(ctx, x, y, width, height, drawFunc) {
    drawFunc(ctx, x + 10, y + 10, width, height, 'rgba(0, 0, 0, 0.7)')
    drawFunc(ctx, x, y, width, height, 'white')
  }
  function drawCloud(ctx, x, y, width, height, color) {
    const w = width
    const h = height
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(x + 0.05 * w, y + 1.00 * h)
    // eslint-disable-next-line max-len
    ctx.bezierCurveTo(x - 0.05 * w, y + 0.90 * h, x - 0.00 * w, y + 0.30 * h, x + 0.20 * w, y + 0.45 * h)
    // eslint-disable-next-line max-len
    ctx.bezierCurveTo(x + 0.10 * w, y + 0.00 * h, x + 0.40 * w, y - 0.15 * h, x + 0.50 * w, y + 0.10 * h)
    // eslint-disable-next-line max-len
    ctx.bezierCurveTo(x + 0.70 * w, y - 0.20 * h, x + 0.85 * w, y + 0.20 * h, x + 0.80 * w, y + 0.45 * h)
    // eslint-disable-next-line max-len
    ctx.bezierCurveTo(x + 1.05 * w, y + 0.35 * h, x + 1.05 * w, y + 0.90 * h, x + 0.95 * w, y + 1.00 * h)
    ctx.closePath()
    ctx.fill()
  }
  function drawMultilineText(ctx, x, y, color, font, lineHeight, text) {
    ctx.fillStyle = color
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
  function drawStatisticsChart(ctx, x, y, width, height, values, lables) {
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
      columnChartDrawItem(ctx, iX, y, itemWidth, height, columnColor,
          Math.floor(values[i]), maxValue, lables[i])
      iX = iX + itemWidth
    }
  }
  function columnChartDrawItem(ctx, x, y, width, height, color,
      value, maxValue, lable) {
    const topLableHeight = 30
    const bottomLableHeight = 30
    const underLableGap = 5
    const columnMaxHeight = height - topLableHeight - bottomLableHeight
    const columnHeight = columnMaxHeight * (value / maxValue)
    const columnY = y + height - bottomLableHeight - columnHeight
    const columnWidth = 40
    const columnX = x + (width - columnWidth) / 2
    const topLableY = columnY - underLableGap
    const topLableX = columnX
    const bottomLableY = y + height - underLableGap
    const bottomLableX = columnX
    ctx.font = '16px PT Mono'
    ctx.fillStyle = 'black'
    ctx.fillText(value, topLableX, topLableY)
    ctx.fillStyle = color
    ctx.fillRect(columnX, columnY, columnWidth, columnHeight)
    ctx.fillStyle = 'black'
    ctx.fillText(lable, bottomLableX, bottomLableY)
  }
}())
