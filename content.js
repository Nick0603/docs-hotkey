const dispatchMouseEvent = function(target, var_args) {
  if (!target) {
    return false
  }
  var e = document.createEvent("MouseEvents")
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1))
  target.dispatchEvent(e)
  return true
};

const clickEl = el => {
  dispatchMouseEvent(el, 'mouseover', true, true)
  dispatchMouseEvent(el, 'mousedown', true, true)
  dispatchMouseEvent(el, 'click', true, true)
  dispatchMouseEvent(el, 'mouseup', true, true)
}


const bold = () => {
  let boldElement = document.getElementById('boldButton')
  clickEl(boldElement)
}

const underline = () => {
  let underlineElement = document.getElementById('underlineButton')
  clickEl(underlineElement)
}

const italicize = () => {
  let italicizeElement = document.getElementById('italicButton')
  clickEl(italicizeElement)
}

const fontFamily = val => {
  let fontFamilyElement = document.getElementById('docs-font-family')
  clickEl(fontFamilyElement)
  let allFontContainer = document.getElementsByClassName('docs-fontmenu-fonts')[0]
  for (let i = 0; i < allFontContainer.children.length; i++) {
    let fontElement = allFontContainer.children[i]
    const fontText = fontElement.children[0].children[1].innerHTML
    if (fontText === val) {
      clickEl(fontElement)
      break
    }
  }
}

const highlight = () => {
  let element = document.getElementById('bgColorButton')
  if (element) {
    clickEl(element)

    const highlightElContainer = document.getElementById('docs-material-colorpalette-cell-103')
    console.log('contains? ' + highlightElContainer.classList.contains('docs-material-colorpalette-cell-selected'))
    
    // if this color is already selected, unselect it. else select it
    if (highlightElContainer.classList.contains('docs-material-colorpalette-cell-selected')) {
      let unselectEl = document.getElementsByClassName('goog-menuitem colormenuitems-no-color')[0].children[0].children[0].children[0]
      clickEl(unselectEl)
      clickEl(unselectEl)
    } else {
      let highlightEl = document.getElementsByClassName('docs-material-colorpalette-colorswatch')[13]
      clickEl(highlightEl)
    }

  } else {
    console.log('could not find element')
  }
}

const fontSize = async val => {
  let fontSizeInputElement = document.getElementById('fontSizeSelect').children[0].children[0].children[0].children[0]
  if (!fontSizeInputElement) {
    console.log('fontSize not found')
    return
  }
  clickEl(fontSizeInputElement)
  fontSizeInputElement.value = val
  
  // hitting tab to submit the input (not enter because it just doesn't work smh)
  const ke = new KeyboardEvent("keydown", {
    bubbles: true, cancelable: true, keyCode: 9
  });
  // https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
  await new Promise(resolve => setTimeout(() => {
    fontSizeInputElement.dispatchEvent(ke)
    resolve()
  }, 0))
  return
}

const heading = val => {
  let headingButtonElement = document.getElementById('headingStyleSelect')
  clickEl(headingButtonElement)
  const headingListContainer = document.getElementsByClassName('goog-menuitem goog-option-selected goog-option goog-submenu docs-halfhovermenuitem docs-submenuitem apps-menuitem goog-menuitem-highlight')[0].parentNode
  for (let i = 0; i < headingListContainer.children.length; i++) {
    let headingItemContainer = headingListContainer.children[i]
    const headingText = headingItemContainer.children[0].children[1].innerHTML
    console.log(headingText)
    if (headingText === val) {
      clickEl(headingItemContainer)
      break
    }
  }
}

const align = val => {
  if (val === 'Left align') {
    let leftAlignElement = document.getElementById('alignLeftButton')
    clickEl(leftAlignElement)
  } else if (val === 'Center align') {
    let centerAlignElement = document.getElementById('alignCenterButton')
    clickEl(centerAlignElement)
  } else if (val === 'Right align') {
    let rightAlignElement = document.getElementById('alignRightButton')
    clickEl(rightAlignElement)
  } else if (val === 'Justify') {
    let justifyElement = document.getElementById('alignJustifyButton')
    clickEl(justifyElement)
  } else {
    console.log('could not find align value')
  }
}

const clearFormatting = () => {
  let clearFormattingElement = document.getElementById('clearFormattingButton')
  clickEl(clearFormattingElement)
}

chrome.runtime.onMessage.addListener(async (req, sender, sendRes) => {
  console.log('received: ' + req.command)
  // console.log(req.command == 'highlight')
  if (req.command === 'highlight') {
    highlight()
    bold()
    underline()
    await fontSize(12)
    fontFamily('Calibri')
    clearFormatting()
  }
  sendRes('all is well')
})
