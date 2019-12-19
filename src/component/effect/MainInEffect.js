/**
 * @Author: Tomonori
 * @Date: 2019/12/19 15:06
 * @Title:
 * @Desc: ↓ ↓ ↓ ↓ ↓
 * -----
 */
import Mojs from '@mojs/core'
import { Core } from '../../base/Core'
import { COLOR } from '../../base/Constant'
import WebHelper from '../../base/WebHelper'

/**
 * main主体过渡动画
 */
export class MainInEffect extends Core {

  /**
   * @private timeline
   */

  /**
   * @private
   * @returns {MainInEffect}
   */
  render() {

    /**
     * 声明动画实体顺序不可改变
     */
    /**
     * 黑色底色球体，透明放大到一定大小，比较小
     */
    const travelCircleExpand = new Mojs.Shape({
      fill: COLOR.BLACK,
      radius: 126,
      scale: {0.1: 1},
      easing: 'cubic.out',
      duration: 400,
      opacity: {0: 1},
      isForce3d: true,
      isTimelineLess: true
    })

    /**
     * 白色底色球体，先吸进去的效果再放大直接消失
     * 比travelCircleExpand稍小
     */
    const travelCircle = new Mojs.Shape({
      radius: 115,
      fill: COLOR.WHITE,
      scale: {0.2: 1},
      easing: 'back.in',
      isShowEnd: false,
      isForce3d: true,
      isTimelineLess: true
    })

    /**
     * 过渡动画主体持续时间
     */
    const BG_DURATION = 250
    //延迟时间
    const DELAY = 350

    const circle = new Mojs.Shape({
      fill: COLOR.WHITE,
      radius: 500,
      scale: {0.1: WebHelper.getScaler(500)},
      easing: 'cubic.out',
      duration: BG_DURATION,
      delay: DELAY - 50,
      isForce3d: true
    })

    /**
     * 黑色背景，放大到底色充满整个窗体
     */
    const bg = new Mojs.Shape({
      fill: COLOR.BLACK,
      radius: 500,
      scale: {0: WebHelper.getScaler(500)},
      duration: BG_DURATION,
      delay: DELAY,
      isForce3d: true
    })

    this.timeline = new Mojs.Timeline
    this.timeline.add(
      bg, circle,
      travelCircle, travelCircleExpand
    )

    return this
  }
}