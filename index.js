const app = new Vue({
  el: '#app',
  data: {
    message: null,
    user: null
  },
  methods: {
    async fetchUser () {
      this.message = 'Fetching user...'
      try {
        this.user = await fetchUser(1)
        this.message = null
      } catch (e) {
        console.error('Failed to fetch user', e)
        this.message = 'Failed to fetch user :('
      }
    }
  },
  async created () {
    this.fetchUser()
  }
})

async function fetchUser (userId) {
  const [profile, posts] = await Promise.all([
    fetchJSON(`https://jsonplaceholder.typicode.com/users/${encodeURIComponent(userId)}`),
    fetchJSON(`https://jsonplaceholder.typicode.com/posts?userId=${encodeURIComponent(userId)}`)
  ])
  return { profile, posts }
}

async function fetchJSON (url) {
  const response = await fetch(url)
  if (response.ok) {
    return response.json()
  } else {
    return Promise.reject()
  }
}
