
export default {
  setUser: (state: any, user: any) => (state.sso = user),
  setToken: (state: any, payload: any) => (state.token = payload),
  setFeedback: (state: any, payload: any) => (state.feedback = payload),
  setCallback: (state: any, payload: any) => (state.callback = payload),
}
