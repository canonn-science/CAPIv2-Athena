import axios from 'axios'

export const state = () => ({
  systems: []
})

export const mutations = {
  setSystems(state, systems) {
    state.systems = systems
  }
}

export const actions = {
  async fetchSystems({ commit }) {
    const response = await axios.get(
      `https://api.canonn.tech/systems?_limit=30`
    )
    commit('setSystems', response.data)
    return response.data
  }
}
