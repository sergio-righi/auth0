export default {
  setUser: ({ commit }: any, payload: any) =>
    commit('setUser', payload),
  setToken: ({ commit }: any, payload: any) =>
    commit('setToken', payload),
  setFeedback: ({ commit }: any, payload: any) =>
    commit('setFeedback', payload),
  setCallback: ({ commit }: any, payload: any) =>
    commit('setCallback', payload),
}
