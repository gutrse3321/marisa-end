/**
 * @Author: Tomonori
 * @Date: 2019/12/19 19:38
 * @Title:
 * @Desc: ↓ ↓ ↓ ↓ ↓
 * -----
 */
import Mojs from '@mojs/core'
import { Core } from '../../base/Core'
import { COLOR } from '../../base/Constant'

export class StartEffect extends Core {

  /**
   * @private
   * @returns {StartEffect}
   */
  render() {
    super.render()

    const duration = 950,
          delay = 2000,
          SHIFT = 12

    const button = new Mojs.Shape({
      parent: this.option.parent,
      className: 'start-button',
      fill: COLOR.WHITE,
      radius: 21,
      isShowStart: true,
      duration: duration,
      delay: delay,
      scale: {1: 1.35},
      isForce3D: true
    })
      .then({
        scale: 1,
        duration: 0.5 * duration
      })
    button.el.style['cursor'] = 'pointer'
    button.el.style['opacity'] = '0'
    button.el.style['z-index'] = '2'

    this.buttonMoObj = button

    this.timeline = new Mojs.Timeline({repeat: 99999})
    this.timeline.add(
      button
    )

    return this
  }
}