const baseUrl = 'https://jsonplaceholder.typicode.com'

/**
 * Fetch user by id from the API
 *
 * @param {string|number} userId
 * @returns {object} the user object
 */
export default async function fetchUser (userId) {
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
