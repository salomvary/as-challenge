const baseUrl = 'https://jsonplaceholder.typicode.com'

const app = new Vue({
  el: '#app',

  data: {
    message: null,
    user: null
  },

  methods: {
    /**
     * Fetch a user and show a loading message
     * or an error message on failure
     */
    async fetchUser () {
      this.message = 'Fetching user...'
      try {
        this.user = await fetchUser(1)
        this.message = null
      } catch (e) {
        this.message = 'Failed to fetch user :('
        console.error('Failed to fetch user', e)
      }
    }
  },

  /**
   * @see https://vuejs.org/v2/api/#created
   */
  async created () {
    this.fetchUser()
  }
})

/**
 * Fetch user by id from the API
 *
 * @param {string|number} userId
 * @returns {object} the user object
 */
async function fetchUser (userId) {
  const [profile, posts] = await Promise.all([
    fetchJSON(`${baseUrl}/users/${encodeURIComponent(userId)}`),
    fetchJSON(`${baseUrl}/posts?userId=${encodeURIComponent(userId)}`)
  ])
  // Merge the user profile data and posts
  return { profile, posts }
}

/**
 * Fetch URL and parse a successful response as JSON
 *
 * @param {string} url
 * @returns {object} the parsed response
 */
async function fetchJSON (url) {
  const response = await fetch(url)
  if (response.ok) {
    return response.json()
  } else {
    return Promise.reject()
  }
}
