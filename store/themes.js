export const state = () => ({
  theme: '',
  themes: ['light', 'dark']
})

export const mutations = {
  setTheme(state, theme) {
    state.theme = theme
  }
}
