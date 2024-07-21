import * as constants from "./constants"
import * as audio from "./audio"
import * as control from "./control"
import * as data from "./data"
import * as text from "./text"
import * as components from "./components"
import { camera } from "./camera"

export const preload = () => {
  audio.preload()
  data.preload()
  text.preload()
}

export const resize = () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement
  canvas.style.position = "absolute"
  canvas.style.top = "50%"
  canvas.style.left = "50%"
  const scale = Math.min(window.innerWidth / constants.width, window.innerHeight / constants.height)
  canvas.style.transform = "translate(-50%, -50%) scale(" + scale + ")"
}

export const setup = () => {
  p.createCanvas(constants.width, constants.height)
  p.pixelDensity(1)
  p.frameRate(constants.frameRate)

  data.setup()
  control.setup()

  resize()
}

export const draw = () => {  
  p.background(constants.black)

  camera.update()

  p.translate(constants.width / 2, constants.height / 2)
  p.translate(camera.x * camera.scale, camera.y * camera.scale)
  p.scale(camera.scale)

  const items = data.items.filter((item) => {
    return (
      item.x > camera.minX &&
      item.x < camera.maxX &&
      item.y > camera.minY &&
      item.y < camera.maxY
    )
  })

  items.forEach((item) => components.drawKashiBox(item))
  items.forEach((item) => components.drawHeadKashiBox(item))
  items.forEach((item) => components.drawConnection(item))
  items.forEach((item) => components.drawConnectionBox(item))
  items.forEach((item) => components.drawHeadKanaBox(item))
}
