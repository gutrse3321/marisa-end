/**
 * @Author: Tomonori
 * @Date: 2019/12/19 19:38
 * @Title:
 * @Desc: ↓ ↓ ↓ ↓ ↓
 * -----
 */
import Mojs from '@mojs/core'
import { Core } from '../../base/Core'
import { COLOR, SVG_PATH } from '../../base/Constant'

export class StartEffect extends Core {

  /**
   * @private
   * @returns {StartEffect}
   */
  render() {
    super.render()

    const duration = 950,
          delay = 2700,
          SHIFT = 12,
          noise = Mojs.easing.path(SVG_PATH.NOISE)

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

    const innerCircle = new Mojs.Shape({
      fill: COLOR.BLACK,
      parent: button.el,
      fillOpacity: 0.15,
      radius: 18,
      scale: {0: 1},
      isShowStart: true,
      opacity: {0: 1},
      duration: 0.95 * duration,
      delay: delay,
      easing: 'cubic.out',
      isForce3d: true
    })
      .then({
        scale: 0,
        opacity: 0,
        duration: 0.25 * duration
      })

    const cross = new Mojs.Shape({
      shape: 'cross',
      parent: button.el,
      fill: 'none',
      stroke: COLOR.BLACK,
      radius: 6,
      strokeLinecap: 'round',
      scale: 1,
      x: {
        [SHIFT]: SHIFT,
        curve: noise
      },
      y: {
        [-SHIFT]: -SHIFT,
        curve: noise
      },
      duration: duration,
      delay: delay + 50,
      isTimelineLess: true,
      isShowStart: true,
      isForce3d: true
    })

    // const ripple = new Mojs.Shape({
    //   left: 0,
    //   top: 0,
    //   parent: button.el,
    //   fill: COLOR.BLACK,
    //   scale: {0: 1},
    //   opacity: {0.5: 0},
    //   isForce3d: true
    // })

    const crossBurst = new Mojs.Burst({
      left: 0,
      top: 0,
      parent: button.el,
      radius: {0: 30},
      count: 10,
      children: {
        shape: 'cross',
        stroke: COLOR.BLACK,
        strokeWidth: {6: 0},
        angle: {0: 360},
        radius: {1: 20},
        duration: 1000
      }
    })

    button.el.addEventListener('mouseenter', e => {
      crossBurst.tune({
        x: e.layerX,
        y: e.layerY
      })
        .replay()
    })

    this.timeline = new Mojs.Timeline({repeat: 99999})
    this.timeline.add(
      cross,
      innerCircle,
      button
    )

    return this
  }
}