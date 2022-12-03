
export default {
  setUser: (state: any, payload: any) => (state.user = payload),
  setAccessToken: (state: any, payload: any) => (state.accessToken = payload),
  setRefreshToken: (state: any, payload: any) => (state.refreshToken = payload),
  setFeedback: (state: any, payload: any) => (state.feedback = payload),
  setCallback: (state: any, payload: any) => (state.callback = payload),
}
