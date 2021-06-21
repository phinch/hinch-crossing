import Color from 'color'

export const tintColor = (colorString, variance = 0.3) => {
  const shouldLighten = Math.random - 0.5
  const strength = Math.random() * variance
  const baseColor = Color(colorString)
  if (shouldLighten > 0) {
    return baseColor.lighten(strength).hex()
  }
  return baseColor.darken(strength).hex()
}
