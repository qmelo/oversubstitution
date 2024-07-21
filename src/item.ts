import * as data from "./data"
import * as time from "./time"

export default class Item {
  kashi: string
  kana: string
  index: number
  length: number
  x: number
  y: number
  time: number
  constructor(
    kashi: string,
    kana: string,
    index: number,
    length: number,
    x: number,
    y: number,
    time: number
  ) {
    this.kashi = kashi
    this.kana = kana
    this.index = index
    this.length = length
    this.x = x
    this.y = y
    this.time = time
  }

  get top() {
    return data.items.filter((item) => item.x === this.x && item.y < this.y).sort((a, b) => b.y - a.y)[0]
  }

  get bottom() {
    return data.items.filter((item) => item.x === this.x && item.y > this.y).sort((a, b) => a.y - b.y)[0]
  }

  get pattern() {
    const patterns = [
      ["ア"], ["イ"], ["ウ"], ["エ"], ["オ"],
      ["カ", "ガ"], ["キ", "ギ", "キョ"], ["ク", "グ"], ["ケ", "ゲ"], ["コ", "ゴ"],
      ["サ", "ザ"], ["シ", "ジ"], ["ス", "ズ"], ["セ", "ゼ"], ["ソ", "ゾ"],
      ["タ", "ダ"], ["チ", "ヂ"], ["ツ", "ヅ"], ["テ", "デ"], ["ト", "ド"],
      ["ナ"], ["ニ"], ["ヌ"], ["ネ"], ["ノ"],
      ["ハ", "バ", "パ"], ["ヒ", "ビ", "ピ"], ["フ", "ブ", "プ"], ["ヘ", "ベ", "ペ"], ["ホ", "ボ", "ポ"],
      ["マ"], ["ミ"], ["ム"], ["メ"], ["モ"],
      ["ヤ"], ["ユ"], ["ヨ"],
      ["ラ"], ["リ"], ["ル"], ["レ"], ["ロ"],
      ["ワ"], ["ヲ"], ["ン"],
      ["ー"], ["ッ"],
    ]
    return patterns.findIndex((pattern) => pattern.includes(this.kana))
  }

  get progressOut() {
    return p.constrain(p.norm(time.currentTime(), this.time, Math.min(this.bottom?.time || Infinity, this.time + 1)), 0, 1)
  }

  get progressIn() {
    return p.constrain(p.norm(time.currentTime(), Math.max(this.bottom?.time || Infinity, this.time) - 1, this.bottom?.time || Infinity), 0, 1)
  }
}
