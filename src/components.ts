import * as constants from "./constants"
import * as text from "./text"
import * as ease from "./ease"
import * as time from "./time"
import Item from "./item"

const animation = (item: Item) => {
  p.translate(item.x * constants.size, item.y * constants.size)
  p.translate(constants.size / 2, constants.size / 2)
  if (item.top && item.top.pattern === item.pattern) {
    const distance = item.y - item.top.y
    p.translate(0, p.lerp(-constants.size / 2 * distance, 0, ease.Out(item.progressOut, 8)))
  }
  if (item.bottom && item.bottom.pattern === item.pattern) {
    const distance = item.bottom.y - item.y
    p.translate(0, p.lerp(0, constants.size / 2 * distance, ease.In(item.progressIn, 8)))
  }
}

const animationWithScale = (item: Item) => {
  animation(item)
  if (!item.top || item.top.pattern !== item.pattern) {
    p.scale(p.lerp(0, 1, ease.Out(item.progressOut, 8)))
  }
}

const drawText = (item: Item, ratio: number = 1) => {
  text.setKashiFont()
  p.push()
  p.translate(item.x * constants.size, item.y * constants.size)
  p.translate(constants.size / 2, constants.size / 2)
  p.beginClip()
  p.rectMode(p.CENTER)
  p.rect(0, 0, constants.size * ratio, constants.size * ratio, 12)
  p.endClip()
  p.fill(constants.white)
  p.scale(ratio)
  p.translate(-item.index * constants.size + (item.length - 1) * constants.size / 2, text.getCurrentFontOffset())
  p.scale(item.length, 1)
  p.text(item.kashi, 0, 0)
  p.pop()
}

export const drawConnection = (item: Item) => {
  if (item.top && item.top.pattern !== item.pattern) return

  let t = p.map(time.currentTime(), item.time - 1, item.time, 0, 1)
  t = p.constrain(t, 0, 1)
  let t2 = p.map(time.currentTime(), item.time, item.time + 1, 0, 1)
  t2 = p.constrain(t2, 0, 1)
  if (item.top) {
    let len = item.y - item.top.y
    p.push()
    {
      p.translate(item.x * constants.size, item.y * constants.size)
      p.translate(constants.size / 2, constants.size / 2)

      p.beginClip()
      p.rectMode(p.CORNER)
      p.fill(255, 0, 0)
      p.rect(-constants.size / 2, -constants.size * len, constants.size, p.lerp(0, constants.size * len, (ease.In(t, 8) + ease.Out(t2, 8)) / 2))
      p.endClip()

      p.strokeCap(p.SQUARE)
      p.stroke(constants.white)
      p.strokeWeight(9)
      p.line(0, -constants.size * len, 0, 0)
      p.stroke(constants.black)
      p.strokeWeight(7)
      p.line(0, -constants.size * len, 0, 0)
      p.drawingContext.setLineDash([6, 1])
      p.drawingContext.lineDashOffset = -time.currentTime() * 24
      p.stroke(constants.white)
      p.strokeWeight(5)
      p.line(0, -constants.size * len, 0, 0)
      p.drawingContext.setLineDash([])
      p.drawingContext.lineDashOffset = 0
    }
    p.pop()
  }
}

export const drawConnectionBox = (item: Item) => {
  if (item.progressOut < 0.5) return

  p.push()
  {
    p.translate(item.x * constants.size, item.y * constants.size)
    p.translate(constants.size / 2, constants.size / 2)
    p.rectMode(p.CENTER)
    p.fill(constants.white)
    p.stroke(constants.black)
    p.rect(0, 0, constants.size * 0.2, constants.size * 0.2, 4)
  
    p.fill(constants.black)
    p.noStroke()
    p.rect(0, 0, constants.size * 0.16, constants.size * 0.16, 3)
  }
  p.pop()  
}

export const drawHeadKanaBox = (item: Item) => {
  if (time.currentTime() < item.time) return
  if (1 == item.progressOut && 1 == item.progressIn && item.bottom && item.bottom.pattern === item.pattern) return

  p.push()
  {
    const size = constants.size / 3

    animation(item)
    if (!item.top || item.top.pattern !== item.pattern) {
      p.scale(p.lerp(2.5, 1, ease.Out(item.progressOut, 8)))
    }

    if (item.top && item.top.pattern === item.pattern && item.top.kana !== item.kana) {
      p.rotate(p.lerp(-p.PI, 0, ease.Out(item.progressOut, 8)))
      p.scale(p.lerp(1.5, 1, ease.Out(item.progressOut, 8)))
    }

    if (item.bottom && item.bottom.pattern === item.pattern && item.bottom.kana !== item.kana) {
      p.rotate(p.lerp(0, p.PI, ease.In(item.progressIn, 8)))
      p.scale(p.lerp(1, 1.5, ease.In(item.progressIn, 8)))
    }

    for (var j = 0; j < item.kana.length; j++) {
      p.rectMode(p.CENTER)
      p.fill(constants.black)
      p.stroke(constants.white)
      p.strokeWeight(1)
      p.rect(size * (j - item.kana.length / 2 + 0.5), 0, size, size, 3)

      p.push()
      {
        p.translate(size * (j - item.kana.length / 2 + 0.5), 0)
        p.scale(0.82)
        p.beginClip({ invert: true })
        p.rect(0, 0, size * 2, size * 0.6)
        p.rect(0, 0, size * 0.6, size * 2)
        p.endClip()
        p.fill(constants.black)
        p.stroke(constants.white)
        p.strokeWeight(1.5)
        p.strokeCap(p.SQUARE)
        p.rect(0, 0, size, size, 1.5)
      }
      p.pop()

      p.push()
      {
        p.translate(size * (j - item.kana.length / 2 + 0.5), 0)
        text.setKanaFont()
        p.scale(0.7)
        p.fill(constants.white)
        p.noStroke()
        p.text(item.kana[j], 0, text.getCurrentFontOffset())
      }
      p.pop()
    }
  }
  p.pop()
}

export const drawKashiBox = (item: Item) => {
  if (item.progressOut < 0.5) return

  const ratio = constants.ratio ** 2

  p.push()
  {
    p.push()
    {
      p.translate(item.x * constants.size, item.y * constants.size)
      p.translate(constants.size / 2, constants.size / 2)
      p.rectMode(p.CENTER)
      p.fill(constants.black)
      p.rect(0, 0, constants.size * ratio, constants.size * ratio, 3)
    }
    p.pop()
 
    drawText(item, ratio)

    p.translate(item.x * constants.size, item.y * constants.size)
    p.translate(constants.size / 2, constants.size / 2)
        
    p.push()
    {
      p.stroke(constants.white)
      p.strokeWeight(1)
      p.drawingContext.setLineDash([1, 2])
      p.line(0, -constants.size / 2 * ratio, 0, constants.size / 2 * ratio)
      p.line(-constants.size / 2 * ratio, 0, constants.size / 2 * ratio, 0)
      p.drawingContext.setLineDash([])
    }
    p.pop()

    p.push()
    {
      p.scale(ratio)
      p.stroke(constants.white)
      p.strokeWeight(3)
      p.strokeCap(p.SQUARE)
      for (var j = 0; j < 4; j++) {
        p.rotate(p.HALF_PI)
        p.line(-constants.size / 2, 0, -constants.size / 2 + 2, 0) 
      }
    }
    p.pop()

    p.push()
    {
      p.drawingContext.setLineDash([1, 2])
      p.drawingContext.lineDashOffset = -time.currentTime() * 12
      p.rectMode(p.CENTER)
      p.noFill()
      p.stroke(constants.white)
      p.strokeWeight(1)
      p.rect(0, 0, constants.size * ratio, constants.size * ratio, 3)
      p.drawingContext.setLineDash([])
      p.drawingContext.lineDashOffset = 0
    }
    p.pop()

    p.push()
    {
      p.rectMode(p.CENTER)
      p.beginClip({ invert: true })
      p.rect(0, 0, constants.size, constants.size / 2)
      p.rect(0, 0, constants.size / 2, constants.size)
      p.endClip()
      p.noFill()
      p.stroke(constants.white)
      p.strokeWeight(3)
      p.rect(0, 0, constants.size * ratio, constants.size * ratio, 3)
    }
    p.pop()
  }
  p.pop()
}

export const drawHeadKashiBox = (item: Item) => {
  if (time.currentTime() < item.time) return
  if (1 == item.progressOut && 1 == item.progressIn && item.bottom && item.bottom.pattern === item.pattern) return

  p.push()
  {
    animationWithScale(item)
    if (!item.top || item.top.pattern !== item.pattern) {
      p.scale(p.lerp(0, 1, ease.Out(item.progressOut, 8)))
    }
    p.rectMode(p.CENTER)
    p.fill(constants.black)
    p.rect(0, 0, constants.size * constants.ratio, constants.size * constants.ratio, 3)
  }
  p.pop()

  p.push()
  {
    p.beginClip()
    p.push()
    {
      animationWithScale(item)
      if (!item.top || item.top.pattern !== item.pattern) {
        p.scale(p.lerp(0, 1, ease.Out(item.progressOut, 8)))
      }
      p.rectMode(p.CENTER)
      p.fill(constants.white)
      p.rect(0, 0, constants.size * constants.ratio, constants.size * constants.ratio, 3)
    }
    p.pop()
    p.endClip()
  
    item.top && drawText(item.top, constants.ratio)
    drawText(item, constants.ratio)
    item.bottom && drawText(item.bottom, constants.ratio)
  }
  p.pop()
  
  p.push()
  {
    animationWithScale(item)
        
    p.push()
    {
      p.stroke(constants.white)
      p.strokeWeight(1)
      p.drawingContext.setLineDash([1, 2])
      p.line(0, -constants.size / 2 * constants.ratio ** 2, 0, constants.size / 2 * constants.ratio ** 2)
      p.line(-constants.size / 2 * constants.ratio ** 2, 0, constants.size / 2 * constants.ratio ** 2, 0)
      p.drawingContext.setLineDash([])
    }
    p.pop()

    p.push()
    {
      p.scale(constants.ratio)
      p.stroke(constants.white)
      p.strokeWeight(3)
      p.strokeCap(p.SQUARE)
      for (var j = 0; j < 4; j++) {
        p.rotate(p.HALF_PI)
        p.line(-constants.size / 2, 0, -constants.size / 2 + 2, 0) 
      }
    }
    p.pop()

    p.push()
    {
      p.rectMode(p.CENTER)
      p.noFill()
      p.stroke(constants.white)
      p.strokeWeight(1)
      p.rect(0, 0, constants.size * constants.ratio, constants.size * constants.ratio, 3)
    }
    p.pop()

    p.push()
    {
      p.rectMode(p.CENTER)
      p.beginClip({ invert: true })
      p.rect(0, 0, constants.size, constants.size / 2)
      p.rect(0, 0, constants.size / 2, constants.size)
      p.endClip()
      p.noFill()
      p.stroke(constants.white)
      p.strokeWeight(3)
      p.rect(0, 0, constants.size * constants.ratio, constants.size * constants.ratio, 3)
    }
    p.pop()
  }
  p.pop()
}
