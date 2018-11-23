/* eslint-disable func-names */
console.log('stat')
window.renderStatistics = function (ctx, names, times) {
  // var canvas = this.document.getElementsByTagName('canvas')[0];
  // var ctx = canvas.getContext('2d');
  drawStatisticsBG(drawCloud, ctx);
  drawMultiLineText(220, 100, '16px PT Mono', 24, ctx, 'Ура вы победили!\nСписок результатов:');
  if (times.length > 0) {
    drawColumnChart(120, 270, 385, 100, ctx, times, names);
  }
};
function drawStatisticsBG(draw, ctx) {
  draw(150, 290, 'rgba(0, 0, 0, 0.7)', ctx);
  draw(140, 280, 'white', ctx);
}
function drawCloud (x, y, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - 40,  y - 20,  x - 20,  y - 140, x + 60,  y - 110);
  ctx.bezierCurveTo(x + 20,  y - 200, x + 140, y - 230, x + 170, y - 180);
  ctx.bezierCurveTo(x + 240, y - 240, x + 310, y - 160, x + 280, y - 110);
  ctx.bezierCurveTo(x + 380, y - 130, x + 380, y - 20,  x + 340, y);
  ctx.closePath();
  ctx.fill();
}

function drawMultiLineText(x, y, font, lineHeight, ctx, text) {
  ctx.fillStyle = 'black';
  ctx.font = font;
  var nlChar = '\n';
  var lastNl;
  var nl = -1;
  var i = 0;
  while (nl < text.length) {
    lastNl = nl;
    nl = text.indexOf(nlChar, nl + 1);
    if (nl === -1) {
      nl = text.length;
    }
    ctx.fillText(text.substring(lastNl + 1, nl), x, y + (lineHeight * ++i));
  }
}
function drawColumnChart(x, y, width, height, ctx, values, lables) {
  var columnColor;
  var itemWidth = width / (values.length || 1);
  var maxValue = values.length && values.sort((a, b) => a < b)[0];
  var iX = x;
  for (var i = 0; i < values.length; i++) {
    columnColor = 'hsl(' + (lables[i] === 'Вы' ? '0, 100' : ('240, ' + Math.floor(Math.random() * 100))) + '%, 50%)';
    columnChartDrawItem(iX, y, ctx, itemWidth, height, columnColor, Math.floor(values[i]), maxValue, lables[i]);
    iX = iX + itemWidth;
  }
}
function columnChartDrawItem(x, y, ctx, itemWidth, itemHeight, columnColor, value, maxValue, lable) {
  var topLableHeight = 30;
  var bottomLableHeight = 30;
  var underLableGap = 5;
  var columnMaxHeight = itemHeight - topLableHeight - bottomLableHeight;
  var columnHeight = columnMaxHeight * (value / maxValue);
  var cY = y - bottomLableHeight - columnHeight;
  var columnWidth = 40;
  var cX = x + (itemWidth - columnWidth) / 2;
  var lableFont = '16px PT Mono';
  var tLy = cY - underLableGap;
  var tLx = cX;
  var bLy = y - underLableGap;
  var bLx = cX;
  ctx.font = lableFont;
  ctx.fillStyle = 'black';
  ctx.fillText(value, tLx, tLy);
  ctx.fillStyle = columnColor;
  ctx.fillRect(cX, cY, columnWidth, columnHeight);
  ctx.fillStyle = 'black';
  ctx.fillText(lable, bLx, bLy);
}