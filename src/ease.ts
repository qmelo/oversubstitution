export const Out = (t: number, p: number) => {
  return 1 - Math.pow(1 - t, p)
}

export const In = (t: number, p: number) => {
  return Math.pow(t, p)
}

export const InOut = (t: number, p: number) => {
  if (t < 0.5) {
    return 0.5 * Math.pow(2 * t, p)
  } else {
    return 1 - 0.5 * Math.pow(2 * (1 - t), p)
  }
}
