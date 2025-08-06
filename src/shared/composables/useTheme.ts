import { ref, onMounted, watch } from 'vue'

const THEME_KEY = 'theme'
const DARK = 'dark'
const LIGHT = 'light'

export function useTheme() {
  const isDark = ref(false)

  const applyTheme = (dark: boolean) => {
    document.documentElement.classList.toggle(DARK, dark)
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    isDark.value = savedTheme === DARK
    applyTheme(isDark.value)
  })

  watch(isDark, (newVal) => {
    const theme = newVal ? DARK : LIGHT
    localStorage.setItem(THEME_KEY, theme)
    applyTheme(newVal)
  })

  return {
    isDark
  }
}
