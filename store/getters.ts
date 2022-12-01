export default {
  getUser: (state: any) => state.sso,
  getToken: (state: any) => state.token,
  getFeedback: (state: any) => state.feedback,
  getCallback: (state: any) => state.callback,
  isAuthenticated: (state: any) => state.token !== null
} 