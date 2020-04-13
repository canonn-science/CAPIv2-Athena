<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <v-list-item
            v-if="!item.subItems"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>

          <v-list-group v-else :key="item.title" no-action>
            <template v-slot:activator>
              <v-list-item :key="i" :to="item.to" router exact>
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list-item
              v-for="subItem in item.subItems"
              :key="subItem.title"
              :to="subItem.to"
            >
              <v-list-item-content>
                <v-list-item-title v-text="subItem.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
        <!-- <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item> -->
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
          title: 'Biology',
          to: '/biology',
          subItems: [
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
          to: '/cartographics'
        },
        {
          icon: 'mdi-fleur-de-lis',
          title: 'Geology',
          to: '/geology'
        },
        {
          icon: 'mdi-safe-square',
          title: 'Guardians',
          to: '/guardians'
        },
        {
          icon: 'mdi-hexagram',
          title: 'Thargoids',
          to: '/thargoids'
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
