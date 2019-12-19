/**
 * @Author: Tomonori
 * @Date: 2019/12/18 19:37
 * @Title:
 * @Desc: ↓ ↓ ↓ ↓ ↓
 * -----
 */
export class Core {

  /**
   * @protected option
   * @private index
   * @private defaults = { className: '', parent: document.body, delay: 0 }
   * @private prop
   * @protected el
   */

  /**
   * @public
   * @param option
   */
  constructor (option = {}) {
    this.option = option
    this.index = this.option.index || 0
    this.declareDefaults()
    this.extendDefaults()
    this.vars()

    return this.render()
  }

  /**
   * @private
   *
   * 声明默认值
   */
  declareDefaults() {
    this.defaults = {
      className: '',
      parent:    document.body,
      delay:     0
    }
  }

  /**
   * @private
   *
   * 拷贝option的属性值到props
   */
  extendDefaults() {
    this.props = {}

    for (let key in this.defaults) {
      let value = this.option[key]
      this.assignProp(key, (value != null) ? value : this.defaults[key])
    }
  }

  /**
   * @private
   *
   * 分配单个属性值的方法
   * @param {*} key   属性名称
   * @param {*} value 属性值
   */
  assignProp(key, value) {
    this.props[key] = value
  }

  /**
   * @private
   *
   * 声明模块变量
   */
  vars() {

  }

  /**
   * @protected
   *
   * 初始化渲染
   */
  render() {
    this.addMainElement()
  }

  /**
   * @private
   *
   * 每个模块添加this.el
   * @param {String} tagName DOM元素名称
   */
  addMainElement(tagName = 'div') {
    let p = this.props

    this.el = this.createElement(tagName)
    this.addMainClasses()

    //采用哪种方式添加儿子元素
    let method = p.isPrepend ? 'prepend' : 'append'
    this[`${method}Child`](p.parent, this.el)
  }

  /**
   * @protected
   *
   * 创建HTMLElement元素
   * @param {String} tagName DOM元素名称
   * @param {String} className
   * @return {HTMLElement}
   */
  createElement(tagName) {
    return document.createElement(tagName)
  }

  /**
   * @private
   *
   * el元素添加多个或单个className
   */
  addMainClasses() {
    let p = this.props

    if (p.className instanceof Array) {
      for (let i = 0; i < p.className.length; i++) {
        this.addClass(this.el, p.className[i])
      }
    } else {
      this.addClass(this.el, p.className)
    }
  }

  /**
   * @private
   *
   * 为元素添加className
   * @param {HTMLElement} el
   * @param {String} className
   */
  addClass(el, className) {
    //className != null then classList add
    className && el.classList.add(className)
  }

  /**
   * @private
   *
   * 将儿子元素加到父元素
   * @param {*} el
   * @param {*} childEl
   */
  appendChild(el, childEl) {
    el.appendChild(childEl)
  }

  /**
   * @private
   *
   * 将儿子元素在父元素大儿子之前
   * @param {*} el
   * @param {*} childEl
   */
  prependChild(el, childEl) {
    el.insertBefore(childEl, el.firstChild)
  }

  /**
   * @protected
   *
   * DOM查找元素
   * @param selector
   */
  findEl(selector) {
    return document.querySelector(selector)
  }

  /**
   * @protected
   *
   * @param tagName
   * @param className
   * @returns {HTMLElement}
   */
  createChild(tagName, className) {
    let child = this.createElement('div')

    if (className) {
      let classes = className.split(' ')

      for (let i = 0; i < classes.length; i++) {
        child.classList.add(classes[i])
      }
    }

    this.el.appendChild(child)
    return child
  }
}
