import { mapState } from 'vuex'

export default function({ app }) {
  const mixin = {
    computed: {
      ...mapState({
        themes: state => state.themes.themes
      }),
      theme: {
        get() {
          return this.$store.state.themes.theme
        },
        set(newTheme) {
          this.$store.commit('themes/setTheme', newTheme)
        }
      }
    },
    watch: {
      theme() {
        this.$vuetify.theme.dark = this.theme === this.themes[1]
      }
    },
    created() {
      this.$vuetify.theme.dark = this.theme === this.themes[1]
    },
    beforeMount() {
      try {
        const stored = localStorage.getItem('theme')
        if (stored) {
          this.theme = stored
        } else {
          this.theme = this.themes[0]
        }
        localStorage.setItem('theme', this.theme)
      } catch (err) {
        this.theme = this.themes[0]
        localStorage.setItem('theme', this.theme)
      }
    }
  }
  if (!app.mixins) {
    app.mixins = []
  }
  app.mixins.push(mixin)
}
