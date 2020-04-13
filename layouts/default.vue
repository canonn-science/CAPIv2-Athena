<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <v-list-item v-if="!item.subItems" :key="i" :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-else :key="item.title">
            <template v-slot:activator>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in item.subItems"
              :key="subItem.title"
              :to="subItem.to"
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      color="toolbar"
      :class="{ 'custom-dark': theme === themes[1] }"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click="switchTheme()">
        <v-icon v-if="theme === themes[0]">brightness_3</v-icon>
        <v-icon v-if="theme === themes[1]">wb_sunny</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>{{ footerText }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-comment-text',
          title: 'File a Report',
          to: '/new-report'
        },
        {
          icon: 'mdi-nature',
          title: 'AP Test',
          to: '/ap'
        },
        {
          icon: 'mdi-nature',
          title: 'Biology',
          subItems: [
            {
              title: 'Metrics',
              to: '/biology/metrics'
            },
            {
              title: 'Reports',
              to: '/biology/reports'
            },
            {
              title: 'Sites',
              to: '/biology/sites'
            }
          ]
        },
        {
          icon: 'mdi-map',
          title: 'Cartographics',
          subItems: [
            {
              title: 'Metrics',
              to: '/cartographics/metrics'
            },
            {
              title: 'Reports',
              to: '/cartographics/reports'
            },
            {
              title: 'Sites',
              to: '/cartographics/sites'
            }
          ]
        },
        {
          icon: 'mdi-fleur-de-lis',
          title: 'Geology',
          subItems: [
            {
              title: 'Metrics',
              to: '/geology/metrics'
            },
            {
              title: 'Reports',
              to: '/geology/reports'
            },
            {
              title: 'Sites',
              to: '/geology/sites'
            }
          ]
        },
        {
          icon: 'mdi-safe-square',
          title: 'Guardians',
          subItems: [
            {
              title: 'Metrics',
              to: '/guardians/metrics'
            },
            {
              title: 'Reports',
              to: '/guardians/reports'
            },
            {
              title: 'Sites',
              to: '/guardians/sites'
            }
          ]
        },
        {
          icon: 'mdi-hexagram',
          title: 'Thargoids',
          subItems: [
            {
              title: 'Metrics',
              to: '/thargoids/metrics'
            },
            {
              title: 'Reports',
              to: '/thargoids/reports'
            },
            {
              title: 'Sites',
              to: '/thargoids/sites'
            }
          ]
        }
      ],
      title: 'Athena',
      footerText: ''
    }
  },
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
  methods: {
    switchTheme() {
      if (this.theme === this.themes[0]) {
        this.theme = this.themes[1]
      } else if (this.theme === this.themes[1]) {
        this.theme = this.themes[0]
      }
      localStorage.setItem('theme', this.theme)
    }
  }
}
</script>

<style scoped>
.custom-dark,
.custom-dark .theme--dark.v-btn {
  color: var(--v-primary-base);
}
</style>
