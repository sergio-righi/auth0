import { Context } from '@nuxt/types'

const route = {
  home: '/',
  login: '/login',
  register: '/register',
  password: '/forget-password',
  authorization: '/authorization'
}

const Resolve = (context: any) => ({

  home: (callback: string) => {
    return context.localePath({ path: route.home, query: { callback } })
  },

  login: (email: string, callback: string) => {
    return context.localePath({ path: route.login, query: { email: email, callback: callback } })
  },

  register: (callback: string) => {
    return context.localePath({ path: route.register, query: { callback } })
  },

  password: (callback: string) => {
    return context.localePath({ path: route.password, query: { callback } })
  },

  authorization: (callback: string) => {
    return context.localePath({ path: route.authorization, query: { callback } })
  }

  // image: {

  //   root: (name: string) => {
  //     return `/${name}`
  //   }
  // }

});

export const initializeResolve = (context: Context) => ({
  ...Resolve(context)
});