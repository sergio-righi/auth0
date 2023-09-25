import { eFeedback } from '@/utils/enum'

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
    );
  }

  logout() {
    this.$store.dispatch('setAccessToken', null)
    this.$store.dispatch('setRefreshToken', null)
  }

  async fetch(accessToken: string) {
    return this._processResponse(
      await this.$axios.get('/auth/fetch', {
        headers: {
          'Authorization': accessToken
        }
      })
    )
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

  async isAuthenticated() {
    return this.$store.getters.getAccessToken !== null;
  }

  _processResponse(response: any) {
    if (response.data) {
      const { user, accessToken, refreshToken } = response.data
      this.$store.dispatch('setUser', user)
      this.$store.dispatch('setAccessToken', accessToken)
      this.$store.dispatch('setRefreshToken', refreshToken)
      return user;
    }
    return null
  }

  feedback(message: string, status: string = eFeedback.error) {
    this.$store.dispatch('setFeedback', { message, status })
  }

  callback(callback: string | null) {
    this.$store.dispatch('setCallback', callback)
  }

  clear() {
    this.$store.dispatch('setUser', null)
  }

  redirectToOrigin() {
    const callback = this.$store.getters.getCallback;
    if (callback) {
      const url = new URL(callback);
      const accessToken = this.$store.getters.getAccessToken;
      const refreshToken = this.$store.getters.getRefreshToken;
      this.callback(null)
      this.clear()
      url.searchParams.delete('logout');
      url.searchParams.delete('accessToken');
      url.searchParams.delete('refreshToken');
      if (accessToken && refreshToken) {
        url.searchParams.append('accessToken', accessToken);
        url.searchParams.append('refreshToken', refreshToken);
      } else if (!accessToken && !refreshToken) {
        url.searchParams.append('logout', 'true');
      }
      window.location.href = url.toString();
    }
  }
}

export default AuthService
