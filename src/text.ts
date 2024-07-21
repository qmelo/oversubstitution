import p5 from "p5"
import * as constants from "./constants"

export let currentFont: p5.Font
export let currentFontSize: number

export let serifFont: p5.Font
export let sansFont: p5.Font

export const preload = () => {
  serifFont = p.loadFont("NotoSerifJP-Regular.ttf")
  sansFont = p.loadFont("NotoSansJP-Medium.ttf")
}

export const getCurrentFontOffset = () => {
  return -currentFontSize / 5
}

export const setKashiFont = () => {
  currentFont = serifFont
  currentFontSize = constants.size
  p.textFont(currentFont)
  p.textSize(currentFontSize)
  p.textAlign(p.CENTER, p.CENTER)
}

export const setKanaFont = () => {
  currentFont = sansFont
  currentFontSize = constants.size * constants.kanaFactor
  p.textFont(currentFont)
  p.textSize(currentFontSize)
  p.textAlign(p.CENTER, p.CENTER)
}
