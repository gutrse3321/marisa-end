/**
 * @Author: Tomonori
 * @Date: 2019/12/18 19:40
 * @Title:
 * @Desc: ↓ ↓ ↓ ↓ ↓
 * -----
 */
import Mojs from '@mojs/core'
import { Core } from '../base/Core'
import { Main } from './Main'
import { COLOR, SVG_PATH } from '../base/Constant'
import { StartEffect } from './effect/StartEffect'

const main = new Main()

export class Start extends Core {

  /**
   * @private timeline
   *
   */

  /**
   * @private
   *
   * @returns {Start}
   */
  render () {
    super.render()

    this.timeline = new Mojs.Timeline({speed: 1})

    //震动效果svg路线
    const noise = Mojs.easing.path(SVG_PATH.NOISE)
    const duration = 1500
    const SHIFT = 12

    const box = new Mojs.Shape({
      fill: 'none',
      radius: {1: 30},
      x: {
        [SHIFT]: SHIFT,
        curve: noise
      },
      y: {
        [-SHIFT]: -SHIFT,
        curve: noise
      },
      isForce3d: true,
      duration: duration + 400
    })

    const startEffect = new StartEffect({parent: box.el})

    this.box = box
    box.el.style['z-index'] = 11

    //第一次完成的光圈
    const boxHalo = new Mojs.Shape({
      fill: '#fff',
      parent: box.el,
      radius: 50,
      scale: {0.4: 1},
      duration: 650,
      opacity: {0.5: 0},
      delay: duration + 100,
      isForce3d: true,
      easing: 'cubic.out'
    })

    const content = new Mojs.Shape({
      fill: 'none',
      stroke: COLOR.WHITE,
      parent: box.el,
      radius: {0: 10},
      angle: {560: 270},
      strokeWidth: {
        0: 20,
        easing: 'cubic.inout'
      },
      strokeLinecap: 'round',
      strokeDasharray: '100%',
      duration: duration,
      isShowEnd: false,
    })
      .then({
        scale: 0.75,
        duration: 250
      })
      .then({
        scale: 1,
        duration: 300,
        onComplete(isFwd) {
          isFwd && startEffect.timeline.play()
          isFwd && (startEffect.buttonMoObj.el.style['opacity'] = 1)
        }
      })

    const angle = 250

    const bubbles = new Mojs.Burst({
      parent: content.el,
      count: 3,
      degree: 15,
      angle: {[90 + angle]: 280 + angle},
      y: {0: 15},
      x: {0: 50},
      timeline: {delay: duration},
      radius: {0: 70},
      duration: duration,
      children: {
        radius: [10, 7],
        fill: '#fff',
        pathScale: 'rand(0.5, 1.5)',
        duration: 600,
        isForce3d: true
      }
    })

    const cross = new Mojs.Shape({
      shape: 'cross',
      parent: content.el,
      fill: 'none',
      stroke: COLOR.BLACK,
      radius: 7,
      strokeLinecap: 'round',
      isShowStart: true,
      duration: duration,
      angle: {0: 360},
      scale: {0: 1},
      isForce3d: true,
    })
      .then({
        angle: -540,
        duration: duration / 2
      })

    this.timeline.add(
      bubbles,
      content,
      boxHalo,
      cross,
      box
    )

    this.addListeners()

    return this;
  }

  addListeners() {
    this.box.el.addEventListener('click', e => {
      this.box.el.style[ 'display' ] = 'none'
      main.init()
    })
  }
}