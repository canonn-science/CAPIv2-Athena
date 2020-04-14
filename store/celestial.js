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
      `https://elitebgs.app/api/ebgs/v4/systems?allegiance=federation`
    )
    commit('setSystems', response.data.docs)
    return response.data
  }
}
