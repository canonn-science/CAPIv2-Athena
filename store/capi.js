import axios from 'axios'
import consola from 'consola'

export const capi = {
  async getSystems(page, limit, sortBy, sortDesc, search, filters) {
    const host = 'https://api.canonn.tech/systems'
    let url = `${host}?_limit=${limit}`
    const start = (page - 1) * limit

    // Apply sorting
    if (sortBy.length > 0) {
      if (sortDesc[0] === true) {
        url = url + `&_sort=${sortBy[0]}:desc`
      } else {
        url = url + `&_sort=${sortBy[0]}:asc`
      }
    }

    // Apply Searching
    if (search) {
      url = url + `&_q=${search}`
    }

    // Fetch Data
    url = url + `&_start=${start}`
    consola.log(url)
    const response = await axios.get(url)

    return {
      systems: response.data,
      count: parseInt(response.headers['content-range'])
    }
  }
}
