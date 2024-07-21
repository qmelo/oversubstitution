import * as time from "./time"
import * as data from "./data"
import * as constants from "./constants"
import * as ease from "./ease"

class Camera {
  x: number
  y: number
  scale: number
  
  constructor() {
    this.x = 0
    this.y = 0
    this.scale = 1
  }

  get minX() {
    return (-p.width / 2 / this.scale - this.x) / constants.size - 1
  }

  get maxX() {
    return (p.width / 2 / this.scale - this.x) / constants.size + 1
  }

  get minY() {
    return (-p.height / 2 / this.scale - this.y) / constants.size - 1
  }

  get maxY() {
    return (p.height / 2 / this.scale - this.y) / constants.size + 1
  }

  update() {
    let currentItem = data.items.filter((item) => item.time <= time.currentTime()).reverse()[0]

    if (currentItem) {
      let prevLineItems = data.items.filter((item) => item.y === currentItem.y - 1)
      let currentLineItems = data.items.filter((item) => item.y === currentItem.y)
      let nextLineItems = data.items.filter((item) => item.y === currentItem.y + 1)

      let currentMinX = Math.min(...currentLineItems.map((item) => item.x))
      let currentMaxX = Math.max(...currentLineItems.map((item) => item.x))
      let currentCenterX = (currentMinX + currentMaxX + 1) / 2

      let prevMinX = Math.min(...prevLineItems.map((item) => item.x))
      let prevMaxX = Math.max(...prevLineItems.map((item) => item.x))
      if (prevMinX === Infinity) prevMinX = currentMinX
      if (prevMaxX === -Infinity) prevMaxX = currentMaxX
      let prevCenterX = ((prevMinX + prevMaxX + 1) / 2)

      let currentTime = currentLineItems[0].time
      let nextTime = nextLineItems[0]?.time || currentTime + 2

      let progressInOut = p.norm(time.currentTime(), currentTime, nextTime)
      let progressOut = p.constrain(p.norm(time.currentTime(), currentTime, Math.min(nextTime, currentTime + 1)), 0, 1)
      let progressIn = p.constrain(p.norm(time.currentTime(), Math.max(nextTime - 1, currentTime), nextTime), 0, 1)

      let currentCenterY = currentLineItems[0].y
      let nextCenterY = nextLineItems[0]?.y || currentCenterY + 1

      if (prevLineItems.length === 0) progressOut = 1

      if (nextLineItems.length === 0) progressIn = 0

      this.x = -p.lerp(prevCenterX, currentCenterX, ease.InOut(progressInOut, 3)) * constants.size
      this.y = -p.lerp(currentCenterY, nextCenterY, (ease.Out(progressOut, 6) + ease.In(progressIn, 6)) / 2) * constants.size

      let v = -18
      let w = (p.lerp(prevMinX, currentMinX, ease.InOut(progressInOut, 2)) - p.lerp(prevMaxX, currentMaxX, ease.InOut(progressInOut, 2)))
      this.scale = v / p.lerp(v, w, 0.8)
    }
  }
}

export const camera = new Camera()
