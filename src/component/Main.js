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
import { SVG_PATH } from '../base/Constant'
import { GoodBye } from './GoodBye'

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

    const duration = 2000
    const delay = 420
    const rotateCurve = Mojs.easing.path(SVG_PATH.ROTATE)

    const box = new Mojs.Shape({
      className: 'marisa-box',
      parent: this.el,
      shape: 'rect',
      fill: 'none',
      radiusX: 150,
      radiusY: 300,
      scale: {0.6: 1},
      opacity: {0.1: 1},
      duration: duration,
      delay: delay,
      onComplete: (isForward, isYoyo) => {
        this.addListeners()
      }
    })
      .then({
        duration: 2000,
        repeat: 999999,
        onUpdate: (ep, p) => {
          let rotateP = rotateCurve(p)
          box.el.style['transform'] = `rotate(${-10 * rotateP}deg)`
          box.el.style['transform-origin'] = `${10 + 55 * rotateP}% ${80 * 10 * rotateP}%)`
        }
      })
    this.box = box

    let goodBye = new GoodBye({parent: this.el})

    this.timeline = new Mojs.Timeline
    this.timeline.add(box, mainInEffect, goodBye)

    return this
  }

  /**
   * @public
   */
  init() {
    this.timeline.play()
  }

  addListeners() {
    this.box.el.addEventListener('click', e => {
      window.location.href = 'https://github.com/gutrse3321/marisa-end'
    })
  }
}