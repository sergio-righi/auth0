import { eFeedback } from '@/utils/enum'
import Cookies from 'js-cookie'

class AuthService {
  private readonly $axios: any
  private readonly $store: any

  constructor(context: any) {
    this.$store = context.store
    this.$axios = context.$axios
  }

  async find(email: string) {
    const response = await this.$axios.post('/auth/find', { email })
    return response.data ?? null
  }

  async login(email: string, password: string) {
    return this._processResponse(
      await this.$axios.post('/auth/login', { email, password })
    )
  }

  logout() {
    this.$store.dispatch('setUser', null)
    this.$store.dispatch('setToken', null)
  }

  async register(payload: any) {
    return this._processResponse(
      await this.$axios.post('/auth/register', payload)
    )
  }

  async refresh() {
    return this._processResponse(
      await this.$axios.get('/auth/refresh-token')
    )
  }

  async fetch() {
    this._processResponse(await this.$axios.get('/auth/fetch'))
  }

  async isAuthenticated() {
    const response = await this.refresh();
    return response !== null;
  }

  _processResponse(response: any) {
    console.log(response);
    if (response.data) {
      const { user, ...token } = response.data
      console.log(token);
      // Cookies.set('refresh_token', token.access_token, { domain: 'sergiorighi.com' });
      this.$store.dispatch('setUser', user._id)
      this.$store.dispatch('setToken', token.access_token)
      return user
    }
    return null
  }

  feedback(message: string, status: string = eFeedback.error) {
    this.$store.dispatch('setFeedback', { message, status })
  }

  callback(callback: string) {
    this.$store.dispatch('setCallback', callback)
  }
}

export default AuthService
