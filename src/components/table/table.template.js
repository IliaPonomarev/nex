const CODES = {
  A: 65,
  Z: 90
}

function toCell(row, col) {
  return `
  <div class="cell" contenteditable data-type="cell" data-col="${col}" data-id="${row}:${col}"></div>
  `
}

function toCol(el, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${el}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class="row" data-type="resizable">

    <div class="row-info">
      ${index || ''}
      ${resizer}
    </div>

    <div class="row-data">
    ${content}
    </div>

  </div>
  `
}

function toChar(el, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toCol)
    .join('')

  rows.push(createRow(null, cols))

  for(let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map((_, col) => toCell(i, col))
      .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}