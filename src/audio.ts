import type p5 from "p5"
import "p5/lib/addons/p5.sound"

export let audio: p5.SoundFile

export const preload = () => {
  audio = p.loadSound("oversubstitution.wav")
}
