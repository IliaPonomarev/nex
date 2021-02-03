import { ExcelComponent } from "../../core/ExcelComponent";
import { shouldResize } from "./table.functions";
import { resizeHandler } from "./table.resize";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
    })
  }

  toHTML() {
    return createTable()
  }

  onClick() {
    console.log('click')
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event)
    }
  }

  onMousemove() {
    // console.log('mousemove', event)
  }

  onMouseup() {
    console.log('mouseup')
  }
}