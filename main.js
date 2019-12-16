class End {

  COLOR_BLACK = '#000'
  COLOR_WHITE = '#fff'
  MAIN_DOM = document.querySelector('.main')
  timeline;

  constructor() {
    this.addDOM()
    this.main()
  }

  main() {
    this.timeline = new mojs.Timeline({
      repeat: 999
    })
    .add(this.createCutOutMoObject())
    .play()
  }

  addDOM() {
    let div = document.createElement('div')
    div.className = 'el-cut-out-0'
    div = this.cssSetCenter(div)
    div.style['border-radius'] = '50%'
    div.style['background'] = this.COLOR_BLACK
    this.MAIN_DOM.appendChild(div)
    console.log(this.MAIN_DOM)
    return div
  }

  createCutOutMoObject() {
    return new mojs.Html({
      el: '.el-cut-out-0',
      scale: {
        0: 50,
        duration: 3000
      }
    })
  }

  cssSetCenter(dom) {
    dom.style['position'] = 'absolute'
    dom.style['width'] = '100px'
    dom.style['height'] = '100px'
    dom.style['left'] = '50%'
    dom.style['top'] = '50%'
    dom.style['margin'] = '-50px 0 0 -50px'
    return dom
  }
}
