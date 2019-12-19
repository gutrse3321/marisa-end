/**
 * @Author: Tomonori
 * @Date: 2019/12/19 15:10
 * @Title: Web API 协助类
 * @Desc: ↓ ↓ ↓ ↓ ↓
 * -----
 */
class WebHelper {

  /**
   * @define
   * this.subscribers
   * this.windowWidth
   * this.windowHeight
   */

  constructor() {
    this.vars()
    this.getWindowSize()
    this.listenResize()
  }

  /**
   * @private
   * 变量声明
   */
  vars() {
    this.subscribers = []
  }

  /**
   * @private
   * 获取窗口的size
   */
  getWindowSize() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight
    this.emitSubscribe()
  }

  /**
   * @private
   */
  emitSubscribe() {
    for (let subscriber of this.subscribers) {
      subscriber(this.windowWidth, this.windowHeight)
    }
  }

  /**
   * @private
   */
  listenResize() {
    window.addEventListener('resize', this.getWindowSize.bind(this))
  }

  /**
   * @private
   * @param subscriber
   */
  resizeSubscribe(subscriber) {
    this.subscribers.push(subscriber)
    subscriber(this.windowWidth, this.windowHeight)
  }

  /**
   * @public
   * @param initial
   * @returns {number}
   */
  getScaler(initial) {
    const max = Math.max(this.windowWidth, this.windowHeight)
    return 1.25 * (max / (2 * initial))
  }
}

export default new WebHelper()