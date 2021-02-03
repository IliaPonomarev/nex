import { $ } from "../../core/dom"

export function resizeHandler (event) {
  const $target = $(event.target)
  const $parent = $target.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const cells = document.querySelectorAll(`[data-col="${$parent.data.col}"]`)
  const type = $target.data.resize
  const side = type === 'col' ? 'bottom' : 'right'
  let value

  $target.css({ opacity: 1, [side]: '-5000px' })

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = (coords.width + delta) + 'px'

      $target.css({ right: -delta + 'px' })
    } else if (type === 'row') {
      const delta = e.pageY - coords.bottom
      value = (coords.height + delta) + 'px'

      $target.css({ bottom: -delta + 'px' })
    }
    
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') { 
      $parent.css({ width: value })
      cells.forEach(el => el.style.width = value)
    } else if (type === 'row') {
      $parent.css({ height: value })
    }
    
    $target.css({ opacity: 0, bottom: 0, right: 0 })
  }
}