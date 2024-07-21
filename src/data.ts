import Item from "./item"

export let data: any
export let items: Item[]

export const preload = () => {
  data = p.loadJSON("data.json")
}

export const setup = () => {
  items = data.data.map((item: any) => {
    return new Item(item.kashi, item.kana, item.index, item.length, item.x, item.y, item.time)
  })
}
