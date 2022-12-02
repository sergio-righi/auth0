export default {
  getUser: (state: any) => state.user,
  getAccessToken: (state: any) => state.accessToken,
  getRefreshToken: (state: any) => state.refreshToken,
  getFeedback: (state: any) => state.feedback,
  getCallback: (state: any) => state.callback,
  isAuthenticated: (state: any) => state.accessToken !== null
} 