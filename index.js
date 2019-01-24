import fetchUser from './fetch-user.js'
import User from './user.js'

const app = new Vue({
  el: '#app',

  components: {
    User
  },

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
    // Fetch user immediately on initialization
    this.fetchUser()
  }
})
