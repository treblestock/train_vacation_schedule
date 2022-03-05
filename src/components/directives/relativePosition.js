export default {
  mounted(el, binding) {
    const positions = ['absolute', 'relative', 'fixed']
    const directions = ['top', 'right', 'bottom', 'left']

    const propPosition = binding.arg
    const dirsAndCoords = Object.entries(binding.value).filter(propDir => directions.includes(propDir[0]) )

    
    if (!positions.includes(propPosition) ) throw new Error('Invalid position privided (v-pos)')
    

    el.style.position = propPosition
    for (const [dir, coord] of dirsAndCoords) {
      el.style[dir] = coord
    }
  },
  updated(el, binding) {
    const positions = ['absolute', 'relative', 'fixed']
    const directions = ['top', 'right', 'bottom', 'left']

    const propPosition = binding.arg
    const dirsAndCoords = Object.entries(binding.value).filter(propDir => directions.includes(propDir[0]) )

    if (!positions.includes(propPosition) ) throw new Error('Invalid position privided (v-pos)')
    

    el.style.position = propPosition
    for (const [dir, coord] of dirsAndCoords) {
      el.style[dir] = coord
    }
  }
}