/**
 * @Author: Tomonori
 * @Date: 2019/12/20 16:24
 * @Title:
 * @Desc: ↓ ↓ ↓ ↓ ↓
 * -----
 */
import Mojs from '@mojs/core'
import { Core } from '../base/Core'
import { COLOR, SVG_PATH } from '../base/Constant'
import WebHelper from '../base/WebHelper'

export class GoodBye extends Core {

  /**
   * @private timeline
   */

  /**
   * @private
   * @returns {GoodBye}
   */
  render() {
    const duration = 4000
    const delay = 3000
    const noise = Mojs.easing.path(SVG_PATH.NOISE)
    const rotateCurve = Mojs.easing.path(SVG_PATH.ROTATE)

    const base = {
      parent: this.option.parent,
      className: 'marisa-text',
      shape: 'rect',
      fill: 'none',
      opacity: {0: 1},
      duration: duration
    }

    const sa = new Mojs.Shape({
      ...base,
      x: {[350]: 250},
      y: -60,
      delay: delay,
      onStart: (isForward, isYoyo) => {
        sa.el.innerText = 'さ'
      }
    })

    const ra = new Mojs.Shape({
      ...base,
      x: {[150]: 250},
      delay: delay + 600,
      onStart: (isForward, isYoyo) => {
        ra.el.innerText = 'ら'
      }
    })

    const ba = new Mojs.Shape({
      ...base,
      x: {[350]: 250},
      y: 60,
      delay: delay + 1200,
      onStart: (isForward, isYoyo) => {
        ba.el.innerText = 'ば'
      }
    })

    const da = new Mojs.Shape({
      ...base,
      x: {[150]: 250},
      y: 120,
      onStart: (isForward, isYoyo) => {
        da.el.innerText = 'だ'
      },
      delay: delay + 2400,
    })

    this.timeline = new Mojs.Timeline
    this.timeline.add(
      sa,
      ra,
      ba,
      da
    )

    return this
  }
}