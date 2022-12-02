export default {
  setUser: ({ commit }: any, payload: any) =>
    commit('setUser', payload),
  setAccessToken: ({ commit }: any, payload: any) =>
    commit('setAccessToken', payload),
  setRefreshToken: ({ commit }: any, payload: any) =>
    commit('setRefreshToken', payload),
  setFeedback: ({ commit }: any, payload: any) =>
    commit('setFeedback', payload),
  setCallback: ({ commit }: any, payload: any) =>
    commit('setCallback', payload),
}
