<template>
  <v-app dark>
    <v-app-bar
      app
      clipped-left
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
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      class="mt-12"
      style="top: 16px;"
    >
      <v-list dense>
        <div v-for="(item, i) in items" :key="i">
          <v-divider v-if="item.divider" :key="i" class="my-4"></v-divider>

          <v-list-item
            v-else-if="item.auth === true && loggedIn === false"
            :key="i"
            :to="item.link"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-else-if="!item.subItems" :key="i" :to="item.link" link>
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
              :to="subItem.link"
              link
            >
              <v-list-item-content>
                <v-list-item-subtitle
                  v-text="subItem.title"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>

        <v-divider class="my-4"></v-divider>

        <v-list-item href="https://github.com/canonn-science" target="_blank">
          <v-list-item-action>
            <v-icon>{{ 'mdi-github' }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ 'Canonn Github' }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item href="https://canonn.science" target="_blank">
          <v-list-item-action>
            <v-icon>{{ 'mdi-monitor-dashboard' }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ 'Canonn Codex' }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!--
        Do some auth stuff here
        Hide whatever button isn't needed
        Redirect login to login page
        Logout delete the JWT and reset the state
      -->
      <template v-slot:append>
        <div v-if="loggedIn === true" class="pa-2">
          <v-btn block>Logout</v-btn>
        </div>
        <div v-else class="pa-2">
          <v-btn to="/login" block>Login</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
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
      drawer: true,
      loggedIn: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          link: '/'
        },
        {
          icon: 'mdi-account',
          title: 'Account',
          link: '/login',
          auth: true,
          subItems: [
            {
              title: 'File a Report',
              link: '/new-report'
            },
            {
              title: 'My Profile',
              link: '/user/profile'
            },
            {
              title: 'My CMDRs',
              link: '/user/cmdr'
            },
            {
              title: 'API Keys',
              link: '/user/api-keys'
            },
            {
              title: 'Prefrences',
              link: '/user/prefrences'
            }
          ]
        },
        { divider: true },
        {
          icon: 'mdi-atom',
          title: 'Celestial',
          subItems: [
            {
              title: 'Metrics',
              link: '/celestial/metrics'
            },
            {
              title: 'Systems',
              link: '/celestial/systems'
            },
            {
              title: 'Bodies',
              link: '/celestial/bodies'
            }
          ]
        },
        {
          icon: 'mdi-account-group',
          title: 'CMDRs',
          link: '/cmdr'
        },
        { divider: true },
        {
          icon: 'mdi-nature',
          title: 'Biology',
          subItems: [
            {
              title: 'Metrics',
              link: '/biology/metrics'
            },
            {
              title: 'Reports',
              link: '/biology/reports'
            },
            {
              title: 'Sites',
              link: '/biology/sites'
            }
          ]
        },
        {
          icon: 'mdi-map',
          title: 'Cartographics',
          subItems: [
            {
              title: 'Metrics',
              link: '/cartographics/metrics'
            },
            {
              title: 'Reports',
              link: '/cartographics/reports'
            },
            {
              title: 'Sites',
              link: '/cartographics/sites'
            }
          ]
        },
        {
          icon: 'mdi-fleur-de-lis',
          title: 'Geology',
          subItems: [
            {
              title: 'Metrics',
              link: '/geology/metrics'
            },
            {
              title: 'Reports',
              link: '/geology/reports'
            },
            {
              title: 'Sites',
              link: '/geology/sites'
            }
          ]
        },
        {
          icon: 'mdi-safe-square',
          title: 'Guardians',
          subItems: [
            {
              title: 'Metrics',
              link: '/guardians/metrics'
            },
            {
              title: 'Reports',
              link: '/guardians/reports'
            },
            {
              title: 'Sites',
              link: '/guardians/sites'
            }
          ]
        },
        {
          icon: 'mdi-hexagram',
          title: 'Thargoids',
          subItems: [
            {
              title: 'Metrics',
              link: '/thargoids/metrics'
            },
            {
              title: 'Reports',
              link: '/thargoids/reports'
            },
            {
              title: 'Sites',
              link: '/thargoids/sites'
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
    },
    enableProfile() {
      // blah
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
