import state from './state'
import { default as actions } from './actions'
import { default as mutations } from './mutations'
import { default as getters } from './getters'

export default {
  state,
  getters,
  mutations,
  actions,
  modules: {}
}