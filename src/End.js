/**
 * @Author: Tomonori
 * @Date: 2019/12/18 19:36
 * @Title:
 * @Desc: ↓ ↓ ↓ ↓ ↓
 * -----
 */
import Mojs from '@mojs/core'
import { Core } from './base/Core'
import { Start } from './component/Start'

import './asset/css/index.styl'

class End extends Core {

  /**
   * @private
   */
  render() {
    const mainTimeline = new Mojs.Timeline

    mainTimeline.add(
      new Start()
    ).play()
  }
}

new End()