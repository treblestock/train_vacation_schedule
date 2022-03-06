export default {
  mounted(el, binding) {
    const directions = ['x', 'y', 'z']

    let styleProp = ''
    for (const [direction, coord] of Object.entries(binding.value)) {
      if(!directions.includes(direction) ) throw new Error('Invalid coordinates (v-translate)')
      styleProp += `translate${direction.toUpperCase()}(${coord}) `
    }

    el.style.transform = styleProp
  },
  updated(el, binding) {
    const directions = ['x', 'y', 'z']

    let styleProp = ''
    for (const [direction, coord] of Object.entries(binding.value)) {
      if(!directions.includes(direction) ) throw new Error('Invalid coordinates (v-translate)')
      styleProp += `translate${direction.toUpperCase()}: ${coord} `
    }

    el.style.transform = styleProp
  },
}