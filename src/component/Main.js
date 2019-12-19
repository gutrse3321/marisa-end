/**
 * @Author: Tomonori
 * @Date: 2019/12/18 19:43
 * @Title:
 * @Desc: ↓ ↓ ↓ ↓ ↓
 * -----
 */
import Mojs from '@mojs/core'
import { Core } from '../base/Core'
import { MainInEffect } from './effect/MainInEffect'

export class Main extends Core {

  /**
   * el
   * @private wrapper
   * @private shakeEl
   * @private timeline
   */

  /**
   * @private
   */
  render() {
    //先构造创建一个div元素
    super.render()

    //父类先创建的div元素el添加className
    this.el.classList.add('main-wrapper')
    this.wrapper = this.el

    //重新赋值el，createChild父辈方法，创建儿子元素给之前el元素，即 main-wrapper
    //现在此类的el元素为main
    this.el = this.createChild('div', 'main')
    this.effectEl = this.createElement('div')
    this.effectEl.classList.add('main-effect')
    this.el.appendChild(this.effectEl)
    Mojs.h.force3d(this.wrapper)
    Mojs.h.force3d(this.el)

    /**
     * 过渡动画
     * @type {MainInEffect}
     */
    let mainInEffect = new MainInEffect({el: this.effectEl})

    this.timeline = new Mojs.Timeline
    this.timeline.add(mainInEffect)

    return this
  }

  /**
   * @public
   */
  init() {
    this.timeline.play()
  }
}