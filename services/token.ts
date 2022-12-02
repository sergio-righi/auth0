import { TokenModel } from '@/models'
import Cookies from 'js-cookie'

class TokenService {
  private readonly $store: any
  private readonly $axios: any
  private readonly $config: any

  constructor(context: any) {
    this.$store = context.store
    this.$axios = context.$axios
    this.$config = context.$config
  }

  async insertWithCode(userId: string) {
    const token = new TokenModel({ userId, code: null })
    const response = await this.$axios.post('/token/', token)
    return response.data ?? null
  }

  async findByToken(number: string) {
    const response = await this.$axios.get('/token/', { params: { number } })
    return response.data ?? null
  }

  async grant(userId: string, code: string) {
    return this._processResponse(
      await this.$axios.patch('/token/grant/' + userId, { code })
    )
  }

  async revoke(userId: string) {
    return this._processResponse(
      await this.$axios.patch('/token/revoke/' + userId)
    )
  }

  async reset(number: string, password: string) {
    return await this.$axios.patch('/token/reset/' + number, { password })
  }

  _processResponse(response: any) {
    if (response.data) {
      this.$store.dispatch('setUser', { user: response.data, key: this.$config.vuexKey })
      return response.data
    }
    return null
  }
}

export default TokenService
