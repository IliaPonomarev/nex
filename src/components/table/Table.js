import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { isCell, matrix, shouldResize, nextSelector } from "./table.functions";
import { resizeHandler } from "./table.resize";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const { key } = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      console.log(event)
      const { col, row } = this.selection.current.id(':')
      const $next = this.$root.find(nextSelector(key, { col, row }))

      this.selectCell($next)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event)
    } else if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        const target = $target.id(':')    
        const current = this.selection.current.id(':')

        const $cells = matrix(target, current).map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
      
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}

