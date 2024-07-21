import * as audio from './audio'

export const playOrPause = () => {
  if (audio.audio.isPlaying()) {
    audio.audio.pause()
  } else {
    audio.audio.play()
  }
}

export const setup = () => {
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      playOrPause()
    } else if (e.key === 'ArrowLeft') {
      audio.audio.jump(audio.audio.currentTime() - 2)
    } else if (e.key === 'ArrowRight') {
      audio.audio.jump(audio.audio.currentTime() + 2)
    }
  })
}
