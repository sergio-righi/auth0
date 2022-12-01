import { initializeAxios } from '@/utils/api'

const accessor: any = ({ $axios, $config, store }: any) => {
  initializeAxios($axios)

  const token = store.getters.getToken;

  console.log(token);

  $axios.onRequest((config: any) => {
    config.headers.common.Authorization = token
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
