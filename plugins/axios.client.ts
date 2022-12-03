import { initializeAxios } from '@/utils/api'

const accessor: any = ({ $axios, $config, store }: any) => {
  initializeAxios($axios)

  const { accessToken } = store.getters;

  $axios.onRequest((config: any) => {
    if (accessToken) {
      config.headers.common.Authorization = accessToken
    }
    config.headers.apikey = $config.apiKey
  })

  $axios.onError((error: any) => {
    if (error.response === undefined) {
      console.log('Network Error: Please refresh and try again.')
      throw error
    }
    throw error
  })
}

export default accessor
